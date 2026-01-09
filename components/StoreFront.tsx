import React, { useState } from 'react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../services/mockData';
import { Plus, Check, Info, Bot } from 'lucide-react';
import { generateProductInsights } from '../services/aiService';

interface StoreFrontProps {
  addToCart: (product: Product) => void;
}

export const StoreFront: React.FC<StoreFrontProps> = ({ addToCart }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [aiInsights, setAiInsights] = useState<Record<string, string>>({});

  const handleAddToCart = (product: Product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
    }, 600); // Simulate network latency to Cart Service
  };

  const handleAnalyze = async (product: Product) => {
    if (aiInsights[product.id]) return;
    
    setAnalyzingId(product.id);
    const insight = await generateProductInsights(product);
    setAiInsights(prev => ({ ...prev, [product.id]: insight }));
    setAnalyzingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
          Tech Essentials
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Premium gear for developers, designers, and tech enthusiasts. 
          Powered by a scalable microservices architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col overflow-hidden">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-slate-200 relative">
              <img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover object-center group-hover:opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-slate-800 backdrop-blur-sm">
                  {product.category}
                </span>
              </div>
            </div>
            
            <div className="flex-1 p-6 flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {product.name}
              </h3>
              <p className="text-slate-500 text-sm mb-4 flex-grow line-clamp-2">
                {product.description}
              </p>
              
              {/* AI Insight Section */}
              {aiInsights[product.id] && (
                <div className="mb-4 bg-emerald-50 p-3 rounded-lg text-xs text-emerald-800 animate-fadeIn">
                   <div className="flex items-center mb-1 font-semibold">
                     <Bot className="w-3 h-3 mr-1" /> AI Analysis
                   </div>
                   <div className="prose prose-sm max-w-none text-emerald-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: aiInsights[product.id].replace(/\n/g, '<br/>') }} />
                </div>
              )}

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <span className="text-2xl font-bold text-slate-900">
                  ${product.price.toFixed(2)}
                </span>
                
                <div className="flex space-x-2">
                   <button
                    onClick={() => handleAnalyze(product)}
                    className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                    title="Ask AI"
                    disabled={analyzingId === product.id}
                  >
                    {analyzingId === product.id ? (
                      <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Bot className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={loadingId === product.id}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-sm transition-all duration-200 
                      ${loadingId === product.id ? 'bg-green-600 cursor-default' : 'bg-slate-900 hover:bg-slate-800 active:scale-95'}`}
                  >
                    {loadingId === product.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-1.5" />
                        Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};