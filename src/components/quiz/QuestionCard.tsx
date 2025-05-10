import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Question } from '@/types';
import McqOptions from './McqOptions';
import FreeTextAnswer from './FreeTextAnswer';
import FeedbackDisplay from './FeedbackDisplay';
import HintButton from '../ai/HintButton';
import { useQuiz } from '@/contexts/QuizContext';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useSettings } from '@/contexts/SettingsContext';
import { Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
    const { submitAnswer, feedback, nextQuestion, currentAnswer, setCurrentAnswer } = useQuiz();
    const { speak, isSpeaking, cancel, isSupported: isSpeechSupported } = useSpeechSynthesis();
    const { isVoiceOutputEnabled } = useSettings();

    const handleAnswerChange = (value: string) => {
        setCurrentAnswer(value);
    };

    const handleSubmit = () => {
        if (currentAnswer !== null) {
            submitAnswer(currentAnswer);
            // Optionally speak feedback if enabled
            if (isVoiceOutputEnabled && isSpeechSupported) {
                const feedbackText = currentAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()
                    ? `Correct! ${question.explanation}`
                    : `Incorrect. ${question.explanation}`;
                speak(feedbackText);
            }
        }
    };

    const handleSpeakQuestion = () => {
        if (isSpeaking) {
            cancel();
        } else if (isVoiceOutputEnabled && isSpeechSupported) {
            speak(question.text);
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

  return (
    <AnimatePresence mode="wait">
        <motion.div
            key={question.id} // Important for AnimatePresence to track changes
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={cardVariants}
            transition={{ duration: 0.3 }}
        >
            <Card className="w-full max-w-2xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="flex justify-between items-start">
                    <span>{question.text}</span>
                    {isVoiceOutputEnabled && isSpeechSupported && (
                        <Button variant="ghost" size="icon" onClick={handleSpeakQuestion} disabled={isSpeaking} className="ml-2 flex-shrink-0">
                            <Volume2 className="h-5 w-5" />
                            <span className="sr-only">Read question aloud</span>
                        </Button>
                    )}
                </CardTitle>
                <CardDescription>
                    {question.type === 'multiple-choice' ? 'Select the best answer.' : 'Type your answer below.'}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {question.type === 'multiple-choice' ? (
                <McqOptions
                    question={question}
                    onValueChange={handleAnswerChange}
                    selectedValue={currentAnswer}
                    disabled={!!feedback} // Disable options after submitting
                />
                ) : (
                <FreeTextAnswer
                    questionId={question.id}
                    value={currentAnswer}
                    onChange={handleAnswerChange}
                    disabled={!!feedback} // Disable input after submitting
                />
                )}

                {/* Display Feedback */}
                <AnimatePresence>
                {feedback && (
                     <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                     >
                        <FeedbackDisplay
                            isCorrect={feedback.isCorrect}
                            message={feedback.message}
                            explanation={feedback.explanation}
                        />
                    </motion.div>
                )}
                </AnimatePresence>

            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <HintButton hint={question.hint} disabled={!!feedback} />
                {!feedback ? (
                <Button onClick={handleSubmit} disabled={currentAnswer === null}>
                    Submit Answer
                </Button>
                ) : (
                <Button onClick={nextQuestion}>
                    Next Question
                </Button>
                )}
            </CardFooter>
            </Card>
        </motion.div>
     </AnimatePresence>
  );
};

export default QuestionCard;