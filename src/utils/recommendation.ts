import { QuizAnswer, MatchaProduct } from '../types/quiz';
import { matchaProducts } from '../data/matchaProducts';
import { submitQuizData, QuizSubmission } from './dataCollection';

interface UserProfile {
  experience: string;
  drinkStyle: string;
  priceRange: string;
  continent: string;
  tastePreferences: string[];
  source: string;
}

interface ScoredProduct extends MatchaProduct {
  score: number;
  matchReasons: string[];
}

export function calculateRecommendations(answers: QuizAnswer[]): MatchaProduct[] {
  const userProfile = buildUserProfile(answers);
  const scoredProducts = scoreProducts(userProfile);
  
  // Filter by shipping availability
  const availableProducts = scoredProducts.filter(product => 
    product.shipsTo.includes(userProfile.continent)
  );
  
  // Sort by score and return top 3
  return availableProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function buildUserProfile(answers: QuizAnswer[]): UserProfile {
  const profile: UserProfile = {
    experience: '',
    drinkStyle: '',
    priceRange: '',
    continent: '',
    tastePreferences: [],
    source: ''
  };

  answers.forEach(answer => {
    switch (answer.questionId) {
      case 1:
        profile.experience = answer.answer as string;
        break;
      case 2:
        profile.drinkStyle = answer.answer as string;
        break;
      case 3:
        profile.priceRange = answer.answer as string;
        break;
      case 4:
        profile.continent = answer.answer as string;
        break;
      case 5:
        profile.tastePreferences = answer.answer as string[];
        break;
      case 6:
        profile.source = answer.answer as string;
        break;
    }
  });

  return profile;
}

function scoreProducts(profile: UserProfile): ScoredProduct[] {
  return matchaProducts.map(product => {
    let score = 0;
    const matchReasons: string[] = [];

    // Price scoring
    score += scorePriceMatch(product.pricePerGram, profile.priceRange, matchReasons);
    
    // Usage scoring
    score += scoreUsageMatch(product.recommendedUse, profile.drinkStyle, matchReasons);
    
    // Taste preference scoring
    score += scoreTasteMatch(product.tastingNotes, profile.tastePreferences, matchReasons);
    
    // Experience level bonus
    score += scoreExperienceMatch(product, profile.experience, matchReasons);

    return {
      ...product,
      score,
      matchReasons
    };
  });
}

function scorePriceMatch(price: number, priceRange: string, reasons: string[]): number {
  let score = 0;
  
  switch (priceRange) {
    case 'budget':
      if (price < 0.50) {
        score += 15;
        reasons.push('Within budget range');
      } else if (price < 0.70) {
        score += 8;
        reasons.push('Close to budget range');
      }
      break;
    case 'mid':
      if (price < 1.00) {
        score += 15;
        reasons.push('Within preferred price range');
      } else if (price < 1.30) {
        score += 8;
        reasons.push('Close to preferred price range');
      }
      break;
    case 'premium':
      score += 5; // No price penalty for premium preference
      break;
  }
  
  return score;
}

function scoreUsageMatch(recommendedUse: string[], drinkStyle: string, reasons: string[]): number {
  let score = 0;
  
  switch (drinkStyle) {
    case 'sweet':
      if (recommendedUse.includes('culinary')) {
        score += 20;
        reasons.push('Perfect for sweet drinks');
      }
      break;
    case 'latte':
      if (recommendedUse.includes('latte')) {
        score += 20;
        reasons.push('Excellent for lattes');
      } else if (recommendedUse.includes('usucha')) {
        score += 10;
        reasons.push('Good for lattes');
      }
      break;
    case 'traditional':
      if (recommendedUse.includes('usucha') || recommendedUse.includes('koicha')) {
        score += 20;
        reasons.push('Traditional ceremonial preparation');
      }
      break;
  }
  
  return score;
}

function scoreTasteMatch(productNotes: string[], preferences: string[], reasons: string[]): number {
  let score = 0;
  const matches: string[] = [];
  
  // Map preference values to product tasting note keys
  const noteMapping: { [key: string]: string[] } = {
    creaminess: ['creamy'],
    sweetness: ['sweet'],
    bitterness: ['bitter'],
    astringency: ['astringent'],
    vegetables: ['vegetal'],
    chocolate: ['chocolate'],
    nuts: ['nutty'],
    seaweed: ['umami']
  };
  
  preferences.forEach(pref => {
    const notes = noteMapping[pref] || [pref];
    notes.forEach(note => {
      if (productNotes.includes(note)) {
        score += 10;
        matches.push(note);
      }
    });
  });
  
  if (matches.length > 0) {
    reasons.push(`Matches taste preferences: ${matches.join(', ')}`);
  }
  
  return score;
}

function scoreExperienceMatch(product: MatchaProduct, experience: string, reasons: string[]): number {
  let score = 0;
  
  switch (experience) {
    case 'new':
      // Prefer sweeter, less astringent options for beginners
      if (product.sweetnessLevel >= 3 && product.astringencyLevel <= 2) {
        score += 5;
        reasons.push('Beginner-friendly profile');
      }
      break;
    case 'casual':
      // Prefer versatile options
      if (product.recommendedUse.includes('latte') || product.recommendedUse.includes('culinary')) {
        score += 3;
      }
      break;
    case 'daily':
      // Prefer traditional high-quality options
      if (product.recommendedUse.includes('usucha') || product.recommendedUse.includes('koicha')) {
        score += 5;
        reasons.push('Perfect for daily traditional preparation');
      }
      break;
  }
  
  return score;
}

// Enhanced function to send data to external services
export async function submitQuizAnswers(answers: QuizAnswer[], recommendations: MatchaProduct[]): Promise<void> {
  const userProfile = buildUserProfile(answers);
  
  const submission: QuizSubmission = {
    timestamp: new Date().toISOString(),
    experience: userProfile.experience,
    drinkStyle: userProfile.drinkStyle,
    priceRange: userProfile.priceRange,
    continent: userProfile.continent,
    tastePreferences: userProfile.tastePreferences,
    source: userProfile.source,
    recommendations: recommendations.map(r => `${r.brand} - ${r.name}`)
  };
  
}