import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// Remove 'Info' from this import line
import { CheckCircle2, XCircle } from 'lucide-react';

interface FeedbackDisplayProps {
  isCorrect: boolean;
  message: string;
  explanation?: string;
  // Optional: Add follow-up prop later if needed
  // followUpQuestion?: string;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ isCorrect, message, explanation }) => {
  return (
    // Use AnimatePresence in the parent (QuestionCard) if smooth appearance is desired
    <Alert
      variant={isCorrect ? "default" : "destructive"}
      className={`mt-4 ${isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'} transition-all duration-300`} // Added subtle background and transition
    >
      {isCorrect ? (
         <CheckCircle2 className="h-4 w-4 text-green-600" /> // Slightly darker color for better contrast
      ) : (
         <XCircle className="h-4 w-4 text-red-600" /> // Slightly darker color for better contrast
      )}
      <AlertTitle className="font-semibold">{message}</AlertTitle> {/* Make title bold */}
      {explanation && (
        <AlertDescription className="mt-2 text-foreground/80"> {/* Adjust text color */}
          <strong>Explanation:</strong> {explanation}
        </AlertDescription>
      )}
       {/* Placeholder for AI Follow-up (still commented out, so Info icon is not needed) */}
       {/* {followUpQuestion && (
          <AlertDescription className="mt-2 text-blue-600 dark:text-blue-400 border-t pt-2">
             <Info className="inline h-4 w-4 mr-1"/> Follow-up: {followUpQuestion}
          </AlertDescription>
       )} */}
    </Alert>
  );
};

export default FeedbackDisplay;