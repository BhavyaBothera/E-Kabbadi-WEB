import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VoiceAssistantModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onActionTriggered?: (action: string) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen = true,
  onClose,
  onActionTriggered
}) => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [assistantReply, setAssistantReply] = useState('');

  const sampleCommands = [
    { label: 'Show nearby pickups', action: 'NEARBY', route: '/merchant/requests' },
    { label: 'Accept this pickup', action: 'ACCEPT', route: '/merchant/requests' },
    { label: 'Navigate to customer', action: 'NAVIGATE', route: '/merchant/navigation' },
    { label: 'Mark pickup complete', action: 'COMPLETE', route: '/merchant/history' },
  ];

  useEffect(() => {
    if (isOpen) {
      setIsListening(true);
      setSpokenTranscript('Listening for voice command in Hindi / English...');
      setAssistantReply('Speak or tap a command below.');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTriggerCommand = (cmd: typeof sampleCommands[0]) => {
    setIsListening(false);
    setSpokenTranscript(`"${cmd.label}"`);
    setAssistantReply(`Executing: ${cmd.label}. Routing now...`);

    if (onActionTriggered) onActionTriggered(cmd.action);

    setTimeout(() => {
      onClose();
      navigate(cmd.route);
    }, 1000);
  };

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
      setSpokenTranscript('Microphone paused.');
    } else {
      setIsListening(true);
      setSpokenTranscript('Listening... "Accept pickup" or "Navigate"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md rounded-xl bg-white border border-zinc-200 shadow-xl p-6 space-y-5 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200">
            <span>Hands-Free Collector Voice Copilot</span>
          </div>
          <h3 className="text-lg font-bold text-zinc-900">
            Voice Operational Commands
          </h3>
          <p className="text-xs text-zinc-500">
            Designed for hands-free cargo operation on the road
          </p>
        </div>

        {/* Mic Circle */}
        <div className="py-3 flex flex-col items-center justify-center space-y-3">
          <button
            onClick={toggleMic}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-amber-600 text-white shadow-md ring-4 ring-amber-100'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border border-zinc-300'
            }`}
          >
            {isListening ? (
              <Mic className="w-8 h-8 animate-pulse" />
            ) : (
              <MicOff className="w-8 h-8" />
            )}
          </button>

          <p className="text-xs font-medium text-zinc-700 text-center italic max-w-xs">
            {spokenTranscript}
          </p>

          <div className="px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 text-center w-full">
            {assistantReply}
          </div>
        </div>

        {/* Quick Tap Commands */}
        <div className="space-y-2 pt-2 border-t border-zinc-100">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-tight block">
            Quick One-Tap Shortcuts:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {sampleCommands.map((cmd, i) => (
              <button
                key={i}
                onClick={() => handleTriggerCommand(cmd)}
                className="p-2.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-left text-xs font-semibold text-zinc-800 transition-colors flex items-center justify-between"
              >
                <span>{cmd.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
