import React, { useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import VoiceInputButton from '../ai/VoiceInputButton';
import { useSettings } from '@/contexts/SettingsContext';
import { useQuiz } from '@/contexts/QuizContext';


interface FreeTextAnswerProps {
  questionId: string;
  value: string | null;
  onChange: (value: string) => void;
  disabled: boolean;
}

const FreeTextAnswer: React.FC<FreeTextAnswerProps> = ({ questionId, value, onChange, disabled }) => {
    const { isVoiceInputEnabled } = useSettings();
    const { feedback } = useQuiz();
    const { transcript, isListening, startListening, stopListening, resetTranscript, isSupported } = useSpeechRecognition();

    // Update textarea when transcript changes
    useEffect(() => {
        if (transcript) {
            onChange(transcript);
            // Optionally reset transcript after applying it
            // resetTranscript();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transcript]); // only run when transcript updates


    const handleVoiceButtonClick = () => {
        if (isListening) {
            stopListening();
        } else {
            resetTranscript(); // Clear previous transcript before starting new one
            startListening();
        }
    }

    const isCorrect = feedback ? feedback.isCorrect : undefined;
    const variantClasses = isCorrect === true ? "border-green-500 focus-visible:ring-green-500"
                          : isCorrect === false ? "border-red-500 focus-visible:ring-red-500"
                          : "border-input";


  return (
    <div className="space-y-2">
      <Label htmlFor={`freetext-${questionId}`}>Your Answer:</Label>
      <div className="relative">
          <Textarea
            id={`freetext-${questionId}`}
            placeholder="Type your answer here..."
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            rows={4}
            className={`pr-12 ${variantClasses}`} // Add padding for the button
          />
          {isVoiceInputEnabled && isSupported && (
              <div className="absolute bottom-2 right-2">
                  <VoiceInputButton
                    isListening={isListening}
                    onClick={handleVoiceButtonClick}
                    disabled={disabled}
                  />
              </div>
          )}
      </div>
       {!isSupported && isVoiceInputEnabled && <p className="text-xs text-red-500 mt-1">Voice input not supported in this browser.</p>}
    </div>
  );
};

export default FreeTextAnswer;