import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { BlankPageTemplate } from './components/BlankPageTemplate';
import { ThemeSettingsView } from './components/ThemeSettingsView';
import { Toast } from './components/Toast';
import { Language, translations } from './translations';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('pineapple_lang');
    return (saved === 'km' || saved === 'en') ? saved : 'en';
  });

  const t = translations[lang];

  // Save and load language
  const handleToggleLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('pineapple_lang', newLang);
  };

  // Load saved theme configuration on app load
  useEffect(() => {
    const saved = localStorage.getItem('pineapple_theme_config');
    if (saved) {
      try {
        const theme = JSON.parse(saved);
        const root = document.documentElement;
        if (theme.bg) {
          root.style.setProperty('--app-bg', theme.bg);
          document.body.style.backgroundColor = theme.bg;
        }
        if (theme.surface) root.style.setProperty('--app-surface', theme.surface);
        if (theme.text) {
          root.style.setProperty('--app-text', theme.text);
          document.body.style.color = theme.text;
        }
        if (theme.border) root.style.setProperty('--app-border', theme.border);
        if (theme.fontFamily) {
          root.style.setProperty('--app-font-family', theme.fontFamily);
          document.body.style.setProperty('font-family', theme.fontFamily, 'important');
        }
        if (theme.fontSizePercent) root.style.fontSize = `${theme.fontSizePercent}%`;
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Toast
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  const showToast = (title: string, message: string) => {
    setToast({ title, message });
  };

  return (
    <div 
      className="min-h-screen flex flex-col antialiased"
      style={{ backgroundColor: 'var(--app-bg, #ded5be)', color: 'var(--app-text, #121212)' }}
    >
      {/* Top Application Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Container Wrapper - Permanent Sidebar + Content */}
      <div className="flex-1 flex justify-center p-0 sm:p-2 md:p-4 lg:p-6">
        <div 
          className="w-full max-w-[1600px] border-0 sm:border-2 border-ink shadow-2xl flex flex-row overflow-hidden relative"
          style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
        >
          {/* Permanent Left Sidebar (Never Hides, Translated, No Badges, No Underlines) */}
          <Sidebar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            lang={lang}
          />

          {/* Right Main Content Area */}
          <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
            {/* View router for each menu: Blank Page */}
            <div className="flex-1">
              {currentTab === 'dashboard' && (
                <BlankPageTemplate
                  title={t.pages.dashboardTitle}
                  subtitle={t.pages.dashboardSub}
                  lang={lang}
                />
              )}

              {currentTab === 'teachers' && (
                <BlankPageTemplate
                  title={t.pages.teachersTitle}
                  subtitle={t.pages.teachersSub}
                  lang={lang}
                />
              )}

              {currentTab === 'students' && (
                <BlankPageTemplate
                  title={t.pages.studentsTitle}
                  subtitle={t.pages.studentsSub}
                  lang={lang}
                />
              )}

              {currentTab === 'classes' && (
                <BlankPageTemplate
                  title={t.pages.classesTitle}
                  subtitle={t.pages.classesSub}
                  lang={lang}
                />
              )}

              {/* Theme, Font Family, Font Size & Language Settings */}
              {currentTab === 'settings' && (
                <ThemeSettingsView
                  onShowToast={showToast}
                  lang={lang}
                  onToggleLanguage={handleToggleLanguage}
                />
              )}
            </div>
          </div>
        </div>
      </div>

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
