import React, { useState } from 'react';
import { ClassInfo } from '../types';
import { Plus, Search, BookOpen, Clock, MapPin, Users, Trash2 } from 'lucide-react';

interface ClassesViewProps {
  classes: ClassInfo[];
  onAddClass: (newCls: ClassInfo) => void;
  onDeleteClass: (id: string) => void;
  onShowToast: (title: string, message: string) => void;
}

export const ClassesView: React.FC<ClassesViewProps> = ({
  classes,
  onAddClass,
  onDeleteClass,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [isAdding, setIsAdding] = useState(false);
  const [newCls, setNewCls] = useState({
    code: '',
    name: '',
    department: 'Literature',
    teacherName: '',
    room: '',
    schedule: '',
    capacity: 30
  });

  const depts = ['All', 'Literature', 'Mathematics', 'Sciences', 'Arts', 'Social Sciences'];

  const filtered = classes.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        c.teacherName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = deptFilter === 'All' || c.department.toLowerCase().includes(deptFilter.toLowerCase());
    return matchSearch && matchDept;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCls.name || !newCls.code) return;

    const classObj: ClassInfo = {
      id: `cls-${Date.now()}`,
      code: newCls.code.toUpperCase(),
      name: newCls.name,
      department: newCls.department,
      teacherName: newCls.teacherName || 'Faculty Assigned',
      room: newCls.room || 'Main Hall',
      schedule: newCls.schedule || 'Mon / Wed • 09:00 - 10:30',
      enrolled: 1,
      capacity: Number(newCls.capacity) || 30,
      semester: 'Fall 2026'
    };

    onAddClass(classObj);
    setIsAdding(false);
    setNewCls({ code: '', name: '', department: 'Literature', teacherName: '', room: '', schedule: '', capacity: 30 });
    onShowToast('COURSE CREATED', `${classObj.code} (${classObj.name}) added to timetable.`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-ink gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-ink/70 uppercase">
            <span>ACADEMICS</span>
            <span>/</span>
            <span className="font-bold text-ink underline">CLASS INFO</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mt-1">
            CLASS & COURSE TIMETABLE
          </h2>
          <p className="font-mono text-xs text-ink/70 tracking-wider">
            {classes.length} Accredited academic courses and schedules
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-4 py-2 bg-ink text-[#ded5be] text-xs font-mono uppercase tracking-widest font-bold hover:bg-ink/85 border border-ink shadow-sm self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>New Course</span>
        </button>
      </div>

      {/* Add Course Drawer */}
      {isAdding && (
        <form onSubmit={handleCreate} className="p-5 border-2 border-ink bg-[#ede5cf] shadow-brutal space-y-4">
          <h4 className="font-serif font-bold text-base text-ink">Schedule New Course / Class</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              placeholder="Course Code (e.g. PHIL-102) *"
              value={newCls.code}
              onChange={(e) => setNewCls({ ...newCls, code: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
            <input
              type="text"
              required
              placeholder="Course Title *"
              value={newCls.name}
              onChange={(e) => setNewCls({ ...newCls, name: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
            <select
              value={newCls.department}
              onChange={(e) => setNewCls({ ...newCls, department: e.target.value })}
              className="px-3 py-1.5 bg-[#ded5be] border border-ink text-xs font-mono outline-none"
            >
              <option value="Literature">Literature</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Sciences">Sciences</option>
              <option value="Arts">Arts</option>
              <option value="Social Sciences">Social Sciences</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Instructor Name"
              value={newCls.teacherName}
              onChange={(e) => setNewCls({ ...newCls, teacherName: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
            <input
              type="text"
              placeholder="Classroom / Hall (e.g. Rm 204)"
              value={newCls.room}
              onChange={(e) => setNewCls({ ...newCls, room: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
            <input
              type="text"
              placeholder="Schedule (e.g. Tue/Thu 10:00)"
              value={newCls.schedule}
              onChange={(e) => setNewCls({ ...newCls, schedule: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
            <input
              type="number"
              placeholder="Max Capacity"
              value={newCls.capacity}
              onChange={(e) => setNewCls({ ...newCls, capacity: Number(e.target.value) })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-ink/20">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 border border-ink text-xs font-mono uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-1 bg-ink text-[#ded5be] text-xs font-mono uppercase font-bold"
            >
              Confirm Course
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/60" />
          <input
            type="text"
            placeholder="Search classes by code, name, or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono scrollbar-none">
          {depts.map(dept => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`px-2.5 py-1 border uppercase tracking-wider text-[10px] whitespace-nowrap ${
                deptFilter === dept ? 'bg-ink text-[#ded5be] border-ink font-bold' : 'border-ink/40 text-ink'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(cls => {
          const percent = Math.round((cls.enrolled / cls.capacity) * 100);
          return (
            <div key={cls.id} className="border-2 border-ink bg-[#ded5be] p-5 shadow-brutal flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-ink/20">
                  <span className="font-mono font-bold text-xs px-2 py-0.5 bg-ink text-[#ded5be]">
                    {cls.code}
                  </span>
                  <span className="text-[10px] font-mono text-ink/70">
                    {cls.semester}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-ink mt-2.5 leading-snug">
                  {cls.name}
                </h3>
                <p className="text-[11px] font-mono text-ink/75 mt-0.5">
                  Instructor: <span className="font-bold underline">{cls.teacherName}</span>
                </p>

                <div className="mt-3 pt-3 border-t border-ink/20 space-y-1.5 text-xs font-mono text-ink/80">
                  <p className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-ink/60" />
                    <span>{cls.room}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock size={12} className="text-ink/60" />
                    <span>{cls.schedule}</span>
                  </p>
                </div>
              </div>

              <div>
                <div className="space-y-1 pt-2 border-t border-ink/20 text-xs font-mono">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-ink/70">Capacity Roster:</span>
                    <span className="font-bold text-ink">{cls.enrolled} / {cls.capacity} Scholars ({percent}%)</span>
                  </div>
                  <div className="w-full h-2 border border-ink bg-black/10 overflow-hidden">
                    <div style={{ width: `${percent}%` }} className="h-full bg-ink"></div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-ink/20 flex justify-between items-center text-[10px] font-mono">
                  <span className="text-ink/60">DEPARTMENT: {cls.department.toUpperCase()}</span>
                  <button
                    onClick={() => {
                      onDeleteClass(cls.id);
                      onShowToast('COURSE REMOVED', `${cls.code} removed from schedule.`);
                    }}
                    className="hover:text-red-700"
                    title="Delete Course"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
