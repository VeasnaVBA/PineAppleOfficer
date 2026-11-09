import React, { useState } from 'react';
import { Heart, Share2, Bookmark, Check, Sparkles, Terminal } from 'lucide-react';

interface BottomEditorialProps {
  onShowToast: (title: string, message: string) => void;
}

export const BottomEditorial: React.FC<BottomEditorialProps> = ({ onShowToast }) => {
  const [likeCount, setLikeCount] = useState<number>(231);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [activeSubTab, setActiveSubTab] = useState<'narrative' | 'telemetry' | 'deploy'>('narrative');

  const handleLike = () => {
    if (!hasLiked) {
      setLikeCount(prev => prev + 1);
      setHasLiked(true);
      onShowToast('ENGAGEMENT RECORDED', 'Curatorial endorsement counter updated (+1)');
    } else {
      setLikeCount(prev => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <div className="bg-[#ded5be] grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-ink">
      {/* Left 9 columns: Featured Story / Editorial */}
      <div className="lg:col-span-9 p-6 lg:p-8 flex flex-col justify-between">
        <div>
          {/* Top meta row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-ink/20 gap-2">
            <div>
              <h3 className="font-serif text-lg lg:text-xl font-bold text-ink leading-tight">
                The Understated Charm of Jack Johnstone's Photography
              </h3>
              <p className="text-[10px] font-mono uppercase tracking-widest text-ink/70 mt-0.5">
                Archival Reference • Curatorial Essay No. 048
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 border border-ink bg-[#ede5cf] text-ink font-semibold">
                Recommended For You
              </span>
              
              <div className="flex items-center border border-ink text-[10px] font-mono">
                <button
                  onClick={() => setActiveSubTab('narrative')}
                  className={`px-2 py-0.5 ${activeSubTab === 'narrative' ? 'bg-ink text-[#ded5be]' : 'hover:bg-ink/10'}`}
                >
                  Essay
                </button>
                <button
                  onClick={() => setActiveSubTab('telemetry')}
                  className={`px-2 py-0.5 border-l border-ink ${activeSubTab === 'telemetry' ? 'bg-ink text-[#ded5be]' : 'hover:bg-ink/10'}`}
                >
                  Telemetry
                </button>
                <button
                  onClick={() => setActiveSubTab('deploy')}
                  className={`px-2 py-0.5 border-l border-ink ${activeSubTab === 'deploy' ? 'bg-ink text-[#ded5be]' : 'hover:bg-ink/10'}`}
                >
                  Audit
                </button>
              </div>
            </div>
          </div>

          {/* Tab content */}
          {activeSubTab === 'narrative' && (
            <div className="font-serif text-ink/90 text-sm lg:text-[15px] leading-relaxed max-w-4xl">
              <p className="drop-cap">
                merican photographer Ben Zank, who we've featured previously, shot a new series of surreal portraits following his move from New York City to New Zealand. In a statement about his latest work, Zank says, "The images represent an ongoing experience of emotions that I feel, the most recent being isolation and a longing to connect with another human being."
              </p>
              <p className="mt-3 text-xs lg:text-sm font-serif italic text-ink/75 border-l-2 border-ink pl-3">
                “Every frame in this collection strips away redundant environmental noise, reducing the narrative to pure physical dialogue between posture and stone.” — Jack Johnstone, Lead Curator
              </p>
            </div>
          )}

          {activeSubTab === 'telemetry' && (
            <div className="font-mono text-xs text-ink space-y-2 py-2">
              <div className="flex items-center justify-between border-b border-ink/20 pb-1">
                <span className="text-ink/70">Edge CDN Routing:</span>
                <span className="font-bold">hnd1, sfo1, fra1, cdg1 (Vercel Global Anycast)</span>
              </div>
              <div className="flex items-center justify-between border-b border-ink/20 pb-1">
                <span className="text-ink/70">Cache Hit Ratio:</span>
                <span className="font-bold text-emerald-800">99.42% (Optimal)</span>
              </div>
              <div className="flex items-center justify-between border-b border-ink/20 pb-1">
                <span className="text-ink/70">SSR / Static Rendering:</span>
                <span className="font-bold">Next-Gen Vite SPA Hydrated</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink/70">Database Synchronized:</span>
                <span className="font-bold">08.03.2026 - 13:06:14 UTC</span>
              </div>
            </div>
          )}

          {activeSubTab === 'deploy' && (
            <div className="font-mono text-[11px] bg-ink/5 p-3 border border-ink text-ink space-y-1">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <Terminal size={12} />
                <span>GIT COMMIT: HEAD -> main [e9b421a]</span>
              </div>
              <p className="text-ink/80">• Curatorial grid calibrated to high-contrast monochrome aesthetic.</p>
              <p className="text-ink/80">• Subscribed webhooks registered with edge dispatcher.</p>
              <p className="text-ink/80">• Ready for deployment push to Vercel production branch.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-3 border-t border-ink/20 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-ink/70">
          <span>CURATORIAL ARCHIVE VOL. XII</span>
          <span>EST. 2026 • DIGITAL EDITION</span>
          <span className="underline cursor-pointer hover:text-ink" onClick={() => onShowToast('EXPORT COMPLETED', 'Archival article transcript exported to markdown')}>
            Export Transcript ↓
          </span>
        </div>
      </div>

      {/* Right 3 columns: Engagement Box from the reference image */}
      <div className="lg:col-span-3 p-6 flex flex-col items-center justify-center text-center bg-[#ded5be]">
        {/* The 231 Box Frame exactly matching the image */}
        <div className="w-28 border-2 border-ink bg-[#ded5be] p-3 flex flex-col items-center shadow-brutal">
          <div 
            onClick={handleLike}
            className="w-full pb-2 mb-2 border-b border-ink text-center cursor-pointer hover:bg-black/5 transition-colors"
            title="Click to endorse"
          >
            <span className="font-serif font-bold text-2xl text-ink">
              {likeCount}
            </span>
          </div>

          {/* Social icons inside box */}
          <div className="flex flex-col items-center gap-2.5 text-ink w-full">
            <button 
              onClick={handleLike} 
              className={`hover:scale-125 transition-transform ${hasLiked ? 'text-red-700' : ''}`}
              title="Endorse"
            >
              <Heart size={14} className={hasLiked ? 'fill-red-700' : ''} />
            </button>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer"
              className="font-serif font-bold text-xs hover:scale-125 transition-transform"
            >
              f
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer"
              className="font-serif font-bold text-xs hover:scale-125 transition-transform"
            >
              𝕏
            </a>
            <a 
              href="https://pinterest.com" 
              target="_blank" 
              rel="noreferrer"
              className="font-serif font-bold text-xs hover:scale-125 transition-transform"
            >
              p
            </a>
          </div>
        </div>

        <p className="text-[10px] font-mono uppercase tracking-widest text-ink/70 mt-3">
          Archival Endorsements
        </p>
      </div>
    </div>
  );
};
