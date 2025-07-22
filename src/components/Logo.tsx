import React from 'react';
import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Leaf className="text-green-600 w-8 h-8" />
        <h1 className="text-4xl font-bold text-green-800 font-handwritten">
          Olivia's Matcha Finder
        </h1>
        <span className="text-2xl">🍵</span>
      </div>
      <p className="text-base text-green-600 font-bold">@evolutionbakery</p>
    </div>
  );
}