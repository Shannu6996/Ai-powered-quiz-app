import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question, Choice } from '@/types';
import { useQuiz } from '@/contexts/QuizContext';

interface McqOptionsProps {
  question: Question;
  onValueChange: (value: string) => void;
  selectedValue: string | null;
  disabled: boolean; // Disable after submitting
}

const McqOptions: React.FC<McqOptionsProps> = ({ question, onValueChange, selectedValue, disabled }) => {
  const { feedback } = useQuiz();

  const getVariant = (choiceId: string): "correct" | "incorrect" | "default" => {
      if (!feedback) return "default";
      const isSelected = selectedValue === choiceId;
      const isCorrectAnswer = choiceId === question.correctAnswer;

      if (feedback.isCorrect && isSelected) return "correct";
      if (!feedback.isCorrect && isSelected) return "incorrect";
      if (!feedback.isCorrect && isCorrectAnswer) return "correct"; // Show correct if user was wrong
      return "default";
  }

  return (
    <RadioGroup
      value={selectedValue ?? undefined}
      onValueChange={onValueChange}
      className="space-y-3"
      disabled={disabled}
    >
      {question.choices?.map((choice: Choice) => {
         const variant = getVariant(choice.id);
         const variantClasses = {
             correct: "border-green-500 bg-green-100 dark:bg-green-900",
             incorrect: "border-red-500 bg-red-100 dark:bg-red-900",
             default: "border-border"
         }
         return (
            <Label
                key={choice.id}
                htmlFor={choice.id}
                className={`flex items-center space-x-3 p-4 border rounded-md cursor-pointer transition-colors ${variantClasses[variant]} ${disabled ? 'cursor-not-allowed opacity-70' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
                <RadioGroupItem value={choice.id} id={choice.id} disabled={disabled}/>
                <span>{choice.text}</span>
            </Label>
         );
      })}
    </RadioGroup>
  );
};

export default McqOptions;