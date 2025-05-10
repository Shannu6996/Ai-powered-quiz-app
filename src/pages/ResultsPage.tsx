// src/pages/ResultsPage.tsx
import React, { useEffect } from 'react';
// Remove 'Link' from this import statement
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '@/contexts/QuizContext';
import ResultsDisplay from '@/components/quiz/ResultsDisplay';
import { Button } from '@/components/ui/button';
import { Repeat, Home } from 'lucide-react';
// Keep Card imports if used for page structure
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ResultsPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { quiz, userAnswers, score, status, resetQuiz } = useQuiz();

  useEffect(() => {
    // Redirect home if quiz data isn't available or quiz wasn't completed
    if (status !== 'completed' || !quiz) {
      // console.warn("Redirecting from results: Status not completed or no quiz data.");
      navigate('/');
    }
  }, [status, quiz, navigate]); // Added quiz to dependencies

  // Render null or loading indicator while checking status/data or during redirect
  if (status !== 'completed' || !quiz) {
    return null; // Or <LoadingSpinner /> if preferred
  }

  // Handle retake action
  const handleRetake = () => {
    resetQuiz(); // Reset the quiz state
    if (quizId) {
        navigate(`/quiz/${quizId}`); // Navigate back to the quiz page
    } else {
        navigate('/'); // Fallback to home if quizId is somehow missing
    }
  };

  // Handle navigating home
  const handleGoHome = () => {
      resetQuiz(); // Also reset quiz state when going home
      navigate('/');
  };


  return (
    <div className="max-w-3xl mx-auto">
      <Card className="overflow-hidden"> {/* Added overflow-hidden */}
         <CardHeader className="text-center bg-muted/50 pb-4"> {/* Added subtle bg and adjusted padding */}
            <CardTitle className="text-2xl sm:text-3xl">Quiz Results: {quiz.title}</CardTitle>
         </CardHeader>

        {/* Use the ResultsDisplay component */}
        <ResultsDisplay
          quiz={quiz}
          userAnswers={userAnswers}
          score={score}
        />

        {/* Footer with actions remains at the page level */}
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 p-6 bg-muted/50 border-t"> {/* Added bg, padding */}
          <Button onClick={handleRetake} variant="outline">
            <Repeat className="mr-2 h-4 w-4" /> Retake Quiz
          </Button>
          <Button onClick={handleGoHome}>
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultsPage;