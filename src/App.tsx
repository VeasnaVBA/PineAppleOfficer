import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { BlankPageTemplate } from './components/BlankPageTemplate';
import { Toast } from './components/Toast';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  // Toast
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  const showToast = (title: string, message: string) => {
    setToast({ title, message });
  };

  return (
    <div className="min-h-screen bg-[#ded5be] flex flex-col font-sans antialiased text-ink">
      {/* Top Application Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {/* Main Container Wrapper - Permanent Sidebar + Blank Content (No Top Ticker strip) */}
      <div className="flex-1 flex justify-center p-0 sm:p-2 md:p-4 lg:p-6">
        <div className="w-full max-w-[1600px] bg-[#ded5be] border-0 sm:border-2 border-ink shadow-2xl flex flex-row overflow-hidden relative">
          
          {/* Permanent Left Sidebar (Starts directly with navigation) */}
          <Sidebar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />

          {/* Right Main Content Area */}
          <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
            {/* View router for each menu: Blank Page */}
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

              {currentTab === 'settings' && (
                <BlankPageTemplate
                  title="Settings"
                  breadcrumb="SETTINGS"
                  subtitle="System configurations, domain mappings, and institutional controls canvas"
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
