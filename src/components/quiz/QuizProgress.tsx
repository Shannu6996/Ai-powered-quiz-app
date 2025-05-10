import React from 'react';
import { Progress } from "@/components/ui/progress";
import { useQuiz } from '@/contexts/QuizContext';

const QuizProgress: React.FC = () => {
  const { currentQuestionIndex, quiz } = useQuiz();
  const totalQuestions = quiz?.questions.length ?? 0;
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm text-muted-foreground mb-1">
        <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="w-full h-2" />
    </div>
  );
};

export default QuizProgress;