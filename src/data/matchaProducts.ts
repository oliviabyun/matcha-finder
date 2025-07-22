import { MatchaProduct } from '../types/quiz';

// Sample data structure - you'll need to populate this with actual scraped data
export const matchaProducts: MatchaProduct[] = [
  // Maryuku Koyamaen samples
  {
    id: "mk-1",
    name: "Genko",
    brand: "Maryuku Koyamaen",
    pricePerGram: 0.85,
    tastingNotes: ["creamy", "sweet", "vegetal"],
    sweetnessLevel: 4,
    astringencyLevel: 2,
    recommendedUse: ["usucha", "latte"],
    region: "Uji, Kyoto",
    shipsTo: ["asia", "north-america", "europe"],
    description: "A smooth, approachable matcha with natural sweetness"
  },
  {
    id: "mk-2",
    name: "Chigi-no-shiro",
    brand: "Maryuku Koyamaen",
    pricePerGram: 1.20,
    tastingNotes: ["umami", "astringent", "vegetal"],
    sweetnessLevel: 2,
    astringencyLevel: 4,
    recommendedUse: ["usucha", "koicha"],
    region: "Uji, Kyoto",
    shipsTo: ["asia", "north-america", "europe"],
    description: "Traditional ceremonial grade with deep umami"
  },
  // Ippodo samples
  {
    id: "ip-1",
    name: "Ikuyo",
    brand: "Ippodo",
    pricePerGram: 0.45,
    tastingNotes: ["bitter", "vegetal", "astringent"],
    sweetnessLevel: 2,
    astringencyLevel: 4,
    recommendedUse: ["culinary", "latte"],
    region: "Uji, Kyoto",
    shipsTo: ["asia", "north-america", "europe", "oceania"],
    description: "Affordable option perfect for lattes and baking"
  },
  {
    id: "ip-2",
    name: "Ummon-no-mukashi",
    brand: "Ippodo",
    pricePerGram: 2.10,
    tastingNotes: ["sweet", "creamy", "nutty", "umami"],
    sweetnessLevel: 4,
    astringencyLevel: 2,
    recommendedUse: ["usucha", "koicha"],
    region: "Uji, Kyoto",
    shipsTo: ["asia", "north-america", "europe", "oceania"],
    description: "Premium ceremonial grade with exceptional complexity"
  },
  // Horii Shichimeien samples
  {
    id: "hs-1",
    name: "Kiwami",
    brand: "Horii Shichimeien",
    pricePerGram: 1.85,
    tastingNotes: ["chocolate", "creamy", "sweet"],
    sweetnessLevel: 5,
    astringencyLevel: 1,
    recommendedUse: ["usucha", "latte"],
    region: "Uji, Kyoto",
    shipsTo: ["asia", "north-america", "europe"],
    description: "Unique chocolate notes with incredible smoothness"
  },
  // Add more sample products from other brands...
  {
    id: "nt-1",
    name: "Genmai-cha Matcha Blend",
    brand: "Nakamura Tokichi",
    pricePerGram: 0.38,
    tastingNotes: ["nutty", "sweet", "vegetal"],
    sweetnessLevel: 3,
    astringencyLevel: 2,
    recommendedUse: ["culinary", "latte"],
    region: "Uji, Kyoto",
    shipsTo: ["asia", "north-america"],
    description: "Unique blend with roasted rice for added nuttiness"
  }
];

// Note: This is a sample dataset. You'll need to scrape and populate with actual data from:
// - Yamamasa Koyamaen
// - Maruyasu  
// - Fukujuen
// - Shogyokuen
// - Kanbayashi Shunsho
// And expand the existing brand samples to 5-10 products each