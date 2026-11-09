import React, { useState } from 'react';
import { initialArticles, initialMetrics, heroArticle, initialSubscribers } from './data/initialData';
import { Article, Subscriber } from './types';
import { Navbar } from './components/Navbar';
import { BottomMobileNav } from './components/BottomMobileNav';
import { MobileDrawer } from './components/MobileDrawer';
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
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  
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
    <div className="min-h-screen bg-[#ded5be] flex flex-col font-sans antialiased text-ink pb-16 lg:pb-0">
      {/* Top Application Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenNewModal={() => {
          setEditingArticle(null);
          setIsNewModalOpen(true);
        }}
        onToggleMobileDrawer={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
        isMobileDrawerOpen={isMobileDrawerOpen}
        articleCount={articles.length}
        subscriberCount={subscribers.length}
      />

      {/* Main Container Wrapper */}
      <div className="flex-1 flex justify-center p-0 sm:p-3 md:p-6 lg:p-8">
        <div className="w-full max-w-[1580px] bg-[#ded5be] border-0 sm:border-2 border-ink shadow-2xl flex flex-col lg:flex-row overflow-hidden relative">
          
          {/* Left Column: Sidebar (Desktop only) */}
          <Sidebar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            onOpenNewModal={() => {
              setEditingArticle(null);
              setIsNewModalOpen(true);
            }}
            articleCount={articles.length}
          />

          {/* Center & Main Content Area */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Top Ticker Bar */}
            <TopTicker
              metrics={initialMetrics}
              onSelectMetric={(metric) => {
                showToast('METRIC INSPECTION', `${metric.title} (${metric.date}) selected.`);
              }}
            />

            {/* View router based on active tab */}
            <div className="flex-1">
              {/* Home Overview View: The classic full magazine spread */}
              {currentTab === 'overview' && (
                <div className="flex flex-col xl:flex-row">
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
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
                    <BottomEditorial onShowToast={showToast} />
                  </div>

                  <RightRail
                    heroArticle={heroArticle}
                    onSelectArticle={(article) => setInspectingArticle(article)}
                    onShowToast={showToast}
                  />
                </div>
              )}

              {/* Dedicated Curated Articles Page */}
              {currentTab === 'articles' && (
                <div className="flex flex-col">
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
                  <div className="p-4 sm:p-6 lg:p-8 border-b-2 border-ink">
                    <h3 className="font-serif text-lg font-bold text-ink mb-2">Curatorial Focus</h3>
                    <p className="font-serif text-sm text-ink/80 leading-relaxed max-w-3xl">
                      All editions are reviewed weekly by the curatorial board. Monolithic architecture, surrealist human studies, and stark philosophical essays are prioritized for front-line circulation.
                    </p>
                  </div>
                  <BottomEditorial onShowToast={showToast} />
                </div>
              )}

              {/* Editorial CMS Page */}
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

              {/* Analytics & Intelligence Page */}
              {currentTab === 'analytics' && (
                <AnalyticsView />
              )}

              {/* Subscribers / CRM Page */}
              {currentTab === 'subscribers' && (
                <SubscribersView
                  subscribers={subscribers}
                  onAddSubscriber={handleAddSubscriber}
                  onDeleteSubscriber={handleDeleteSubscriber}
                  onShowToast={showToast}
                />
              )}

              {/* Media Vault Gallery Page */}
              {currentTab === 'gallery' && (
                <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
                  <div className="border-b-2 border-ink pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold uppercase text-ink">
                        CURATORIAL MEDIA VAULT
                      </h2>
                      <p className="font-mono text-xs text-ink/70">
                        High-contrast monochrome photography and archival plates
                      </p>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 border border-ink bg-[#ede5cf] self-start sm:self-auto font-bold">
                      {articles.length + 5} Archival Plates
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600', title: 'Isolation Study #1', author: 'Ben Zank' },
                      { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600', title: 'The Silhouette Posture', author: 'Ignant Studio' },
                      { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600', title: 'Temporal Continuum', author: 'Julian M.' },
                      { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600', title: 'Brutalist Form', author: 'Elena Rostova' },
                      { url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=800', title: 'Tacheles Cathedral Rays', author: 'Karin Von Berg' },
                      { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600', title: 'Auditorium Monochrome', author: 'Archival Staff' },
                      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600', title: 'Subtle Valley Shadows', author: 'Jack Johnstone' },
                      { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600', title: 'Geometric Angle', author: 'Drew Vickers' }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="border-2 border-ink aspect-square overflow-hidden bg-black group relative cursor-pointer shadow-sm hover:shadow-brutal transition-all"
                        onClick={() => showToast('PLATE INSPECTED', `${item.title} by ${item.author}`)}
                      >
                        <img 
                          src={item.url} 
                          alt={item.title} 
                          className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-300" 
                        />
                        <div className="absolute inset-0 bg-ink/80 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-[#ded5be]">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#b8ad94]">PLATE #{idx + 101}</span>
                          <span className="text-sm font-serif font-bold text-[#ded5be]">{item.title}</span>
                          <span className="text-xs font-mono text-[#ded5be]/80 mt-0.5">{item.author}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* System Configuration & Cloud Settings Page */}
              {currentTab === 'settings' && (
                <SettingsView onShowToast={showToast} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Menu) */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenNewModal={() => {
          setEditingArticle(null);
          setIsNewModalOpen(true);
        }}
        articleCount={articles.length}
        subscriberCount={subscribers.length}
      />

      {/* Mobile Bottom Navigation Bar */}
      <BottomMobileNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onToggleMobileDrawer={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
      />

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
          setInspectingArticle(article);
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
