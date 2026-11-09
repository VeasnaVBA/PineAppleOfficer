import React, { useState } from 'react';
import { initialArticles, initialMetrics, heroArticle, initialSubscribers } from './data/initialData';
import { Article, Subscriber } from './types';
import { Sidebar } from './components/Sidebar';
import { TopTicker } from './components/TopTicker';
import { ArticleCards } from './components/ArticleCards';
import { BottomEditorial } from './components/BottomEditorial';
import { RightRail } from './components/RightRail';
import { NewArticleModal } from './components/NewArticleModal';
import { ArticleInspectModal } from './components/ArticleInspectModal';
import { AnalyticsView } from './components/AnalyticsView';
import { SubscribersView } from './components/SubscribersView';
import { EditorialCMSView } from './components/EditorialCMSView';
import { SettingsView } from './components/SettingsView';
import { Toast } from './components/Toast';

export function App() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
  const [currentTab, setCurrentTab] = useState<string>('overview');
  
  // Modals
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [inspectingArticle, setInspectingArticle] = useState<Article | null>(null);

  // Toast
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  const showToast = (title: string, message: string) => {
    setToast({ title, message });
  };

  // Article handlers
  const handleSaveArticle = (savedArticle: Article) => {
    if (editingArticle) {
      setArticles(prev => prev.map(a => a.id === savedArticle.id ? savedArticle : a));
      showToast('DISPATCH REVISED', `Article "${savedArticle.title}" has been updated.`);
    } else {
      setArticles(prev => [savedArticle, ...prev]);
      showToast('NEW DISPATCH PUBLISHED', `Article "${savedArticle.title}" added to active feed.`);
    }
    setEditingArticle(null);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    showToast('DISPATCH ARCHIVED', 'Article entry removed from front-line archive.');
  };

  const handleToggleFeature = (id: string) => {
    setArticles(prev => prev.map(a => {
      if (a.id === id) {
        const nextStatus = a.status === 'Featured' ? 'Published' : 'Featured';
        showToast('STATUS ALTERED', `Article marked as ${nextStatus}.`);
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  const handleStatusChange = (id: string, status: Article['status']) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    showToast('STATUS UPDATED', `Article status changed to ${status}.`);
  };

  // Subscriber handlers
  const handleAddSubscriber = (sub: Subscriber) => {
    setSubscribers(prev => [sub, ...prev]);
  };

  const handleDeleteSubscriber = (id: string) => {
    setSubscribers(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#ded5be] p-2 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-center items-center font-sans antialiased">
      {/* Outer master border matching the design exactly */}
      <div className="w-full max-w-[1580px] bg-[#ded5be] border-2 border-ink shadow-2xl flex flex-col xl:flex-row overflow-hidden relative">
        
        {/* Left Column: Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onOpenNewModal={() => {
            setEditingArticle(null);
            setIsNewModalOpen(true);
          }}
          articleCount={articles.length}
        />

        {/* Center / Main Content Area */}
        <main className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Top Ticker Bar */}
          <TopTicker
            metrics={initialMetrics}
            onSelectMetric={(metric) => {
              showToast('METRIC INSPECTION', `${metric.title} (${metric.date}) selected.`);
            }}
          />

          {/* Tab Views */}
          <div className="flex-1">
            {(currentTab === 'overview' || currentTab === 'articles') && (
              <>
                <ArticleCards
                  articles={articles}
                  onSelectArticle={(article) => setInspectingArticle(article)}
                  onEditArticle={(article) => {
                    setEditingArticle(article);
                    setIsNewModalOpen(true);
                  }}
                  onDeleteArticle={handleDeleteArticle}
                  onToggleFeature={handleToggleFeature}
                />
                <BottomEditorial
                  onShowToast={showToast}
                />
              </>
            )}

            {currentTab === 'cms' && (
              <EditorialCMSView
                articles={articles}
                onOpenNewModal={() => {
                  setEditingArticle(null);
                  setIsNewModalOpen(true);
                }}
                onSelectArticle={(article) => setInspectingArticle(article)}
                onEditArticle={(article) => {
                  setEditingArticle(article);
                  setIsNewModalOpen(true);
                }}
                onDeleteArticle={handleDeleteArticle}
                onToggleFeature={handleToggleFeature}
                onStatusChange={handleStatusChange}
                onShowToast={showToast}
              />
            )}

            {currentTab === 'analytics' && (
              <AnalyticsView />
            )}

            {currentTab === 'subscribers' && (
              <SubscribersView
                subscribers={subscribers}
                onAddSubscriber={handleAddSubscriber}
                onDeleteSubscriber={handleDeleteSubscriber}
                onShowToast={showToast}
              />
            )}

            {currentTab === 'gallery' && (
              <div className="p-6 lg:p-8 space-y-6">
                <div className="border-b border-ink pb-3 flex justify-between items-center">
                  <div>
                    <h2 className="font-serif text-2xl font-bold uppercase text-ink">CURATORIAL MEDIA VAULT</h2>
                    <p className="font-mono text-xs text-ink/70">High-contrast monochrome photography and archival stills</p>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 border border-ink">
                    {articles.length + 4} Assets
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600'
                  ].map((url, idx) => (
                    <div 
                      key={idx} 
                      className="border-2 border-ink aspect-square overflow-hidden bg-black group relative cursor-pointer"
                      onClick={() => showToast('IMAGE INSPECTED', `Archival Plate #${idx + 101} selected`)}
                    >
                      <img 
                        src={url} 
                        alt="gallery item" 
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-ink/70 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-[#ded5be]">
                        <span className="text-[10px] font-mono uppercase tracking-widest">PLATE #{idx + 101}</span>
                        <span className="text-xs font-serif italic">Monochrome Archive</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === 'settings' && (
              <SettingsView onShowToast={showToast} />
            )}
          </div>
        </main>

        {/* Right Column: Hero Spotlight and Direct Dispatch Form */}
        <RightRail
          heroArticle={heroArticle}
          onSelectArticle={(article) => setInspectingArticle(article)}
          onShowToast={showToast}
        />
      </div>

      {/* Modals */}
      <NewArticleModal
        isOpen={isNewModalOpen}
        onClose={() => {
          setIsNewModalOpen(false);
          setEditingArticle(null);
        }}
        onSave={handleSaveArticle}
        initialData={editingArticle}
      />

      <ArticleInspectModal
        article={inspectingArticle}
        onClose={() => setInspectingArticle(null)}
        onEdit={(article) => {
          setInspectingArticle(null);
          setEditingArticle(article);
          setIsNewModalOpen(true);
        }}
        onShowToast={showToast}
      />

      {/* Global Toast */}
      {toast && (
        <Toast
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
