import React, { useState } from 'react';
import { Teacher } from '../types';
import { UserPlus, Search, Mail, Phone, BookOpen, Trash2, Edit3, CheckCircle2, GraduationCap } from 'lucide-react';

interface TeachersViewProps {
  teachers: Teacher[];
  onAddTeacher: (teacher: Teacher) => void;
  onDeleteTeacher: (id: string) => void;
  onShowToast: (title: string, message: string) => void;
}

export const TeachersView: React.FC<TeachersViewProps> = ({
  teachers,
  onAddTeacher,
  onDeleteTeacher,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [isAdding, setIsAdding] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    department: 'Literature & Humanities',
    subject: '',
    email: '',
    phone: '',
    officeRoom: '',
    classes: ''
  });

  const departments = ['All', 'Literature & Humanities', 'Mathematics & Computing', 'Natural Sciences', 'Fine Arts & Architecture', 'Social Sciences'];

  const filtered = teachers.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        t.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = deptFilter === 'All' || t.department === deptFilter;
    return matchSearch && matchDept;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.email) return;

    const teacherObj: Teacher = {
      id: `tch-${Date.now()}`,
      name: newTeacher.name,
      department: newTeacher.department,
      subject: newTeacher.subject || 'General Studies',
      email: newTeacher.email,
      phone: newTeacher.phone || '+1 (555) 000-0000',
      classes: newTeacher.classes ? newTeacher.classes.split(',').map(c => c.trim()) : ['GEN-101'],
      status: 'Active',
      joinedDate: '09.11.2026',
      officeRoom: newTeacher.officeRoom || 'Main Faculty Hall'
    };

    onAddTeacher(teacherObj);
    setIsAdding(false);
    setNewTeacher({ name: '', department: 'Literature & Humanities', subject: '', email: '', phone: '', officeRoom: '', classes: '' });
    onShowToast('FACULTY REGISTERED', `${teacherObj.name} added to teacher directory.`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-ink gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-ink/70 uppercase">
            <span>ACADEMICS</span>
            <span>/</span>
            <span className="font-bold text-ink underline">TEACHER INFO</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mt-1">
            FACULTY & INSTRUCTOR ROSTER
          </h2>
          <p className="font-mono text-xs text-ink/70 tracking-wider">
            {teachers.length} Appointed instructors across academic departments
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-4 py-2 bg-ink text-[#ded5be] text-xs font-mono uppercase tracking-widest font-bold hover:bg-ink/85 border border-ink shadow-sm self-start sm:self-auto"
        >
          <UserPlus size={14} />
          <span>Add Instructor</span>
        </button>
      </div>

      {/* Add Teacher Form Drawer */}
      {isAdding && (
        <form onSubmit={handleCreate} className="p-5 border-2 border-ink bg-[#ede5cf] shadow-brutal space-y-4">
          <h4 className="font-serif font-bold text-base text-ink">Register New Faculty Member</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              placeholder="Instructor Full Name *"
              value={newTeacher.name}
              onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
            <input
              type="email"
              required
              placeholder="Official Institutional Email *"
              value={newTeacher.email}
              onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
            <input
              type="text"
              placeholder="Primary Subject (e.g. Calculus)"
              value={newTeacher.subject}
              onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={newTeacher.department}
              onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
              className="px-3 py-1.5 bg-[#ded5be] border border-ink text-xs font-mono outline-none"
            >
              <option value="Literature & Humanities">Literature & Humanities</option>
              <option value="Mathematics & Computing">Mathematics & Computing</option>
              <option value="Natural Sciences">Natural Sciences</option>
              <option value="Fine Arts & Architecture">Fine Arts & Architecture</option>
              <option value="Social Sciences">Social Sciences</option>
            </select>
            <input
              type="text"
              placeholder="Office Location (e.g. Hall B, Rm 204)"
              value={newTeacher.officeRoom}
              onChange={(e) => setNewTeacher({ ...newTeacher, officeRoom: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
            <input
              type="text"
              placeholder="Assigned Class Codes (comma separated, e.g. ENG-101, LIT-201)"
              value={newTeacher.classes}
              onChange={(e) => setNewTeacher({ ...newTeacher, classes: e.target.value })}
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
              Register Faculty
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
            placeholder="Search faculty by name, subject, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono scrollbar-none">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`px-2.5 py-1 border uppercase tracking-wider text-[10px] whitespace-nowrap ${
                deptFilter === dept ? 'bg-ink text-[#ded5be] border-ink font-bold' : 'border-ink/40 text-ink'
              }`}
            >
              {dept === 'All' ? 'All Depts' : dept.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Teachers Table (Pure Typographic & Tabular, Zero Stock Faces) */}
      <div className="border-2 border-ink bg-[#ded5be] overflow-x-auto shadow-brutal">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#111111] text-[#ded5be] border-b border-ink uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3">Faculty Name</th>
              <th className="p-3">Department & Subject</th>
              <th className="p-3">Contact (Email / Phone)</th>
              <th className="p-3">Assigned Classes</th>
              <th className="p-3">Office</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink">
            {filtered.map(teacher => (
              <tr key={teacher.id} className="hover:bg-black/5 transition-colors">
                <td className="p-3">
                  <p className="font-serif font-bold text-sm text-ink">{teacher.name}</p>
                  <p className="text-[10px] text-ink/60">Joined: {teacher.joinedDate}</p>
                </td>
                <td className="p-3">
                  <p className="font-bold text-ink">{teacher.subject}</p>
                  <p className="text-[10px] text-ink/70">{teacher.department}</p>
                </td>
                <td className="p-3">
                  <p className="text-ink/90 flex items-center gap-1">
                    <Mail size={11} className="text-ink/60" />
                    <span>{teacher.email}</span>
                  </p>
                  <p className="text-[10px] text-ink/70 flex items-center gap-1 mt-0.5">
                    <Phone size={10} className="text-ink/60" />
                    <span>{teacher.phone}</span>
                  </p>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {teacher.classes.map((cls, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 border border-ink/40 bg-[#ede5cf] text-[9px] font-bold">
                        {cls}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3 font-semibold text-ink/80">{teacher.officeRoom}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 border text-[10px] font-bold ${
                    teacher.status === 'Tenured' 
                      ? 'border-emerald-800 bg-emerald-100/60 text-emerald-900' 
                      : teacher.status === 'Active'
                      ? 'border-ink bg-[#ede5cf] text-ink'
                      : 'border-amber-800 bg-amber-100 text-amber-900'
                  }`}>
                    {teacher.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => {
                      onDeleteTeacher(teacher.id);
                      onShowToast('FACULTY REMOVED', `${teacher.name} removed from registry.`);
                    }}
                    className="p-1 hover:text-red-700"
                    title="Remove"
                  >
                    <Trash2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
