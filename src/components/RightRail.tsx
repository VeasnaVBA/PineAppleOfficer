import React, { useState } from 'react';
import { Article } from '../types';
import { ArrowRight } from 'lucide-react';

interface RightRailProps {
  heroArticle: Article;
  onSelectArticle: (article: Article) => void;
  onShowToast: (title: string, message: string) => void;
}

export const RightRail: React.FC<RightRailProps> = ({
  heroArticle,
  onSelectArticle,
  onShowToast
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      onShowToast('INCOMPLETE FIELDS', 'Please provide at least a name and email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast('SUBSCRIPTION DISPATCHED', `${formData.name} added to the curatorial distribution network.`);
      setFormData({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: ''
      });
    }, 600);
  };

  return (
    <aside className="w-full xl:w-80 2xl:w-96 flex-shrink-0 flex flex-col justify-between border-t-2 xl:border-t-0 xl:border-l-2 border-ink bg-[#ded5be]">
      {/* Top: Featured Cinematic Story */}
      <div className="border-b-2 border-ink">
        {/* Cinematic Monochrome Image */}
        <div 
          onClick={() => onSelectArticle(heroArticle)}
          className="relative aspect-[16/10] sm:aspect-[16/11] bg-[#1a1a1a] overflow-hidden cursor-pointer group"
        >
          <img
            src={heroArticle.imageUrl}
            alt={heroArticle.title}
            className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-ink text-[#ded5be] text-[9px] font-mono tracking-widest uppercase">
            Spotlight
          </div>
        </div>

        {/* Story Text */}
        <div className="p-4 sm:p-5 lg:p-6">
          <h3 
            onClick={() => onSelectArticle(heroArticle)}
            className="font-serif text-base sm:text-lg font-bold text-ink leading-snug hover:underline cursor-pointer"
          >
            {heroArticle.title}
          </h3>
          <p className="text-[10px] font-mono tracking-wider text-ink/70 mt-1 uppercase">
            {heroArticle.date} • {heroArticle.category}
          </p>
          <p className="text-xs font-serif text-ink/85 mt-2 leading-relaxed line-clamp-4">
            {heroArticle.excerpt}
          </p>

          <button
            onClick={() => onSelectArticle(heroArticle)}
            className="mt-3 flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-ink hover:underline font-bold"
          >
            <span>Read full coverage</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Bottom: "Subscribe Now" Form from the reference image */}
      <div className="p-5 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-serif text-base sm:text-lg font-bold text-ink text-center tracking-wide mb-4">
            Subscribe Now
          </h4>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-underline w-full"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-underline w-full"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="input-underline w-full"
                />
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="input-underline w-full"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Message / Dispatch note..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-underline w-full"
              />
            </div>

            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2 bg-transparent text-ink hover:bg-ink hover:text-[#ded5be] transition-colors border border-ink text-xs font-mono uppercase tracking-[0.2em] font-bold shadow-sm"
              >
                {isSubmitting ? 'DISPATCHING...' : 'SEND'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <div className="pt-5 mt-5 border-t border-ink/20 text-center">
          <p className="text-[10px] font-mono tracking-widest text-ink/70 uppercase">
            ALL RIGHTS RESERVED © 2026
          </p>
        </div>
      </div>
    </aside>
  );
};
