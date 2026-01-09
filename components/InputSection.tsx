import React from 'react';
import { QualityGrade } from '../types';
import { Ruler, Sparkles } from 'lucide-react';

interface InputSectionProps {
  area: number;
  setArea: (val: number) => void;
  quality: QualityGrade;
  setQuality: (val: QualityGrade) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  area,
  setArea,
  quality,
  setQuality
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Area Input */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
            <Ruler className="w-4 h-4 text-blue-500" />
            Plot/Built-up Area (Sq. Ft)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              value={area || ''}
              onChange={(e) => setArea(parseFloat(e.target.value) || 0)}
              placeholder="e.g. 1000"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg font-semibold text-slate-900 placeholder:text-slate-400"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              ft²
            </span>
          </div>
        </div>

        {/* Quality Selector */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            Construction Quality
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.values(QualityGrade).map((grade) => (
              <button
                key={grade}
                onClick={() => setQuality(grade)}
                className={`
                  px-2 py-2.5 rounded-lg text-sm font-medium transition-all border
                  ${quality === grade 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-[1.02]' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }
                `}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
