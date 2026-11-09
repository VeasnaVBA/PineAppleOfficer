import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, Users, Eye, Zap, Globe, Download } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [activeRange, setActiveRange] = useState<'7d' | '30d' | '90d'>('30d');

  const trafficData = [
    { label: 'Nov 01', visitors: 1420, reads: 3820 },
    { label: 'Nov 02', visitors: 1680, reads: 4210 },
    { label: 'Nov 03', visitors: 1940, reads: 4980 },
    { label: 'Nov 04', visitors: 1510, reads: 3950 },
    { label: 'Nov 05', visitors: 2200, reads: 5400 },
    { label: 'Nov 06', visitors: 2650, reads: 6120 },
    { label: 'Nov 07', visitors: 2410, reads: 5890 },
    { label: 'Nov 08', visitors: 2890, reads: 7100 },
    { label: 'Nov 09', visitors: 3120, reads: 7850 }
  ];

  const maxVal = 8000;

  return (
    <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-ink gap-4">
        <div>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold uppercase tracking-tight text-ink">
            ANALYTICS & AUDIENCE METRICS
          </h2>
          <p className="font-mono text-xs text-ink/70 mt-1 uppercase tracking-wider">
            Real-time telemetry • Global archival circulation
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1 text-xs font-mono border transition-all uppercase tracking-wider ${
                activeRange === range
                  ? 'border-ink bg-ink text-[#ded5be] font-bold'
                  : 'border-ink/40 text-ink hover:border-ink'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 border-2 border-ink bg-[#ded5be] shadow-brutal">
          <p className="text-[10px] font-mono uppercase tracking-widest text-ink/70">Total Impressions</p>
          <h3 className="font-serif text-3xl font-bold text-ink mt-2">184,920</h3>
          <p className="text-[11px] font-mono text-emerald-800 mt-2 flex items-center gap-1 font-bold">
            <TrendingUp size={13} />
            +18.4% vs last period
          </p>
        </div>

        <div className="p-5 border-2 border-ink bg-[#ded5be] shadow-brutal">
          <p className="text-[10px] font-mono uppercase tracking-widest text-ink/70">Unique Curators</p>
          <h3 className="font-serif text-3xl font-bold text-ink mt-2">42,810</h3>
          <p className="text-[11px] font-mono text-emerald-800 mt-2 flex items-center gap-1 font-bold">
            <TrendingUp size={13} />
            +9.2% growth
          </p>
        </div>

        <div className="p-5 border-2 border-ink bg-[#ded5be] shadow-brutal">
          <p className="text-[10px] font-mono uppercase tracking-widest text-ink/70">Avg. Reading Time</p>
          <h3 className="font-serif text-3xl font-bold text-ink mt-2">4m 38s</h3>
          <p className="text-[11px] font-mono text-ink/80 mt-2">
            Top: Ben Zank Retrospective
          </p>
        </div>

        <div className="p-5 border-2 border-ink bg-[#ded5be] shadow-brutal">
          <p className="text-[10px] font-mono uppercase tracking-widest text-ink/70">Edge CDN Cache Ratio</p>
          <h3 className="font-serif text-3xl font-bold text-ink mt-2">99.4%</h3>
          <p className="text-[11px] font-mono text-emerald-800 mt-2 flex items-center gap-1 font-bold">
            <Zap size={13} />
            28ms Vercel Edge Response
          </p>
        </div>
      </div>

      {/* Main Graph Area */}
      <div className="border-2 border-ink p-6 bg-[#ded5be] shadow-brutal">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-ink/30">
          <div>
            <h4 className="font-serif text-lg font-bold text-ink">Circulation & Readership Velocity</h4>
            <p className="text-[10px] font-mono text-ink/70 uppercase">Daily Unique Sessions (Line) vs Total Page Views (Bars)</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-ink"></span>
              Reads
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#8c3b2b]"></span>
              Visitors
            </span>
          </div>
        </div>

        {/* Custom SVG / Bar Graphic */}
        <div className="h-64 flex items-end gap-3 lg:gap-6 pt-4 px-2 border-b border-ink">
          {trafficData.map((d, i) => {
            const barHeight = Math.round((d.reads / maxVal) * 100);
            return (
              <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                {/* Tooltip */}
                <div className="absolute -top-12 bg-ink text-[#ded5be] text-[10px] font-mono p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {d.label}: {d.reads.toLocaleString()} views
                </div>

                <div 
                  style={{ height: `${barHeight}%` }} 
                  className="w-full max-w-[36px] bg-ink hover:bg-[#8c3b2b] transition-colors relative"
                >
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#8c3b2b]"></div>
                </div>
                <span className="text-[9px] font-mono text-ink/75 mt-2 transform -rotate-45 md:rotate-0 origin-left">
                  {d.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two columns breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Circulation */}
        <div className="border-2 border-ink p-6 bg-[#ded5be]">
          <h4 className="font-serif text-lg font-bold text-ink mb-4 pb-2 border-b border-ink/20">
            Top Geographic Territories
          </h4>
          <div className="space-y-3 font-mono text-xs">
            {[
              { country: 'Berlin / Germany', share: '34%', val: '44,050' },
              { country: 'New York / United States', share: '28%', val: '36,210' },
              { country: 'London / United Kingdom', share: '18%', val: '23,410' },
              { country: 'Tokyo / Japan', share: '12%', val: '15,600' },
              { country: 'Paris / France', share: '8%', val: '10,380' }
            ].map((geo, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-ink">
                  <span>{geo.country}</span>
                  <span className="font-bold">{geo.share} ({geo.val})</span>
                </div>
                <div className="w-full h-1.5 bg-black/10 overflow-hidden">
                  <div style={{ width: geo.share }} className="h-full bg-ink"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Topics */}
        <div className="border-2 border-ink p-6 bg-[#ded5be]">
          <h4 className="font-serif text-lg font-bold text-ink mb-4 pb-2 border-b border-ink/20">
            Popular Curatorial Topics
          </h4>
          <div className="space-y-3 font-mono text-xs">
            {[
              { topic: 'Conceptual Monochrome Photography', score: 98, count: '68 Articles' },
              { topic: 'Berlin Bauhaus & Brutalist Architecture', score: 91, count: '42 Articles' },
              { topic: 'Artistic Isolation & Surrealism', score: 86, count: '31 Articles' },
              { topic: 'Philosophical Time & Continuum', score: 79, count: '24 Articles' },
              { topic: 'Avant-Garde Cinematic Galleries', score: 72, count: '19 Articles' }
            ].map((t, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 border border-ink/30 bg-[#ede5cf]">
                <div>
                  <p className="font-serif font-bold text-sm text-ink">{t.topic}</p>
                  <p className="text-[10px] text-ink/70">{t.count}</p>
                </div>
                <span className="px-2 py-0.5 bg-ink text-[#ded5be] text-[10px] font-bold">
                  {t.score}% Affinity
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
