// src/components/quiz/ResultsDisplay.tsx
import React from 'react';
import { Quiz, UserAnswer } from '@/types';
// Remove 'CardTitle' from this import statement
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Check, X } from 'lucide-react';

interface ResultsDisplayProps {
  quiz: Quiz;
  userAnswers: UserAnswer[];
  score: number;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ quiz, userAnswers, score }) => {
  const totalQuestions = quiz.questions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const getQuestionById = (id: string) => quiz.questions.find(q => q.id === id);

  return (
    <Card className="shadow-lg w-full border-none"> {/* Adjusted border */}
      <CardHeader className="text-center pt-0"> {/* Removed top padding */}
        {/* CardTitle removed as it's handled by the parent page */}
        <CardDescription>Here's how you did:</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Summary Section */}
        <div className="text-center p-6 bg-muted rounded-lg">
          <p className="text-lg font-semibold">Your Score</p>
          <p className="text-5xl font-bold my-2">{score} / {totalQuestions}</p>
          <p className="text-3xl font-semibold text-primary">{percentage}%</p>
        </div>

        <Separator />

        {/* Answer Review Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">Review Your Answers</h3>
          <ScrollArea className="h-[300px] border rounded-md p-4">
            <div className="space-y-4">
              {userAnswers.map((answer, index) => {
                const question = getQuestionById(answer.questionId);
                if (!question) return null;
                return (
                  <div key={answer.questionId} className="p-3 border-b last:border-b-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium">Q{index + 1}: {question.text}</p>
                      {answer.isCorrect ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 ml-2" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 flex-shrink-0 ml-2" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your answer: <span className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>{question.type === 'multiple-choice' ? question.choices?.find(c => c.id === answer.answer)?.text : answer.answer}</span>
                    </p>
                    {!answer.isCorrect && (
                      <p className="text-sm text-muted-foreground">
                        Correct answer: <span className="text-green-600">{question.type === 'multiple-choice' ? question.choices?.find(c => c.id === question.correctAnswer)?.text : question.correctAnswer}</span>
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1 italic">Explanation: {question.explanation}</p>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
      {/* Footer actions are handled by the parent ResultsPage */}
    </Card>
  );
};

export default ResultsDisplay;