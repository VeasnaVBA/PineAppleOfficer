import React, { useState } from 'react';
import { Article } from '../types';
import { Eye, Heart, MoreHorizontal, Edit3, Trash2, Star, CheckCircle2 } from 'lucide-react';

interface ArticleCardsProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onEditArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onToggleFeature: (id: string) => void;
}

export const ArticleCards: React.FC<ArticleCardsProps> = ({
  articles,
  onSelectArticle,
  onEditArticle,
  onDeleteArticle,
  onToggleFeature
}) => {
  const [filter, setFilter] = useState<string>('All');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const categories = ['All', 'Photography, Concept', 'Art, Conceptual', 'Philosophy, Concept'];

  const filteredArticles = filter === 'All' 
    ? articles.slice(0, 3) 
    : articles.filter(a => a.category.toLowerCase().includes(filter.toLowerCase())).slice(0, 3);

  return (
    <div className="p-6 lg:p-8 border-b border-ink">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-2 border-b border-ink/30 gap-2">
        <div>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight uppercase text-ink">
            LATEST ARTICLES
          </h2>
          <p className="font-mono text-xs text-ink/75 tracking-wider mt-0.5">
            12 956 article archive • 3 currently highlighted in gallery
          </p>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2.5 py-1 border transition-all whitespace-nowrap uppercase tracking-wider text-[11px] ${
                filter === cat
                  ? 'border-ink bg-ink text-[#ded5be] font-bold'
                  : 'border-ink/40 text-ink hover:border-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Editorial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="group relative flex flex-col border-2 border-ink bg-[#111111] overflow-hidden shadow-sm hover:shadow-brutal transition-shadow duration-200"
          >
            {/* Dark Top Header matching the reference image */}
            <div className="p-4 bg-[#111111] text-[#ded5be] border-b border-[#2a2a2a] flex flex-col justify-between min-h-[125px]">
              <div>
                <h3 
                  onClick={() => onSelectArticle(article)}
                  className="font-serif text-sm lg:text-base font-semibold text-[#ded5be] leading-tight hover:underline cursor-pointer line-clamp-2"
                >
                  {article.title}
                </h3>
                <p className="text-[10px] font-mono tracking-wider text-[#b8ad94] mt-1.5 uppercase">
                  {article.subtitle || article.category}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 text-[10px] font-mono border-t border-[#222222] text-[#8e8571]">
                <span>{article.date}</span>
                <span className="flex items-center gap-1">
                  <Eye size={11} />
                  {article.views.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Monochrome High-Contrast Image Container */}
            <div 
              className="relative aspect-[3/4] bg-[#222222] overflow-hidden cursor-pointer"
              onClick={() => onSelectArticle(article)}
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Status Badge */}
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-ink/90 border border-[#ded5be]/40 text-[#ded5be] text-[9px] font-mono uppercase tracking-widest">
                {article.status}
              </div>

              {/* Hover Quick Admin Actions Overlay */}
              <div className="absolute inset-0 bg-ink/80 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-[#ded5be]">
                <p className="text-xs font-serif italic mb-3 line-clamp-3 text-[#ded5be]/90">
                  "{article.excerpt}"
                </p>

                <div className="flex items-center justify-between gap-2 border-t border-[#444] pt-3 text-[11px] font-mono">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditArticle(article);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-[#ded5be] text-ink hover:bg-white font-bold transition-colors uppercase text-[10px]"
                  >
                    <Edit3 size={12} />
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFeature(article.id);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1.5 border border-[#ded5be]/40 text-[#ded5be] hover:bg-white/10 text-[10px] font-mono uppercase`}
                  >
                    <Star size={12} className={article.status === 'Featured' ? 'fill-yellow-400 text-yellow-400' : ''} />
                    Feature
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteArticle(article.id);
                    }}
                    className="p-1.5 border border-red-500/50 text-red-300 hover:bg-red-500/20"
                    title="Delete Article"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Card Bar */}
            <div className="px-3 py-2 bg-[#1a1a1a] text-[#8e8571] flex items-center justify-between text-[10px] font-mono border-t border-[#262626]">
              <span>CURATOR: {article.author.toUpperCase()}</span>
              <span className="flex items-center gap-1 text-red-300/80">
                <Heart size={10} className="fill-red-300/60" />
                {article.likes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
