import React, { useState } from 'react';
import { Article } from '../types';
import { Search, Plus, Edit3, Trash2, Eye, Star, FileText } from 'lucide-react';

interface EditorialCMSViewProps {
  articles: Article[];
  onOpenNewModal: () => void;
  onSelectArticle: (article: Article) => void;
  onEditArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onToggleFeature: (id: string) => void;
  onStatusChange: (id: string, status: Article['status']) => void;
  onShowToast: (title: string, message: string) => void;
}

export const EditorialCMSView: React.FC<EditorialCMSViewProps> = ({
  articles,
  onOpenNewModal,
  onSelectArticle,
  onEditArticle,
  onDeleteArticle,
  onToggleFeature,
  onStatusChange,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        a.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        a.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-ink gap-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-ink">
            EDITORIAL CMS ARCHIVE
          </h2>
          <p className="font-mono text-xs text-ink/70 mt-1 uppercase tracking-wider">
            Total {articles.length} dispatches catalogued • Full Curatorial Control
          </p>
        </div>

        <button
          onClick={onOpenNewModal}
          className="px-4 py-2 bg-ink text-[#ded5be] text-xs font-mono uppercase tracking-widest font-bold hover:bg-ink/85 flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>New Dispatch</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/60" />
          <input
            type="text"
            placeholder="Search archive by title, author, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono scrollbar-none">
          {['All', 'Published', 'Featured', 'Draft', 'Archived'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 border uppercase tracking-wider text-[11px] whitespace-nowrap ${
                statusFilter === st ? 'bg-ink text-[#ded5be] border-ink font-bold' : 'border-ink/40 text-ink'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Grid / Table of Articles */}
      <div className="border-2 border-ink bg-[#ded5be] overflow-x-auto shadow-brutal">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#111111] text-[#ded5be] border-b border-ink uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3 w-10">Doc</th>
              <th className="p-3">Title & Summary</th>
              <th className="p-3">Category</th>
              <th className="p-3">Curator</th>
              <th className="p-3">Date</th>
              <th className="p-3">Reach / Likes</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink">
            {filtered.map(article => (
              <tr key={article.id} className="hover:bg-black/5 transition-colors">
                <td className="p-3">
                  <div className="w-8 h-8 border border-ink flex items-center justify-center bg-[#ede5cf] text-ink">
                    <FileText size={15} />
                  </div>
                </td>
                <td className="p-3 max-w-xs">
                  <p 
                    onClick={() => onSelectArticle(article)}
                    className="font-serif font-bold text-sm text-ink hover:underline cursor-pointer line-clamp-1"
                  >
                    {article.title}
                  </p>
                  <p className="text-[10px] text-ink/70 line-clamp-1 mt-0.5">
                    {article.excerpt}
                  </p>
                </td>
                <td className="p-3">
                  <span className="text-[10px] border border-ink/40 px-1.5 py-0.5 whitespace-nowrap">
                    {article.category}
                  </span>
                </td>
                <td className="p-3 font-semibold text-ink whitespace-nowrap">{article.author}</td>
                <td className="p-3 text-ink/70 whitespace-nowrap">{article.date}</td>
                <td className="p-3 whitespace-nowrap">
                  <span>{article.views.toLocaleString()}</span>
                  <span className="text-ink/60 ml-1">({article.likes} ♥)</span>
                </td>
                <td className="p-3 whitespace-nowrap">
                  <select
                    value={article.status}
                    onChange={(e) => onStatusChange(article.id, e.target.value as any)}
                    className="bg-[#ded5be] border border-ink text-[10px] px-1.5 py-0.5 outline-none font-bold"
                  >
                    <option value="Published">Published</option>
                    <option value="Featured">Featured</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </td>
                <td className="p-3 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onSelectArticle(article)}
                      className="p-1 hover:bg-black/10"
                      title="Inspect"
                    >
                      <Eye size={13} />
                    </button>
                    <button
                      onClick={() => onEditArticle(article)}
                      className="p-1 hover:bg-black/10"
                      title="Edit"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={() => onToggleFeature(article.id)}
                      className="p-1 hover:bg-black/10 text-yellow-700"
                      title="Toggle Feature"
                    >
                      <Star size={13} className={article.status === 'Featured' ? 'fill-yellow-600' : ''} />
                    </button>
                    <button
                      onClick={() => {
                        onDeleteArticle(article.id);
                        onShowToast('ARCHIVED', `Dispatch "${article.title}" removed.`);
                      }}
                      className="p-1 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
