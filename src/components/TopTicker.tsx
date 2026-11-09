import React from 'react';
import { MetricItem } from '../types';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface TopTickerProps {
  metrics: MetricItem[];
  onSelectMetric?: (metric: MetricItem) => void;
}

export const TopTicker: React.FC<TopTickerProps> = ({ metrics, onSelectMetric }) => {
  return (
    <div className="border-b-2 border-ink bg-[#ded5be] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ink">
      {metrics.map((item) => (
        <div 
          key={item.id}
          onClick={() => onSelectMetric?.(item)}
          className="p-3 sm:p-4 lg:p-5 flex items-start gap-3 hover:bg-black/[0.03] transition-colors cursor-pointer group"
        >
          <span className="font-serif font-bold text-base lg:text-lg text-ink flex-shrink-0">
            {item.label}
          </span>
          <div className="flex-1 min-w-0">
            <h4 className="font-serif text-xs sm:text-sm text-ink leading-snug group-hover:underline line-clamp-2">
              {item.title}
            </h4>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] font-mono text-ink/75">
              <span>{item.date}</span>
              {item.value && (
                <>
                  <span>•</span>
                  <span className="font-semibold text-ink">{item.value}</span>
                </>
              )}
              {item.change && (
                <span className="text-emerald-800 font-bold">
                  {item.change}
                </span>
              )}
            </div>
          </div>
          <ArrowUpRight 
            size={14} 
            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-ink mt-0.5" 
          />
        </div>
      ))}
    </div>
  );
};
