import React from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


interface HintButtonProps {
  hint?: string;
  disabled?: boolean;
}

const HintButton: React.FC<HintButtonProps> = ({ hint, disabled }) => {
  if (!hint) return null; // Don't render if no hint available

  return (
     <TooltipProvider delayDuration={100}>
        <Tooltip>
            <AlertDialog>
            <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" disabled={disabled} className="gap-1">
                    <Lightbulb className="h-4 w-4" /> Hint
                    </Button>
                </AlertDialogTrigger>
                </TooltipTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hint</AlertDialogTitle>
                    <AlertDialogDescription>
                    {hint}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Got it!</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
             <TooltipContent>
                <p>Need a little help? Get a hint!</p>
            </TooltipContent>
        </Tooltip>
     </TooltipProvider>
  );
};

export default HintButton;