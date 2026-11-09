import React, { useState } from 'react';
import { Student } from '../types';
import { UserPlus, Download, Search, Mail, Phone, Trash2, GraduationCap, CheckCircle2 } from 'lucide-react';

interface StudentsViewProps {
  students: Student[];
  onAddStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
  onShowToast: (title: string, message: string) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  onAddStudent,
  onDeleteStudent,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [isAdding, setIsAdding] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    grade: 'Grade 11',
    section: 'Section Alpha',
    guardianName: '',
    guardianEmail: '',
    guardianPhone: '',
    gpa: '3.80'
  });

  const grades = ['All', 'Grade 10', 'Grade 11', 'Grade 12'];

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.guardianName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGrade = gradeFilter === 'All' || s.grade === gradeFilter;
    return matchSearch && matchGrade;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name) return;

    const studentObj: Student = {
      id: `std-${Date.now()}`,
      studentId: `ST-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: newStudent.name,
      grade: newStudent.grade,
      section: newStudent.section,
      guardianName: newStudent.guardianName || 'Guardian on File',
      guardianEmail: newStudent.guardianEmail || 'guardian@mail.com',
      guardianPhone: newStudent.guardianPhone || '+1 (555) 000-0000',
      attendanceRate: 98,
      gpa: newStudent.gpa || '3.50',
      status: 'Enrolled',
      enrolledDate: '09.11.2026'
    };

    onAddStudent(studentObj);
    setIsAdding(false);
    setNewStudent({ name: '', grade: 'Grade 11', section: 'Section Alpha', guardianName: '', guardianEmail: '', guardianPhone: '', gpa: '3.80' });
    onShowToast('STUDENT ENROLLED', `${studentObj.name} (${studentObj.studentId}) registered.`);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["StudentID,Name,Grade,Section,Guardian,Email,Phone,Attendance,GPA,Status"]
      .concat(students.map(s => `"${s.studentId}","${s.name}","${s.grade}","${s.section}","${s.guardianName}","${s.guardianEmail}","${s.guardianPhone}","${s.attendanceRate}%","${s.gpa}","${s.status}"`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `student_roster_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('EXPORT COMPLETED', 'Student roster ledger exported as CSV.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-ink gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-ink/70 uppercase">
            <span>ACADEMICS</span>
            <span>/</span>
            <span className="font-bold text-ink underline">STUDENT INFO</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mt-1">
            STUDENT ENROLLMENT ROSTER
          </h2>
          <p className="font-mono text-xs text-ink/70 tracking-wider">
            {students.length} Registered scholars across grade divisions
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 border border-ink text-xs font-mono uppercase tracking-widest hover:bg-black/5 flex items-center gap-1.5"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 px-4 py-2 bg-ink text-[#ded5be] text-xs font-mono uppercase tracking-widest font-bold hover:bg-ink/85 border border-ink shadow-sm"
          >
            <UserPlus size={14} />
            <span>Enroll Student</span>
          </button>
        </div>
      </div>

      {/* Add Student Form Drawer */}
      {isAdding && (
        <form onSubmit={handleCreate} className="p-5 border-2 border-ink bg-[#ede5cf] shadow-brutal space-y-4">
          <h4 className="font-serif font-bold text-base text-ink">Enroll New Student Scholar</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              placeholder="Student Full Name *"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
            <select
              value={newStudent.grade}
              onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
              className="px-3 py-1.5 bg-[#ded5be] border border-ink text-xs font-mono outline-none"
            >
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 12">Grade 12</option>
            </select>
            <input
              type="text"
              placeholder="Section (e.g. Section Alpha)"
              value={newStudent.section}
              onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Guardian Full Name"
              value={newStudent.guardianName}
              onChange={(e) => setNewStudent({ ...newStudent, guardianName: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
            <input
              type="email"
              placeholder="Guardian Email"
              value={newStudent.guardianEmail}
              onChange={(e) => setNewStudent({ ...newStudent, guardianEmail: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
            <input
              type="text"
              placeholder="Guardian Phone"
              value={newStudent.guardianPhone}
              onChange={(e) => setNewStudent({ ...newStudent, guardianPhone: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
            <input
              type="text"
              placeholder="Initial GPA (e.g. 3.85)"
              value={newStudent.gpa}
              onChange={(e) => setNewStudent({ ...newStudent, gpa: e.target.value })}
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
              Complete Enrollment
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
            placeholder="Search students by ID, Name, or Guardian..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono scrollbar-none">
          {grades.map(grade => (
            <button
              key={grade}
              onClick={() => setGradeFilter(grade)}
              className={`px-2.5 py-1 border uppercase tracking-wider text-[10px] whitespace-nowrap ${
                gradeFilter === grade ? 'bg-ink text-[#ded5be] border-ink font-bold' : 'border-ink/40 text-ink'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Students Table */}
      <div className="border-2 border-ink bg-[#ded5be] overflow-x-auto shadow-brutal">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#111111] text-[#ded5be] border-b border-ink uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3">Student ID</th>
              <th className="p-3">Scholar Name</th>
              <th className="p-3">Grade & Division</th>
              <th className="p-3">Guardian Contact</th>
              <th className="p-3">Attendance</th>
              <th className="p-3">GPA</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink">
            {filtered.map(student => (
              <tr key={student.id} className="hover:bg-black/5 transition-colors">
                <td className="p-3 font-bold text-ink">{student.studentId}</td>
                <td className="p-3">
                  <p className="font-serif font-bold text-sm text-ink">{student.name}</p>
                  <p className="text-[10px] text-ink/60">Enrolled: {student.enrolledDate}</p>
                </td>
                <td className="p-3">
                  <span className="font-bold text-ink">{student.grade}</span>
                  <span className="text-[10px] text-ink/70 block">{student.section}</span>
                </td>
                <td className="p-3">
                  <p className="text-ink font-semibold">{student.guardianName}</p>
                  <p className="text-[10px] text-ink/70 flex items-center gap-1">
                    <Mail size={10} />
                    <span>{student.guardianEmail}</span>
                  </p>
                </td>
                <td className="p-3">
                  <span className={`font-bold ${student.attendanceRate >= 95 ? 'text-emerald-800' : 'text-amber-800'}`}>
                    {student.attendanceRate}%
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 border border-ink bg-[#ede5cf] font-bold">
                    {student.gpa}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 border text-[10px] font-bold ${
                    student.status === 'Enrolled'
                      ? 'border-emerald-800 bg-emerald-100/60 text-emerald-900'
                      : 'border-amber-800 bg-amber-100 text-amber-900'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => {
                      onDeleteStudent(student.id);
                      onShowToast('RECORD REMOVED', `${student.name} archived.`);
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
