import { QuizQuestion } from '../types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How long have you been drinking matcha?",
    options: [
      { value: "new", label: "I'm completely new to matcha!" },
      { value: "casual", label: "I enjoy matcha or matcha flavored things, but haven't really made it at home" },
      { value: "occasional", label: "I occasionally make matcha at home" },
      { value: "daily", label: "Matcha is part of my daily routine :)" }
    ]
  },
  {
    id: 2,
    question: "How do you plan to drink your matcha?",
    options: [
      { 
        value: "sweet", 
        label: "I prefer sweet matcha drinks (e.g. strawberry matcha, matcha einspanner)",
        points: { culinary: 3, sweet: 2 }
      },
      { 
        value: "latte", 
        label: "I prefer matcha lattes",
        points: { latte: 3, creamy: 2 }
      },
      { 
        value: "traditional", 
        label: "I prefer usucha/koicha (thin/thick tea with no milk)",
        points: { usucha: 2, koicha: 2, traditional: 3 }
      }
    ]
  },
  {
    id: 3,
    question: "What is your preferred price range?",
    options: [
      { 
        value: "budget", 
        label: "Less than $0.50/g (in USD)",
        points: { budget: 3 }
      },
      { 
        value: "mid", 
        label: "Less than $1.00/g (in USD)",
        points: { mid: 3 }
      },
      { 
        value: "premium", 
        label: "No strong preference",
        points: { premium: 1, mid: 1, budget: 1 }
      }
    ]
  },
  {
    id: 4,
    question: "What continent are you based in?",
    options: [
      { value: "asia", label: "Asia" },
      { value: "oceania", label: "Oceania" },
      { value: "north-america", label: "North America" },
      { value: "south-america", label: "South America" },
      { value: "africa", label: "Africa" },
      { value: "europe", label: "Europe" }
    ]
  },
  {
    id: 5,
    question: "What are some of your favorite tasting notes and properties in matcha?",
    multiSelect: true,
    options: [
      { 
        value: "creaminess", 
        label: "Creaminess🥛",
        points: { creamy: 3 }
      },
      { 
        value: "sweetness", 
        label: "Sweetness🍬",
        points: { sweet: 3 }
      },
      { 
        value: "bitterness", 
        label: "Bitterness💥",
        points: { bitter: 3 }
      },
      { 
        value: "astringency", 
        label: "Astringency (drying feeling in the mouth)",
        points: { astringent: 3 }
      },
      { 
        value: "vegetables", 
        label: "Steamed vegetables🫛🥬 (e.g. pea or spinach)",
        points: { vegetal: 3 }
      },
      { 
        value: "chocolate", 
        label: "Chocolate🍫",
        points: { chocolate: 3 }
      },
      { 
        value: "nuts", 
        label: "Nuts🥜",
        points: { nutty: 3 }
      },
      { 
        value: "seaweed", 
        label: "Seaweed🌊",
        points: { umami: 3 }
      }
    ]
  },
  {
    id: 6,
    question: "Last but not least, how did you hear about this little quiz?",
    options: [
      { value: "tiktok", label: "TikTok" },
      { value: "instagram", label: "Instagram" },
      { value: "word-of-mouth", label: "Word of Mouth" },
      { value: "friend", label: "Friend" },
      { value: "other", label: "Other" }
    ]
  }
];