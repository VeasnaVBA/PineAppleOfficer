import React, { useState } from 'react';
import { 
  initialAcademicMetrics, 
  initialTeachers, 
  initialStudents, 
  initialClasses 
} from './data/initialData';
import { Teacher, Student, ClassInfo } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { TopTicker } from './components/TopTicker';
import { AcademicOverview } from './components/AcademicOverview';
import { TeachersView } from './components/TeachersView';
import { StudentsView } from './components/StudentsView';
import { ClassesView } from './components/ClassesView';
import { SettingsView } from './components/SettingsView';
import { Toast } from './components/Toast';

export function App() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [classes, setClasses] = useState<ClassInfo[]>(initialClasses);
  const [currentTab, setCurrentTab] = useState<string>('overview');

  // Toast
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  const showToast = (title: string, message: string) => {
    setToast({ title, message });
  };

  // Teacher Handlers
  const handleAddTeacher = (teacher: Teacher) => {
    setTeachers(prev => [teacher, ...prev]);
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  // Student Handlers
  const handleAddStudent = (student: Student) => {
    setStudents(prev => [student, ...prev]);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  // Class Handlers
  const handleAddClass = (newCls: ClassInfo) => {
    setClasses(prev => [newCls, ...prev]);
  };

  const handleDeleteClass = (id: string) => {
    setClasses(prev => prev.filter(c => c.id !== id));
  };

  const handleQuickAdd = () => {
    showToast('QUICK ACTION', 'Use the action button in each tab to enroll students, register faculty, or schedule courses.');
  };

  return (
    <div className="min-h-screen bg-[#ded5be] flex flex-col font-sans antialiased text-ink">
      {/* Top Application Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenQuickAdd={handleQuickAdd}
        teacherCount={teachers.length}
        studentCount={students.length}
        classCount={classes.length}
      />

      {/* Main Container Wrapper - Permanent Sidebar + Content */}
      <div className="flex-1 flex justify-center p-0 sm:p-2 md:p-4 lg:p-6">
        <div className="w-full max-w-[1600px] bg-[#ded5be] border-0 sm:border-2 border-ink shadow-2xl flex flex-row overflow-hidden relative">
          
          {/* Permanent Left Sidebar (Never Hides) */}
          <Sidebar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            onOpenQuickAdd={handleQuickAdd}
            teacherCount={teachers.length}
            studentCount={students.length}
            classCount={classes.length}
          />

          {/* Right Main Content Area */}
          <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
            {/* Top Ticker Bar */}
            <TopTicker
              metrics={initialAcademicMetrics}
              onSelectMetric={(metric) => {
                showToast('METRIC INSPECTION', `${metric.title} (${metric.value}) selected.`);
              }}
            />

            {/* View router based on active tab */}
            <div className="flex-1">
              {/* Dashboard Overview */}
              {currentTab === 'overview' && (
                <AcademicOverview
                  teachers={teachers}
                  students={students}
                  classes={classes}
                  onNavigate={setCurrentTab}
                  onShowToast={showToast}
                />
              )}

              {/* Teacher Info */}
              {currentTab === 'teachers' && (
                <TeachersView
                  teachers={teachers}
                  onAddTeacher={handleAddTeacher}
                  onDeleteTeacher={handleDeleteTeacher}
                  onShowToast={showToast}
                />
              )}

              {/* Student Info */}
              {currentTab === 'students' && (
                <StudentsView
                  students={students}
                  onAddStudent={handleAddStudent}
                  onDeleteStudent={handleDeleteStudent}
                  onShowToast={showToast}
                />
              )}

              {/* Class Info */}
              {currentTab === 'classes' && (
                <ClassesView
                  classes={classes}
                  onAddClass={handleAddClass}
                  onDeleteClass={handleDeleteClass}
                  onShowToast={showToast}
                />
              )}

              {/* Settings */}
              {currentTab === 'settings' && (
                <SettingsView onShowToast={showToast} />
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
