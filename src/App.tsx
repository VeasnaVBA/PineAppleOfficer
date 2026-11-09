import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { BlankPageTemplate } from './components/BlankPageTemplate';
import { ThemeSettingsView, defaultThemeConfig } from './components/ThemeSettingsView';
import { Toast } from './components/Toast';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  // Load saved theme configuration on app load
  useEffect(() => {
    const saved = localStorage.getItem('pineapple_theme_config');
    if (saved) {
      try {
        const theme = JSON.parse(saved);
        const root = document.documentElement;
        if (theme.bg) root.style.setProperty('--app-bg', theme.bg);
        if (theme.surface) root.style.setProperty('--app-surface', theme.surface);
        if (theme.text) root.style.setProperty('--app-text', theme.text);
        if (theme.border) root.style.setProperty('--app-border', theme.border);
        if (theme.fontFamily) root.style.setProperty('--app-font-family', theme.fontFamily);
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
      className="min-h-screen flex flex-col font-sans antialiased"
      style={{ backgroundColor: 'var(--app-bg, #ded5be)', color: 'var(--app-text, #121212)' }}
    >
      {/* Top Application Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {/* Main Container Wrapper - Permanent Sidebar + Content */}
      <div className="flex-1 flex justify-center p-0 sm:p-2 md:p-4 lg:p-6">
        <div 
          className="w-full max-w-[1600px] border-0 sm:border-2 border-ink shadow-2xl flex flex-row overflow-hidden relative"
          style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
        >
          {/* Permanent Left Sidebar (Never Hides, No Badges, No Underlines) */}
          <Sidebar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />

          {/* Right Main Content Area */}
          <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
            {/* View router */}
            <div className="flex-1">
              {currentTab === 'dashboard' && (
                <BlankPageTemplate
                  title="Dashboard Overview"
                  breadcrumb="DASHBOARD"
                  subtitle="Administrative operations & institutional metrics canvas"
                  onShowToast={showToast}
                />
              )}

              {currentTab === 'teachers' && (
                <BlankPageTemplate
                  title="Teacher Info"
                  breadcrumb="TEACHER INFO"
                  subtitle="Faculty roster, instructor directory, and departmental assignments canvas"
                  onShowToast={showToast}
                />
              )}

              {currentTab === 'students' && (
                <BlankPageTemplate
                  title="Student Info"
                  breadcrumb="STUDENT INFO"
                  subtitle="Student enrollment roster, grade records, and guardian information canvas"
                  onShowToast={showToast}
                />
              )}

              {currentTab === 'classes' && (
                <BlankPageTemplate
                  title="Class Info"
                  breadcrumb="CLASS INFO"
                  subtitle="Academic course schedule, classrooms, and timetable registry canvas"
                  onShowToast={showToast}
                />
              )}

              {/* Theme, Font Family & Font Size Settings */}
              {currentTab === 'settings' && (
                <ThemeSettingsView
                  onShowToast={showToast}
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
