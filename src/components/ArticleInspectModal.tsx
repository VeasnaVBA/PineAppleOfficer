import React from 'react';
import { Article } from '../types';
import { X, Eye, Heart, Calendar, User, Share2, Edit3, ExternalLink } from 'lucide-react';

interface ArticleInspectModalProps {
  article: Article | null;
  onClose: () => void;
  onEdit: (article: Article) => void;
  onShowToast: (title: string, message: string) => void;
}

export const ArticleInspectModal: React.FC<ArticleInspectModalProps> = ({
  article,
  onClose,
  onEdit,
  onShowToast
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl bg-[#ded5be] border-2 border-ink shadow-brutal-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-ink flex items-center justify-between bg-[#111111] text-[#ded5be]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono px-2 py-0.5 border border-[#ded5be]/40 uppercase tracking-widest text-[#ded5be]">
              {article.status}
            </span>
            <span className="text-xs font-mono text-[#b8ad94]">ID: {article.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 text-[#ded5be] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8 space-y-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-ink/70 mb-1">
              {article.category} • {article.date}
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-ink leading-tight">
              {article.title}
            </h2>
            <p className="text-sm font-mono text-ink/80 mt-1">
              Curated by: <span className="font-bold underline">{article.author}</span>
            </p>
          </div>

          {/* Large image */}
          <div className="relative aspect-[16/9] border border-ink overflow-hidden bg-black">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover filter grayscale contrast-125"
            />
          </div>

          {/* Telemetry row */}
          <div className="grid grid-cols-3 border border-ink divide-x divide-ink text-center py-3 bg-[#ede5cf]">
            <div>
              <p className="text-[10px] font-mono uppercase text-ink/70">Total Reach</p>
              <p className="font-serif font-bold text-lg text-ink">{article.views.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase text-ink/70">Archival Likes</p>
              <p className="font-serif font-bold text-lg text-ink">{article.likes}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase text-ink/70">Engagement</p>
              <p className="font-serif font-bold text-lg text-emerald-800">98.4%</p>
            </div>
          </div>

          {/* Essay body */}
          <div className="font-serif text-ink/90 text-base leading-relaxed border-t border-ink/20 pt-4">
            <p className="drop-cap">{article.content || article.excerpt}</p>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-ink flex items-center justify-between">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                onShowToast('PERMALINK COPIED', 'Article permalink copied to clipboard');
              }}
              className="px-4 py-2 border border-ink text-xs font-mono uppercase tracking-widest hover:bg-black/5 flex items-center gap-1.5"
            >
              <Share2 size={13} />
              <span>Copy Link</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onEdit(article);
                }}
                className="px-5 py-2 bg-ink text-[#ded5be] text-xs font-mono uppercase tracking-widest font-bold hover:bg-ink/85 flex items-center gap-1.5"
              >
                <Edit3 size={13} />
                <span>Edit Record</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
