export interface AIAnalysisResult {
  material: string;
  confidence: number;
  estimatedWeightKg: number;
  suggestedPrice: number;
}

export const analyzeScrapImage = async (imageBase64: string): Promise<AIAnalysisResult> => {
  // TODO: Replace with your actual FastAPI/Flask + OpenCV/Gemini endpoint
  console.log("Analyzing image...", imageBase64.substring(0, 20) + "...");
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        material: "Mixed Copper & E-Waste",
        confidence: 0.94,
        estimatedWeightKg: 2.5,
        suggestedPrice: 1250,
      });
    }, 1500); // Simulate network/processing delay
  });
};