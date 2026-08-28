'use client';

import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  className?: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, className }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const toast = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = false;
        recog.interimResults = false;
        recog.lang = 'en-US';

        recog.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            onTranscript(transcript);
            toast.success('Voice Captured!', `"${transcript}"`);
          }
          setIsListening(false);
        };

        recog.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          toast.error('Voice Recognition', 'Could not detect speech. Please try again.');
        };

        recog.onend = () => {
          setIsListening(false);
        };

        setRecognition(recog);
      }
    }
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognition) {
      toast.error('Browser Unsupported', 'Voice input is available on Chrome, Edge, and Safari.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        recognition.start();
        setIsListening(true);
        toast.success('Listening...', 'Speak into your microphone now.');
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer ${
        isListening
          ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30 ring-2 ring-rose-400'
          : 'bg-slate-900/90 text-slate-300 hover:text-indigo-400 hover:bg-slate-800 border border-slate-800'
      } ${className || ''}`}
      title={isListening ? 'Stop Listening' : 'Speak with Voice AI'}
    >
      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
    </button>
  );
};
