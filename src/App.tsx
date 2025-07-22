import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizQuestion } from './components/QuizQuestion';
import { Results } from './components/Results';
import { ProgressBar } from './components/ProgressBar';
import { Logo } from './components/Logo';
import { QuizState, QuizAnswer } from './types/quiz';
import { quizQuestions } from './data/questions';
import { calculateRecommendations, submitQuizAnswers } from './utils/recommendation';

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    isComplete: false,
    recommendations: []
  });

  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>('');
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
    setQuizState(prev => ({ ...prev, currentQuestion: 1 }));
  };

  const handleAnswerChange = (answer: string | string[]) => {
    setCurrentAnswer(answer);
  };

  const handleNext = async () => {
    const newAnswer: QuizAnswer = {
      questionId: quizState.currentQuestion,
      answer: currentAnswer
    };

    const updatedAnswers = [...quizState.answers.filter(a => a.questionId !== quizState.currentQuestion), newAnswer];

    if (quizState.currentQuestion === quizQuestions.length) {
      // Quiz complete
      const recommendations = calculateRecommendations(updatedAnswers);
      
      // Submit data to external service
      try {
        await submitQuizAnswers(updatedAnswers, recommendations);
      } catch (error) {
        console.error('Failed to submit quiz data:', error);
      }

      setQuizState({
        currentQuestion: quizState.currentQuestion,
        answers: updatedAnswers,
        isComplete: true,
        recommendations
      });
    } else {
      // Next question
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        answers: updatedAnswers
      }));
    }

    // Reset current answer for next question
    setCurrentAnswer(quizQuestions[quizState.currentQuestion]?.multiSelect ? [] : '');
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestion: 0,
      answers: [],
      isComplete: false,
      recommendations: []
    });
    setCurrentAnswer('');
    setIsStarted(false);
  };

  const getCurrentQuestion = () => {
    return quizQuestions.find(q => q.id === quizState.currentQuestion);
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-8 px-4">
        <WelcomeScreen onStart={handleStart} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-8 px-4">
      <div className="container mx-auto">
        {!quizState.isComplete ? (
          <>
            <div className="max-w-2xl mx-auto mb-8">
              <Logo />
              <ProgressBar 
                current={quizState.currentQuestion} 
                total={quizQuestions.length} 
              />
            </div>
            
            {getCurrentQuestion() && (
              <QuizQuestion
                question={getCurrentQuestion()!}
                selectedAnswers={currentAnswer}
                onAnswerChange={handleAnswerChange}
                onNext={handleNext}
                isLastQuestion={quizState.currentQuestion === quizQuestions.length}
              />
            )}
          </>
        ) : (
          <>
            <div className="max-w-4xl mx-auto mb-12">
              <Logo />
            </div>
            <Results
              recommendations={quizState.recommendations}
              onRestart={handleRestart}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;