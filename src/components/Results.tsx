import React from 'react';
import { MatchaProduct } from '../types/quiz';
import { Award, MapPin, DollarSign, Leaf, RotateCcw } from 'lucide-react';

interface Props {
  recommendations: MatchaProduct[];
  onRestart: () => void;
}

export function Results({ recommendations, onRestart }: Props) {
  const formatPrice = (price: number) => `$${price.toFixed(2)}/g`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full mb-4">
          <Award className="w-6 h-6" />
          <span className="font-bold text-lg font-handwritten">Your Perfect Matcha Matches</span>
        </div>
        <p className="text-gray-600 text-lg font-script">
        </p>
        <p className="text-gray-600 text-lg">
          Based on your preferences, here are the top matcha powders we recommend for you!
        </p>
      </div>

      <div className="space-y-8 mb-12">
        {recommendations.map((product, index) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full font-handwritten">
                      #{index + 1} Match
                    </span>
                    <h3 className="text-2xl font-bold text-gray-800 font-handwritten">{product.name}</h3>
                  </div>
                  <p className="text-lg text-green-600 font-bold mb-3">{product.brand}</p>
                  {product.description && (
                    <p className="text-gray-600 mb-4">{product.description}</p>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="bg-green-50 px-4 py-2 rounded-xl">
                    <div className="flex items-center gap-1 text-green-700">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-bold text-lg font-handwritten">{formatPrice(product.pricePerGram)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 font-handwritten">
                    <Leaf className="w-4 h-4 text-green-600" />
                    Tasting Notes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tastingNotes.map(note => (
                      <span
                        key={note}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 font-handwritten">
                    <MapPin className="w-4 h-4 text-green-600" />
                    Details
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-bold">Region:</span> {product.region}</p>
                    <p><span className="font-bold">Best for:</span> {product.recommendedUse.join(', ')}</p>
                    <div className="flex gap-4">
                      <div>
                        <span className="font-bold">Sweetness:</span>
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < product.sweetnessLevel ? 'bg-green-500' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-bold">Astringency:</span>
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < product.astringencyLevel ? 'bg-amber-500' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl font-handwritten"
        >
          <RotateCcw className="w-5 h-5" />
          Take Quiz Again
        </button>
      </div>

      <div className="mt-12 bg-green-50 rounded-2xl p-8 text-center">
        <h3 className="text-lg font-bold text-green-800 mb-2 font-handwritten">Found your perfect match?</h3>
        <p className="text-green-700">
          Follow <span className="font-bold">@evolutionbakery</span> on TikTok for more matcha content!
        </p>
      </div>
    </div>
  );
}