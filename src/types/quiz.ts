export interface QuizAnswer {
  questionId: number;
  answer: string | string[];
}

export interface MatchaProduct {
  id: string;
  name: string;
  brand: string;
  pricePerGram: number;
  tastingNotes: string[];
  sweetnessLevel: number; // 1-5 scale
  astringencyLevel: number; // 1-5 scale
  recommendedUse: ('culinary' | 'latte' | 'usucha' | 'koicha')[];
  region: string;
  shipsTo: string[]; // continents
  description?: string;
}

export interface QuizState {
  currentQuestion: number;
  answers: QuizAnswer[];
  isComplete: boolean;
  recommendations: MatchaProduct[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  multiSelect?: boolean;
}

export interface QuizOption {
  value: string;
  label: string;
  points?: { [key: string]: number };
}