import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '@/contexts/QuizContext';
import QuestionCard from '@/components/quiz/QuestionCard';
import QuizProgress from '@/components/quiz/QuizProgress';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { usePrompt } from '@/hooks/usePrompt'; // ✅ Import prompt

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const {
    quiz,
    currentQuestion,
    status,
    startQuiz,
    isLoading,
  } = useQuiz();

  // Start or restore quiz on mount
  useEffect(() => {
    const savedStatus = localStorage.getItem('quizStatus');
    const savedQuizId = localStorage.getItem('quizId');

    if (quizId && (status === 'idle' || (savedStatus === 'active' && savedQuizId === quizId))) {
      startQuiz(quizId);
    }
  }, [quizId, startQuiz, status]);

  // Persist status and quizId when quiz starts
  useEffect(() => {
    if (status === 'active') {
      localStorage.setItem('quizStatus', 'active');
      localStorage.setItem('quizId', quizId ?? '');
    } else if (status === 'completed') {
      localStorage.removeItem('quizStatus');
      localStorage.removeItem('quizId');
    }
  }, [status, quizId]);

  // Block refresh/close tab
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (status === 'active') {
        e.preventDefault();
        e.returnValue = 'You have an ongoing quiz. Are you sure you want to leave?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [status]);

  // ✅ Block internal navigation during active quiz
  usePrompt('⚠️ You will lose your quiz progress. Are you sure you want to leave?', status === 'active');

  // Redirect to results when quiz is completed
  useEffect(() => {
    if (status === 'completed' && quizId) {
      navigate(`/results/${quizId}`);
    }
  }, [status, navigate, quizId]);

  if (isLoading) return <LoadingSpinner />;

  if (status === 'idle' && !isLoading) {
    return (
      <div className="text-center space-y-4">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Could not load the quiz. It might not exist or there was a network issue.
          </AlertDescription>
        </Alert>
        <Button onClick={() => navigate('/')} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </div>
    );
  }

  if (!quiz || !currentQuestion) {
    return <p className="text-center text-muted-foreground">Preparing quiz...</p>;
  }

  if (status === 'active') {
    return (
      <div className="relative pb-20" key={quiz.id}>
        <QuizProgress />
        <QuestionCard question={currentQuestion} />
      </div>
    );
  }

  return null;
};

export default QuizPage;
