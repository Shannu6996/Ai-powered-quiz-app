import { useState, useEffect, useCallback } from 'react';

// Import specific types if needed for clarity, though they should be global now
// import { SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from '@types/dom-speech-recognition';

interface SpeechRecognitionHook {
  isListening: boolean;
  transcript: string;
  error: string | null;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

// Access the constructor safely using the extended Window interface
const BrowserSpeechRecognition = typeof window !== 'undefined'
  ? window.SpeechRecognition || window.webkitSpeechRecognition // This accesses the CONSTRUCTOR
  : null;


export const useSpeechRecognition = (options?: { lang?: string; continuous?: boolean; interimResults?: boolean }): SpeechRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  // Use the SpeechRecognition type from the @types package (should be globally available now)
  const [recognitionInstance, setRecognitionInstance] = useState<SpeechRecognition | null>(null);

  // isSupported should check if the constructor exists
  const isSupported = !!BrowserSpeechRecognition;

  useEffect(() => {
    // If not supported, clear any existing instance and exit
    if (!isSupported || !BrowserSpeechRecognition) {
        setRecognitionInstance(null); // Ensure instance is cleared if support disappears
        // Optionally set an error if support was expected but is missing
        // if (!recognitionInstance && BrowserSpeechRecognition === null) {
        //     setError('Speech recognition is not supported in this browser.');
        // }
        return;
    }

    // Only create instance if one doesn't exist or options change fundamentally
    // (This part depends on how you want recreation handled, often just once is fine)
    // if (!recognitionInstance) { // Simple approach: create only once

        const recognition = new BrowserSpeechRecognition(); // Create instance
        recognition.lang = options?.lang || 'en-US';
        recognition.continuous = options?.continuous || false;
        recognition.interimResults = options?.interimResults || false;

        // Types should now be inferred correctly from the @types package
        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = '';
          // Use Array.from for better iteration support
          Array.from(event.results).slice(event.resultIndex).forEach(result => {
              if (result.isFinal) {
                  finalTranscript += result[0].transcript;
              }
          });

          if(finalTranscript) { // Update only if there's a final transcript
              setTranscript(prev => options?.continuous ? prev + finalTranscript : finalTranscript);
              if (!options?.continuous) {
                  stopListening();
              }
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          setError(`Speech recognition error: ${event.error} - ${event.message || '(no message)'}`);
          // Stop listening on error
          if (isListening) {
              stopListening(); // Use the hook's stopListening function
          }
        };

        recognition.onend = () => {
           // Check the state *before* setting it to false
           if (isListening) {
               setIsListening(false);
           }
           // console.log('Speech recognition service disconnected.');
        };

        setRecognitionInstance(recognition);

        // Cleanup function: Stop recognition when component unmounts or dependencies change
        return () => {
            recognition.stop();
        };
    // } // End of simple create-only-once block

  // Dependencies: Re-run if support or options change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupported, options?.lang, options?.continuous, options?.interimResults]);
  // NOTE: `stopListening` was removed from deps above as it caused issues.
  // isListening is not included to prevent loops, managed internally via callbacks.


  const startListening = useCallback(() => {
    if (!recognitionInstance || isListening) return; // Guard against no instance or already listening
    try {
      setTranscript(''); // Clear previous transcript
      setError(null);    // Clear previous error
      recognitionInstance.start();
      setIsListening(true);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        setError(`Failed to start recognition: ${message}`);
        setIsListening(false);
    }
  }, [recognitionInstance, isListening]); // Depends on instance and listening state


  const stopListening = useCallback(() => {
    if (!recognitionInstance || !isListening) return; // Guard
    recognitionInstance.stop();
    setIsListening(false);
    // console.log("Stopped listening via function call");
  }, [recognitionInstance, isListening]); // Depends on instance and listening state


  const resetTranscript = useCallback(() => {
      setTranscript('');
      setError(null); // Also clear error on reset
  }, []);


  return { isListening, transcript, error, isSupported, startListening, stopListening, resetTranscript };
};