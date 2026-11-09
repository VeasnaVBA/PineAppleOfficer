import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { X, Check } from 'lucide-react';

interface NewArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: Article) => void;
  initialData?: Article | null;
}

export const NewArticleModal: React.FC<NewArticleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    subtitle: '',
    category: 'Photography, Concept',
    author: 'Curator Desk',
    imageUrl: '',
    excerpt: '',
    content: '',
    status: 'Published'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: '',
        subtitle: 'Art, Concept',
        category: 'Art, Conceptual',
        author: 'Curator Desk',
        imageUrl: '',
        excerpt: '',
        content: '',
        status: 'Published'
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const newArticle: Article = {
      id: initialData?.id || `art-${Date.now()}`,
      title: formData.title || 'Untitled Archival Piece',
      subtitle: formData.subtitle || 'Editorial Collection',
      category: formData.category || 'Curated',
      date: initialData?.date || '09.11.2026',
      imageUrl: '',
      author: formData.author || 'Archival Staff',
      views: initialData?.views || 120,
      likes: initialData?.likes || 14,
      status: (formData.status as any) || 'Published',
      excerpt: formData.excerpt || 'A study on structure, typography, and architectural isolation.',
      content: formData.content || formData.excerpt
    };

    onSave(newArticle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-[#ded5be] border-2 border-ink shadow-brutal-lg max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-4 lg:p-6 border-b border-ink flex items-center justify-between bg-[#111111] text-[#ded5be]">
          <div>
            <h3 className="font-serif text-lg lg:text-xl font-bold tracking-wide">
              {initialData ? 'EDIT ARCHIVAL DISPATCH' : 'CREATE NEW EDITORIAL ENTRY'}
            </h3>
            <p className="text-[10px] font-mono tracking-widest text-[#b8ad94] uppercase mt-0.5">
              TETRAD Curatorial Publishing Engine
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 text-[#ded5be] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-ink/80 mb-1">
              Headline Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. The Architecture of Silence"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-transparent border border-ink text-ink font-serif text-base focus:bg-white/40 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-ink/80 mb-1">
                Sub-Headline / Tag
              </label>
              <input
                type="text"
                placeholder="e.g. Photography, Minimalist"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3 py-2 bg-transparent border border-ink text-ink text-xs font-mono focus:bg-white/40 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-ink/80 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-[#ded5be] border border-ink text-ink text-xs font-mono focus:bg-white/40 outline-none"
              >
                <option value="Photography, Concept">Photography, Concept</option>
                <option value="Art, Conceptual">Art, Conceptual</option>
                <option value="Philosophy, Concept">Philosophy, Concept</option>
                <option value="Architecture">Architecture</option>
                <option value="Exhibition">Exhibition</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-ink/80 mb-1">
                Lead Curator / Author
              </label>
              <input
                type="text"
                placeholder="Author Name"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 bg-transparent border border-ink text-ink text-xs font-mono focus:bg-white/40 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-ink/80 mb-1">
                Publication Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 bg-[#ded5be] border border-ink text-ink text-xs font-mono focus:bg-white/40 outline-none"
              >
                <option value="Published">Published (Live in Feed)</option>
                <option value="Featured">Featured (Front Page)</option>
                <option value="Draft">Draft (Internal Review)</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-ink/80 mb-1">
              Brief Excerpt / Teaser
            </label>
            <textarea
              rows={2}
              placeholder="Short summary displayed on card teaser..."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-3 py-2 bg-transparent border border-ink text-ink font-serif text-sm focus:bg-white/40 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-ink/80 mb-1">
              Full Essay / Content
            </label>
            <textarea
              rows={4}
              placeholder="Full article copy and curatorial notes..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 bg-transparent border border-ink text-ink font-serif text-sm focus:bg-white/40 outline-none resize-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-ink flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-ink text-xs font-mono uppercase tracking-widest hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-ink text-[#ded5be] border border-ink text-xs font-mono uppercase tracking-widest font-bold hover:bg-ink/85 flex items-center gap-1.5"
            >
              <Check size={14} />
              <span>{initialData ? 'Update Article' : 'Publish to Feed'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
