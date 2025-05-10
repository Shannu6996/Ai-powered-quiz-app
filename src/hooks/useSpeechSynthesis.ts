import { useState, useEffect, useCallback } from 'react';

interface SpeechSynthesisHook {
  speak: (text: string, options?: { lang?: string; rate?: number; pitch?: number; voice?: SpeechSynthesisVoice }) => void;
  cancel: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
  voices: SpeechSynthesisVoice[];
  error: string | null;
}

export const useSpeechSynthesis = (): SpeechSynthesisHook => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const updateVoices = useCallback(() => {
    if (isSupported) {
      setVoices(window.speechSynthesis.getVoices());
    }
  }, [isSupported]);

  useEffect(() => {
    if (!isSupported) {
      setError('Speech synthesis is not supported in this browser.');
      return;
    }

    // Voices may load asynchronously
    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    // Cleanup
    return () => {
      if (isSupported) {
          window.speechSynthesis.cancel(); // Stop any speaking on unmount
          window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [isSupported, updateVoices]);

  const speak = useCallback((
    text: string,
    options?: { lang?: string; rate?: number; pitch?: number; voice?: SpeechSynthesisVoice }
  ) => {
    if (!isSupported || isSpeaking) return;

    // Cancel previous utterance before starting new one
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options?.lang || 'en-US';
    utterance.rate = options?.rate || 1;
    utterance.pitch = options?.pitch || 1;

    if (options?.voice) {
      utterance.voice = options.voice;
    } else {
      // Optionally select a default voice if needed
      const defaultVoice = voices.find(v => v.default && v.lang === utterance.lang) || voices.find(v => v.lang === utterance.lang) || voices[0];
      if (defaultVoice) utterance.voice = defaultVoice;
    }


    utterance.onstart = () => {
      setIsSpeaking(true);
      setError(null);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      setError(`Speech synthesis error: ${event.error}`);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSupported, isSpeaking, voices]);

  const cancel = useCallback(() => {
    if (!isSupported || !isSpeaking) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported, isSpeaking]);

  return { speak, cancel, isSpeaking, isSupported, voices, error };
};