import React from 'react';
import { QuizQuestion as QuizQuestionType, QuizOption } from '../types/quiz';
import { ChevronRight } from 'lucide-react';

interface Props {
  question: QuizQuestionType;
  selectedAnswers: string | string[];
  onAnswerChange: (answer: string | string[]) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

export function QuizQuestion({ 
  question, 
  selectedAnswers, 
  onAnswerChange, 
  onNext,
  isLastQuestion 
}: Props) {
  const handleOptionClick = (value: string) => {
    if (question.multiSelect) {
      const currentAnswers = Array.isArray(selectedAnswers) ? selectedAnswers : [];
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter(answer => answer !== value)
        : [...currentAnswers, value];
      onAnswerChange(newAnswers);
    } else {
      onAnswerChange(value);
    }
  };

  const isAnswered = question.multiSelect 
    ? Array.isArray(selectedAnswers) && selectedAnswers.length > 0
    : selectedAnswers !== '';

  const isSelected = (value: string) => {
    if (question.multiSelect) {
      return Array.isArray(selectedAnswers) && selectedAnswers.includes(value);
    }
    return selectedAnswers === value;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full font-handwritten">
              Question {question.id}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-handwritten">
            {question.question}
          </h2>
          {question.multiSelect && (
            <p className="text-sm text-gray-600">Select all that apply</p>
          )}
        </div>

        <div className="space-y-3 mb-8">
          {question.options.map((option: QuizOption) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                isSelected(option.value)
                  ? 'border-green-500 bg-green-50 text-green-800 shadow-md'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-25'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option.label}</span>
                {isSelected(option.value) && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onNext}
            disabled={!isAnswered}
            className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 ${
              isAnswered
                ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLastQuestion ? 'Get My Recommendations' : 'Next'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}