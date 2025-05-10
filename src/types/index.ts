export type QuestionType = 'multiple-choice' | 'free-text';

export interface Choice {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  choices?: Choice[]; // Only for multiple-choice
  correctAnswer: string; // ID of the correct choice or the exact free text answer
  explanation: string;
  hint?: string; // AI Hint
  followUp?: { // AI Follow-up question based on answer
    correct: string;
    incorrect: string;
  };
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface UserAnswer {
  questionId: string;
  answer: string; // Choice ID or free text
  isCorrect: boolean;
}

export type QuizStatus = 'idle' | 'active' | 'completed';

export interface ChatMessage {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    timestamp: number;
}