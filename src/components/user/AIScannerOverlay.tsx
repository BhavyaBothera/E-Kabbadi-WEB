import React, { useRef, useState, useCallback } from 'react';
import { analyzeScrapImage, AIAnalysisResult } from '../../services/aiService';

export const AIScannerOverlay: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const captureAndAnalyze = useCallback(async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0);
      
      const imageBase64 = canvasRef.current.toDataURL('image/jpeg');
      setIsScanning(true);
      
      try {
        const result = await analyzeScrapImage(imageBase64);
        setAnalysis(result);
      } catch (error) {
        console.error("Analysis failed", error);
      } finally {
        setIsScanning(false);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="relative w-full max-w-md bg-black rounded-lg overflow-hidden shadow-lg">
        <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />
        <canvas ref={canvasRef} className="hidden" />
        
        {isScanning && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <p className="text-green-400 font-mono animate-pulse">Running AI Classification...</p>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button onClick={startCamera} className="px-4 py-2 bg-blue-600 text-white rounded">
          Start Camera
        </button>
        <button onClick={captureAndAnalyze} disabled={isScanning} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50">
          Analyze Scrap
        </button>
      </div>

      {analysis && (
        <div className="w-full max-w-md p-4 bg-gray-800 text-white rounded-lg mt-4">
          <h3 className="text-xl font-bold text-green-400">Analysis Complete</h3>
          <ul className="mt-2 space-y-1">
            <li><strong>Material:</strong> {analysis.material}</li>
            <li><strong>Est. Weight:</strong> {analysis.estimatedWeightKg} kg</li>
            <li><strong>Est. Value:</strong> ₹{analysis.suggestedPrice}</li>
          </ul>
        </div>
      )}
    </div>
  );
};