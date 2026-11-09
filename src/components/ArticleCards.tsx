import React, { useState } from 'react';
import { Article } from '../types';
import { Eye, Heart, Edit3, Trash2, Star, BookOpen } from 'lucide-react';

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

  const categories = ['All', 'Photography, Concept', 'Art, Conceptual', 'Philosophy, Concept'];

  const filteredArticles = filter === 'All' 
    ? articles.slice(0, 3) 
    : articles.filter(a => a.category.toLowerCase().includes(filter.toLowerCase())).slice(0, 3);

  return (
    <div className="p-4 sm:p-6 lg:p-8 border-b-2 border-ink">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-5 pb-3 border-b border-ink/30 gap-2">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight uppercase text-ink">
            LATEST ARTICLES
          </h2>
          <p className="font-mono text-[11px] sm:text-xs text-ink/75 tracking-wider mt-0.5">
            12 956 article archive • 3 currently highlighted
          </p>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2.5 py-1 border transition-all whitespace-nowrap uppercase tracking-wider text-[10px] sm:text-[11px] ${
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

      {/* 3 Pure Typographic Cards (Zero Images) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="group relative flex flex-col border-2 border-ink bg-[#ded5be] overflow-hidden shadow-sm hover:shadow-brutal transition-all duration-200"
          >
            {/* Dark Top Header */}
            <div className="p-4 bg-[#111111] text-[#ded5be] border-b border-ink flex flex-col justify-between min-h-[110px]">
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

            {/* Typographic Content Body (No image) */}
            <div 
              className="p-5 flex-1 flex flex-col justify-between bg-[#ede5cf] cursor-pointer"
              onClick={() => onSelectArticle(article)}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 border border-ink bg-[#ded5be] text-[9px] font-mono uppercase tracking-widest font-bold">
                    {article.status}
                  </span>
                  <span className="text-[10px] font-mono text-ink/60">
                    ID: {article.id}
                  </span>
                </div>

                <p className="font-serif text-xs text-ink/85 leading-relaxed line-clamp-4 italic">
                  "{article.excerpt}"
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-ink/20 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditArticle(article);
                  }}
                  className="flex items-center gap-1 text-[10px] uppercase font-bold text-ink hover:underline"
                >
                  <Edit3 size={11} />
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFeature(article.id);
                  }}
                  className="flex items-center gap-1 text-[10px] uppercase text-ink hover:underline"
                >
                  <Star size={11} className={article.status === 'Featured' ? 'fill-yellow-600 text-yellow-600' : ''} />
                  Feature
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteArticle(article.id);
                  }}
                  className="text-red-700 hover:text-red-900"
                  title="Delete"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>

            {/* Bottom Card Bar */}
            <div className="px-3 py-2 bg-[#ded5be] text-ink/75 flex items-center justify-between text-[10px] font-mono border-t border-ink">
              <span className="truncate">CURATOR: {article.author.toUpperCase()}</span>
              <span className="flex items-center gap-1 text-red-700 flex-shrink-0 font-bold">
                <Heart size={10} className="fill-red-700" />
                {article.likes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
