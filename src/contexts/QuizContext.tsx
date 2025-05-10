import { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Quiz, Question, UserAnswer, QuizStatus } from '@/types';
import { fetchQuizById } from '@/data/quizData'; // Using mock fetch

interface QuizContextProps {
  quiz: Quiz | null;
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  status: QuizStatus;
  score: number;
  startQuiz: (quizId: string) => Promise<void>;
  submitAnswer: (answer: string) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  isLoading: boolean;
  feedback: { message: string; isCorrect: boolean; explanation?: string } | null;
  currentAnswer: string | null; // Store temporary answer before submission
  setCurrentAnswer: (answer: string | null) => void;
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [status, setStatus] = useState<QuizStatus>('idle');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean; explanation?: string } | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);


  const currentQuestion = quiz?.questions[currentQuestionIndex] || null;

  const startQuiz = useCallback(async (quizId: string) => {
    setIsLoading(true);
    setFeedback(null);
    setCurrentAnswer(null);
    try {
      const fetchedQuiz = await fetchQuizById(quizId);
      if (fetchedQuiz) {
        setQuiz(fetchedQuiz);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setStatus('active');
      } else {
        // Handle quiz not found
        console.error("Quiz not found!");
        setStatus('idle');
      }
    } catch (error) {
      console.error("Failed to load quiz:", error);
      setStatus('idle');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitAnswer = useCallback((answer: string) => {
    if (!currentQuestion || status !== 'active') return;

    const isCorrect = answer.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();

    const userAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      isCorrect,
    };

    setUserAnswers(prev => [...prev, userAnswer]);

    setFeedback({
        message: isCorrect ? 'Correct!' : 'Incorrect!',
        isCorrect: isCorrect,
        explanation: currentQuestion.explanation
    });
    // Don't advance immediately, let user see feedback and click next
    // setStatus('feedback'); // Maybe a specific status for feedback view?
  }, [currentQuestion, status]);

  const nextQuestion = useCallback(() => {
    setFeedback(null); // Clear feedback
    setCurrentAnswer(null); // Clear selection/input for next question

    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStatus('completed');
    }
  }, [quiz, currentQuestionIndex]);

  const resetQuiz = useCallback(() => {
    setQuiz(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setStatus('idle');
    setIsLoading(false);
    setFeedback(null);
    setCurrentAnswer(null);
  }, []);

  const score = userAnswers.filter(a => a.isCorrect).length;

  return (
    <QuizContext.Provider value={{
      quiz,
      currentQuestion,
      currentQuestionIndex,
      userAnswers,
      status,
      score,
      startQuiz,
      submitAnswer,
      nextQuestion,
      resetQuiz,
      isLoading,
      feedback,
      currentAnswer,
      setCurrentAnswer
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextProps => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};