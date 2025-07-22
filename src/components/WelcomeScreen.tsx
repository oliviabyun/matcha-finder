import React from 'react';
import { Play } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: Props) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <Logo />
      
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-handwritten">
            Discover Your Perfect Matcha Match
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Not sure which matcha powder is right for you? This personalized quiz will help you 
            find the perfect match based on your taste preferences, budget, and how you like to 
            enjoy your matcha.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="font-bold text-green-800 mb-1 font-handwritten">🎯 Personalized</div>
            <div className="text-green-700">Tailored recommendations just for you</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="font-bold text-green-800 mb-1 font-handwritten">⚡ Quick</div>
            <div className="text-green-700">Only 6 questions, takes 2 minutes</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="font-bold text-green-800 mb-1 font-handwritten">🌿 Curated</div>
            <div className="text-green-700">Premium Japanese matcha brands</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="font-bold text-green-800 mb-1 font-handwritten">📚 Educational</div>
            <div className="text-green-700">Learn about different matcha profiles</div>
          </div>
        </div>

        <button
          onClick={onStart}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 mx-auto hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-handwritten"
        >
          <Play className="w-6 h-6" />
          Start Quiz
        </button>
      </div>

      <p className="text-sm text-gray-500">
        Your responses help us recommend the best matcha for your preferences and will be used 
        to improve our recommendations for future users.
      </p>
    </div>
  );
}