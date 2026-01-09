import React, { useState } from 'react';
import { EstimateItem } from '../types';
import { getIconForId, CURRENCY_SYMBOL } from '../constants';
import { Check, Edit2 } from 'lucide-react';

interface EstimateCardProps {
  item: EstimateItem;
  onToggle: (id: string) => void;
  onRateChange: (id: string, newRate: number) => void;
}

export const EstimateCard: React.FC<EstimateCardProps> = ({ item, onToggle, onRateChange }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer group flex flex-col h-full
        ${item.selected 
          ? 'bg-white border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1' 
          : 'bg-slate-50 border-slate-100 opacity-60 grayscale-[0.8]'
        }
      `}
      onClick={() => onToggle(item.id)}
    >
      {/* Image Header */}
      <div className="relative h-32 w-full overflow-hidden bg-slate-200">
        {!imgError ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-200">
             <div className="p-4 bg-white/50 rounded-full text-slate-500">
               {getIconForId(item.id, "w-10 h-10")}
             </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-black/40 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider rounded-md">
            {item.category}
          </span>
        </div>

        {/* Checkbox Overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
           <div 
            className={`
              w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all border-2
              ${item.selected ? 'bg-blue-600 border-blue-600' : 'bg-transparent border-white/70'}
            `}
          >
            {item.selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
          </div>
          <span className="text-white font-semibold text-lg drop-shadow-md">{item.name}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
            <p className="text-xs text-slate-500 line-clamp-2 min-h-[2.5em]">
                {item.description}
            </p>
            <div className={`p-2 rounded-lg bg-slate-100 text-slate-500 shrink-0 ml-2`}>
                {getIconForId(item.id, "w-4 h-4")}
            </div>
        </div>
        
        {/* Cost Section */}
        <div className="mt-auto pt-3 border-t border-slate-100">
           
           {/* Quantity */}
           <div className="flex justify-between items-center mb-2">
               <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Quantity</span>
               <span className="text-sm font-medium text-slate-700">
                 {item.calculatedQuantity.toLocaleString('en-IN', { maximumFractionDigits: 1 })} {item.unit}
               </span>
           </div>

           {/* Editable Rate */}
           <div className="flex justify-between items-center mb-3">
               <label className="text-[10px] uppercase text-slate-400 font-bold tracking-wider flex items-center gap-1">
                 Rate ({CURRENCY_SYMBOL}/{item.unit}) <Edit2 className="w-3 h-3 text-slate-300" />
               </label>
               <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">{CURRENCY_SYMBOL}</span>
                  <input 
                    type="number"
                    value={item.effectiveRate}
                    onClick={(e) => e.stopPropagation()} // Prevent toggling card when clicking input
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val) && val >= 0) {
                        onRateChange(item.id, val);
                      }
                    }}
                    className={`
                      w-24 px-2 pl-5 py-1 text-right text-sm font-bold border rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all
                      ${item.selected ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-transparent border-transparent text-slate-400'}
                    `}
                    disabled={!item.selected}
                  />
               </div>
           </div>

           {/* Total Cost */}
           <div className="flex justify-between items-center pt-2 border-t border-dashed border-slate-200">
               <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Total</span>
               <p className={`text-xl font-bold tabular-nums leading-none ${item.selected ? 'text-slate-900' : 'text-slate-400'}`}>
                 {CURRENCY_SYMBOL}{item.calculatedCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
               </p>
           </div>
        </div>
      </div>
    </div>
  );
};