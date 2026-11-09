import React from 'react';
import { Teacher, Student, ClassInfo } from '../types';
import { GraduationCap, Users, BookOpen, Clock, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

interface AcademicOverviewProps {
  teachers: Teacher[];
  students: Student[];
  classes: ClassInfo[];
  onNavigate: (tab: string) => void;
  onShowToast: (title: string, message: string) => void;
}

export const AcademicOverview: React.FC<AcademicOverviewProps> = ({
  teachers,
  students,
  classes,
  onNavigate,
  onShowToast
}) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-ink gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-ink/70 uppercase">
            <span>INSTITUTIONAL PORTAL</span>
            <span>/</span>
            <span className="font-bold text-ink underline">ACADEMIC DASHBOARD</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mt-1">
            ACADEMIC OPERATIONS & ROSTER OVERVIEW
          </h2>
          <p className="font-mono text-xs text-ink/70 tracking-wider">
            Academic Year 2026-2027 • Term I In Session
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 border border-ink bg-[#ede5cf] font-bold">
            Term I • Week 11
          </span>
        </div>
      </div>

      {/* 4 Academic KPI Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigate('teachers')}
          className="p-5 border-2 border-ink bg-[#ded5be] shadow-brutal hover:-translate-y-0.5 transition-transform cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-mono uppercase tracking-widest text-ink/70">Faculty Members</p>
            <GraduationCap size={16} />
          </div>
          <h3 className="font-serif text-3xl font-bold text-ink mt-2">{teachers.length}</h3>
          <p className="text-[11px] font-mono text-emerald-800 mt-1 font-bold">
            100% Active Appointments &rarr;
          </p>
        </div>

        <div 
          onClick={() => onNavigate('students')}
          className="p-5 border-2 border-ink bg-[#ded5be] shadow-brutal hover:-translate-y-0.5 transition-transform cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-mono uppercase tracking-widest text-ink/70">Enrolled Scholars</p>
            <Users size={16} />
          </div>
          <h3 className="font-serif text-3xl font-bold text-ink mt-2">{students.length}</h3>
          <p className="text-[11px] font-mono text-emerald-800 mt-1 font-bold">
            Average GPA: 3.70 &rarr;
          </p>
        </div>

        <div 
          onClick={() => onNavigate('classes')}
          className="p-5 border-2 border-ink bg-[#ded5be] shadow-brutal hover:-translate-y-0.5 transition-transform cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-mono uppercase tracking-widest text-ink/70">Scheduled Courses</p>
            <BookOpen size={16} />
          </div>
          <h3 className="font-serif text-3xl font-bold text-ink mt-2">{classes.length}</h3>
          <p className="text-[11px] font-mono text-ink/80 mt-1">
            5 Departments Covered &rarr;
          </p>
        </div>

        <div className="p-5 border-2 border-ink bg-[#ded5be] shadow-brutal">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-mono uppercase tracking-widest text-ink/70">Daily Attendance</p>
            <Clock size={16} />
          </div>
          <h3 className="font-serif text-3xl font-bold text-ink mt-2">96.8%</h3>
          <p className="text-[11px] font-mono text-emerald-800 mt-1 font-bold">
            All Sections Verified
          </p>
        </div>
      </div>

      {/* Two Columns: Recent Schedule & Academic Editorial Notice */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Academic Notice with drop-cap */}
        <div className="lg:col-span-7 border-2 border-ink p-6 bg-[#ede5cf] shadow-brutal flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-ink/20">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                Dean's Academic Bulletin No. 12
              </span>
              <span className="text-[10px] font-mono text-ink/70">09.11.2026</span>
            </div>

            <h3 className="font-serif text-xl font-bold text-ink mt-3">
              Institutional Examinations & Semester Progress
            </h3>

            <p className="font-serif text-sm leading-relaxed text-ink/90 mt-3 drop-cap">
              cademic operations for the 2026-2027 academic term have commenced with complete faculty integration. Departmental evaluations in classical rhetoric, advanced differential calculus, and natural sciences reflect sustained intellectual rigor across all student divisions.
            </p>

            <p className="font-serif text-xs italic text-ink/80 mt-2 border-l-2 border-ink pl-3">
              “Rigor without discipline is chaotic; discipline without inquiry is hollow. Our curriculum maintains equilibrium between classical heritage and modern scientific inquiry.” — Academic Dean
            </p>
          </div>

          <div className="pt-3 border-t border-ink/20 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-ink/70">
            <span>ACADEMIC COUNCIL ARCHIVE</span>
            <span 
              className="underline cursor-pointer hover:text-ink font-bold"
              onClick={() => onShowToast('TRANSCRIPT EXPORTED', 'Official dean bulletin copied.')}
            >
              Export Bulletin Transcript
            </span>
          </div>
        </div>

        {/* Right 5 cols: Today's Class Period Schedule */}
        <div className="lg:col-span-5 border-2 border-ink p-6 bg-[#ded5be] shadow-brutal flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-ink/20">
              <h4 className="font-serif font-bold text-base text-ink">Active Class Schedule</h4>
              <button 
                onClick={() => onNavigate('classes')}
                className="text-[10px] font-mono uppercase underline hover:text-ink font-bold"
              >
                View Timetable
              </button>
            </div>

            <div className="divide-y divide-ink/20 mt-3 space-y-2">
              {classes.slice(0, 4).map(c => (
                <div key={c.id} className="pt-2 flex items-start justify-between text-xs font-mono">
                  <div>
                    <span className="font-bold text-ink">{c.code}</span>
                    <p className="font-serif font-semibold text-xs text-ink/90 truncate max-w-[200px]">{c.name}</p>
                    <span className="text-[10px] text-ink/70">{c.room}</span>
                  </div>
                  <div className="text-right">
                    <span className="px-1.5 py-0.5 border border-ink/40 text-[9px] font-bold bg-[#ede5cf]">
                      {c.enrolled} / {c.capacity}
                    </span>
                    <p className="text-[10px] text-ink/60 mt-0.5">{c.teacherName.split(' ').pop()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-ink/20 text-center">
            <button
              onClick={() => onNavigate('classes')}
              className="text-xs font-mono uppercase tracking-widest font-bold underline"
            >
              Manage Full Schedule &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
