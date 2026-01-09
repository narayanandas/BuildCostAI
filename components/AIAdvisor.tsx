import React, { useState } from 'react';
import { EstimateItem, QualityGrade, AIAnalysisResult } from '../types';
import { analyzeEstimate } from '../services/geminiService';
import { Bot, Loader2, AlertTriangle, Lightbulb, ChevronRight, X } from 'lucide-react';

interface AIAdvisorProps {
  area: number;
  quality: QualityGrade;
  items: EstimateItem[];
  totalCost: number;
}

export const AIAdvisor: React.FC<AIAdvisorProps> = ({ area, quality, items, totalCost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    if (area <= 0) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeEstimate(area, quality, items, totalCost);
      setResult(data);
    } catch (e) {
      setError("Failed to generate insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => { setIsOpen(true); if(!result) handleAnalysis(); }}
        className="fixed bottom-24 right-4 md:right-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all z-40 flex items-center gap-2 group"
      >
        <Bot className="w-6 h-6" />
        <span className="hidden group-hover:block font-medium pr-1 animate-in fade-in slide-in-from-right-2">
            Ask AI Advisor
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white w-full md:max-w-2xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <Bot className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-800">AI Project Advisor</h2>
                <p className="text-xs text-slate-500">Powered by Gemini 2.0</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
              <p className="text-slate-500 text-center animate-pulse">
                Analyzing materials, rates, and local market trends...
              </p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center">
              {error}
              <button onClick={handleAnalysis} className="block mx-auto mt-2 text-sm font-bold hover:underline">Retry</button>
            </div>
          ) : result ? (
            <div className="space-y-6">
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-2">Estimate Summary</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {result.summary}
                </p>
              </div>

              <div>
                <h3 className="flex items-center gap-2 font-semibold text-emerald-700 mb-3">
                  <Lightbulb className="w-5 h-5" /> Smart Savings
                </h3>
                <div className="grid gap-3">
                  {result.savingsTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <span className="bg-emerald-200 text-emerald-800 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-emerald-900">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 font-semibold text-amber-700 mb-3">
                  <AlertTriangle className="w-5 h-5" /> Risk Factors
                </h3>
                <div className="grid gap-3">
                  {result.risks.map((risk, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                      <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-amber-900">{risk}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
                <p>Ready to analyze your estimate.</p>
                <button onClick={handleAnalysis} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg">Analyze Now</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
