import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import HomePage from '@/pages/HomePage';
import QuizPage from '@/pages/QuizPage';
import ResultsPage from '@/pages/ResultsPage';
import { SettingsProvider } from './contexts/SettingsContext';
import { QuizProvider } from './contexts/QuizContext';
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <Router>
      <SettingsProvider>
        <TooltipProvider> {/* Wrap with TooltipProvider */}
          <QuizProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz/:quizId" element={<QuizPage />} />
                <Route path="/results/:quizId" element={<ResultsPage />} />
                {/* Optional: Add a 404 Not Found route */}
                {/* <Route path="*" element={<NotFoundPage />} /> */}
              </Routes>
            </Layout>
          </QuizProvider>
        </TooltipProvider>
      </SettingsProvider>
    </Router>
  );
}

export default App;
