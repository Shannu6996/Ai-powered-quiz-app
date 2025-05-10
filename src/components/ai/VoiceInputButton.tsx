import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


interface VoiceInputButtonProps {
  isListening: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({ isListening, onClick, disabled }) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            disabled={disabled}
            className={`transition-colors ${isListening ? 'text-red-500 hover:text-red-600' : 'text-primary hover:text-primary/80'}`}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            <span className="sr-only">{isListening ? 'Stop Listening' : 'Start Listening'}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isListening ? 'Stop Voice Input' : 'Use Voice Input'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VoiceInputButton;