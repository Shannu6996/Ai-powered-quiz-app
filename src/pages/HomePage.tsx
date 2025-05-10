import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Added CardFooter
import { Quiz } from '@/types';
import { fetchQuizzes } from '@/data/quizData'; // Using mock fetch
// Correct: Use default import for LoadingSpinner
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { AlertCircle } from 'lucide-react'; // Import icon for error message
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert components

// **** REMOVE THE LOCAL LoadingSpinner DEFINITION ****
// Delete the entire 'function LoadingSpinner() { ... }' block
// and its 'export default LoadingSpinner' that was previously here (around line 11).

// Define the HomePage component
const HomePage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        setIsLoading(true);
        setError(null); // Reset error before fetching
        const data = await fetchQuizzes();
        setQuizzes(data);
      } catch (err) {
        console.error("Failed to load quizzes:", err);
        setError("Could not load quizzes. Please try again later.");
        setQuizzes([]); // Clear quizzes on error
      } finally {
        setIsLoading(false);
      }
    };
    loadQuizzes();
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Welcome to the AI Quiz App⚡</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Select a quiz below to test your knowledge. AI assistance is available during the quiz!
        </p>
      </div>

      {/* Loading State */}
      {isLoading && <LoadingSpinner />}

      {/* Error State */}
      {error && !isLoading && (
         <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Quizzes</AlertTitle>
            <AlertDescription>
                {error}
            </AlertDescription>
        </Alert>
      )}

      {/* Success State */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.length === 0 ? (
            <p className="text-muted-foreground col-span-full text-center">No quizzes available at the moment.</p>
          ) : (
             quizzes.map((quiz) => (
               <Card key={quiz.id} className="flex flex-col transition-shadow duration-200 hover:shadow-md">
                 <CardHeader>
                   <CardTitle>{quiz.title}</CardTitle>
                   <CardDescription>{quiz.description}</CardDescription>
                 </CardHeader>
                 <CardContent className="flex-grow"> {/* Use flex-grow to push footer down */}
                   <p className="text-sm text-muted-foreground">
                     {quiz.questions.length} {quiz.questions.length === 1 ? 'question' : 'questions'}
                   </p>
                 </CardContent>
                 <CardFooter> {/* Use CardFooter for semantic button placement */}
                    <Button asChild className="w-full">
                       <Link to={`/quiz/${quiz.id}`}>Start Quiz</Link>
                    </Button>
                 </CardFooter>
               </Card>
             ))
          )}
           {/* Placeholder for Personalized Recommendations - Keep structure similar */}
           {/* <Card className="border-dashed border-primary bg-primary/5 flex flex-col">
                <CardHeader>
                    <CardTitle>Recommended For You</CardTitle>
                    <CardDescription>Based on your previous performance.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">Recommendation feature coming soon!</p>
                </CardContent>
                 <CardFooter>
                    <Button disabled className="w-full">Start Recommended Quiz</Button>
                 </CardFooter>
           </Card> */}
        </div>
      )}
    </div>
  );
};

// Ensure only ONE default export for the HomePage component
export default HomePage;