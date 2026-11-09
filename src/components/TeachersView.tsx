import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Search, 
  Trash2, 
  Edit3, 
  X, 
  Check, 
  Filter, 
  GraduationCap,
  Calendar,
  User,
  Hash
} from 'lucide-react';
import { Teacher } from '../types';
import { Language, translations } from '../translations';

interface TeachersViewProps {
  teachers: Teacher[];
  onAddTeacher: (teacher: Teacher) => void;
  onUpdateTeacher: (teacher: Teacher) => void;
  onDeleteTeacher: (id: string) => void;
  onShowToast: (title: string, message: string) => void;
  lang: Language;
}

export const TeachersView: React.FC<TeachersViewProps> = ({
  teachers,
  onAddTeacher,
  onUpdateTeacher,
  onDeleteTeacher,
  onShowToast,
  lang
}) => {
  const t = translations[lang];
  const tt = t.teacher;

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'On Leave' | 'Inactive'>('All');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Male' | 'Female'>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null);

  // Close modal on Escape key & lock background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFormOpen) {
        setIsFormOpen(false);
      }
    };
    if (isFormOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFormOpen]);

  // Form State
  const [formData, setFormData] = useState<{
    id: string;
    codeInfo: string;
    civilServantId: string;
    khmerLastName: string;
    khmerFirstName: string;
    englishLastName: string;
    englishFirstName: string;
    gender: 'Male' | 'Female' | 'Other';
    dob: string;
    status: 'Active' | 'On Leave' | 'Inactive';
  }>({
    id: '',
    codeInfo: '',
    civilServantId: '',
    khmerLastName: '',
    khmerFirstName: '',
    englishLastName: '',
    englishFirstName: '',
    gender: 'Male',
    dob: '1990-01-01',
    status: 'Active'
  });

  const getNextTeacherCode = () => {
    const count = teachers.length + 1;
    return `TCH-${String(count).padStart(3, '0')}`;
  };

  const handleOpenAdd = () => {
    setEditingTeacherId(null);
    setFormData({
      id: String(Date.now()),
      codeInfo: getNextTeacherCode(),
      civilServantId: '',
      khmerLastName: '',
      khmerFirstName: '',
      englishLastName: '',
      englishFirstName: '',
      gender: 'Male',
      dob: '1990-01-01',
      status: 'Active'
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (teacher: Teacher) => {
    setEditingTeacherId(teacher.id);
    setFormData({
      id: teacher.id,
      codeInfo: teacher.codeInfo || teacher.teacherId || getNextTeacherCode(),
      civilServantId: teacher.civilServantId || '',
      khmerLastName: teacher.khmerLastName,
      khmerFirstName: teacher.khmerFirstName,
      englishLastName: teacher.englishLastName,
      englishFirstName: teacher.englishFirstName,
      gender: (teacher.gender as 'Male' | 'Female' | 'Other') || 'Male',
      dob: teacher.dob || '1990-01-01',
      status: teacher.status || 'Active'
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.codeInfo.trim() || !formData.khmerLastName.trim() || !formData.englishLastName.trim()) {
      return;
    }

    if (editingTeacherId) {
      onUpdateTeacher({
        ...formData,
        id: editingTeacherId,
        teacherId: formData.codeInfo,
        name: `${formData.englishFirstName} ${formData.englishLastName}`
      });
      onShowToast(tt.teacherUpdatedToast, `${formData.khmerLastName} ${formData.khmerFirstName} (${formData.codeInfo})`);
    } else {
      const newRecord: Teacher = {
        ...formData,
        id: String(Date.now()),
        teacherId: formData.codeInfo,
        name: `${formData.englishFirstName} ${formData.englishLastName}`
      };
      onAddTeacher(newRecord);
      onShowToast(tt.teacherAddedToast, `${newRecord.khmerLastName} ${newRecord.khmerFirstName} (${newRecord.codeInfo})`);
    }

    setIsFormOpen(false);
    setEditingTeacherId(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`${tt.confirmDelete} (${name})`)) {
      onDeleteTeacher(id);
      onShowToast(tt.teacherDeletedToast, name);
    }
  };

  // Filter logic
  const filteredTeachers = teachers.filter(tch => {
    const query = searchTerm.toLowerCase().trim();
    const code = (tch.codeInfo || tch.teacherId || '').toLowerCase();
    const civilId = (tch.civilServantId || '').toLowerCase();
    const matchesSearch = 
      !query ||
      code.includes(query) ||
      civilId.includes(query) ||
      tch.khmerLastName.toLowerCase().includes(query) ||
      tch.khmerFirstName.toLowerCase().includes(query) ||
      `${tch.khmerLastName} ${tch.khmerFirstName}`.toLowerCase().includes(query) ||
      tch.englishLastName.toLowerCase().includes(query) ||
      tch.englishFirstName.toLowerCase().includes(query) ||
      `${tch.englishFirstName} ${tch.englishLastName}`.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'All' || tch.status === statusFilter;
    const matchesGender = genderFilter === 'All' || tch.gender === genderFilter;

    return matchesSearch && matchesStatus && matchesGender;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <span 
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-ink text-[11px] font-mono font-bold"
            style={{ backgroundColor: 'var(--app-bg)' }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            {tt.active}
          </span>
        );
      case 'On Leave':
        return (
          <span 
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-ink text-[11px] font-mono font-bold"
            style={{ backgroundColor: 'var(--app-bg)' }}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            {tt.onLeave}
          </span>
        );
      case 'Inactive':
      default:
        return (
          <span 
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-ink text-[11px] font-mono font-bold opacity-75"
            style={{ backgroundColor: 'var(--app-bg)' }}
          >
            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
            {tt.inactive}
          </span>
        );
    }
  };

  const getGenderLabel = (gender: string) => {
    if (gender === 'Male') return tt.male;
    if (gender === 'Female') return tt.female;
    return tt.other;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in text-ink">
      {/* Header - No Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-ink gap-3">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight">
          {t.pages.teachersTitle}
        </h2>

        <button
          onClick={handleOpenAdd}
          className="h-9 px-3.5 flex items-center justify-center gap-2 border-2 border-ink font-mono text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all self-start sm:self-auto"
          style={{ backgroundColor: 'var(--app-border)', color: 'var(--app-bg)' }}
        >
          <UserPlus size={15} />
          <span>{tt.addTeacher}</span>
        </button>
      </div>

      {/* Add / Edit Teacher Modal Popup Dialog */}
      {isFormOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsFormOpen(false)}
        >
          <div 
            className="w-full max-w-2xl border-2 border-ink max-h-[92vh] flex flex-col transition-colors overflow-hidden"
            style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div 
              className="px-4 py-3 sm:px-6 sm:py-4 border-b-2 border-ink flex items-center justify-between"
              style={{ backgroundColor: 'var(--app-border)', color: 'var(--app-bg)' }}
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap size={20} />
                <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wide">
                  {editingTeacherId ? tt.editTeacher : tt.addTeacher}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-1 border border-current hover:opacity-75 transition-opacity"
                title={tt.cancel}
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Modal Form Body */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Teacher Code (codeInfo) - Required */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1">
                      {tt.codeInfo} *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none opacity-50">
                        <Hash size={14} />
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="e.g. TCH-001"
                        value={formData.codeInfo}
                        onChange={(e) => setFormData({ ...formData, codeInfo: e.target.value })}
                        className="w-full pl-8 pr-3 py-2 border-2 border-ink text-xs font-mono focus:outline-none transition-colors"
                        style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                      />
                    </div>
                  </div>

                  {/* Civil Servant ID (civilServantId) - Optional / Not Required */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-mono font-bold uppercase">
                        {tt.civilServantId}
                      </label>
                      <span className="text-[10px] font-mono opacity-60">
                        {tt.optional}
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder={lang === 'km' ? "ឧ. 01020304" : "e.g. 10293847"}
                      value={formData.civilServantId}
                      onChange={(e) => setFormData({ ...formData, civilServantId: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-ink text-xs font-mono focus:outline-none transition-colors"
                      style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1">
                      {tt.gender} *
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full px-3 py-2 border-2 border-ink text-xs font-mono focus:outline-none transition-colors cursor-pointer"
                      style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                    >
                      <option value="Male">{tt.male}</option>
                      <option value="Female">{tt.female}</option>
                      <option value="Other">{tt.other}</option>
                    </select>
                  </div>

                  {/* Khmer Last Name */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1">
                      {tt.khmerLastName} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ឧ. ស៊ុន"
                      value={formData.khmerLastName}
                      onChange={(e) => setFormData({ ...formData, khmerLastName: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-ink text-xs focus:outline-none transition-colors"
                      style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                    />
                  </div>

                  {/* Khmer First Name */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1">
                      {tt.khmerFirstName} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ឧ. វណ្ណា"
                      value={formData.khmerFirstName}
                      onChange={(e) => setFormData({ ...formData, khmerFirstName: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-ink text-xs focus:outline-none transition-colors"
                      style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                    />
                  </div>

                  {/* English Last Name */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1">
                      {tt.englishLastName} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sun"
                      value={formData.englishLastName}
                      onChange={(e) => setFormData({ ...formData, englishLastName: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-ink text-xs font-mono focus:outline-none transition-colors"
                      style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                    />
                  </div>

                  {/* English First Name */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1">
                      {tt.englishFirstName} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vanna"
                      value={formData.englishFirstName}
                      onChange={(e) => setFormData({ ...formData, englishFirstName: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-ink text-xs font-mono focus:outline-none transition-colors"
                      style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1">
                      {tt.dob} *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-ink text-xs font-mono focus:outline-none transition-colors"
                      style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1">
                      {tt.status} *
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3 py-2 border-2 border-ink text-xs font-mono focus:outline-none transition-colors cursor-pointer"
                      style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                    >
                      <option value="Active">{tt.active}</option>
                      <option value="On Leave">{tt.onLeave}</option>
                      <option value="Inactive">{tt.inactive}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Modal Footer Action Buttons */}
              <div 
                className="px-4 py-3 sm:px-6 sm:py-4 border-t-2 border-ink flex items-center justify-end gap-3 transition-colors"
                style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
              >
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="h-9 px-4 border-2 border-ink text-xs font-mono uppercase tracking-wider font-bold hover:bg-black/10 transition-colors"
                  style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
                >
                  {tt.cancel}
                </button>
                <button
                  type="submit"
                  className="h-9 px-5 border-2 border-ink text-xs font-mono uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center gap-1.5"
                  style={{ backgroundColor: 'var(--app-border)', color: 'var(--app-bg)' }}
                >
                  <Check size={14} />
                  <span>{tt.save}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Control Bar: Search and Filters (No outer box) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none opacity-60">
            <Search size={15} />
          </span>
          <input
            type="text"
            placeholder={tt.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border-2 border-ink text-xs font-mono focus:outline-none transition-colors"
            style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
          />
        </div>

        {/* Filters and Counter */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <Filter size={13} className="opacity-60" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="py-2 px-2.5 border-2 border-ink text-xs font-mono focus:outline-none transition-colors cursor-pointer"
              style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
            >
              <option value="All">{tt.allStatus}</option>
              <option value="Active">{tt.active}</option>
              <option value="On Leave">{tt.onLeave}</option>
              <option value="Inactive">{tt.inactive}</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div className="flex items-center gap-1.5">
            <User size={13} className="opacity-60" />
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value as any)}
              className="py-2 px-2.5 border-2 border-ink text-xs font-mono focus:outline-none transition-colors cursor-pointer"
              style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
            >
              <option value="All">{tt.allGender}</option>
              <option value="Male">{tt.male}</option>
              <option value="Female">{tt.female}</option>
            </select>
          </div>

          {/* Total Count Badge */}
          <div 
            className="px-3 py-2 border-2 border-ink text-xs font-mono font-bold"
            style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
          >
            <span>{filteredTeachers.length} / {teachers.length}</span>
          </div>
        </div>
      </div>

      {/* Teachers Data Table */}
      <div 
        className="border-2 border-ink overflow-hidden transition-colors"
        style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr 
                className="border-b-2 border-ink text-xs font-mono font-bold uppercase tracking-wider"
                style={{ backgroundColor: 'var(--app-border)', color: 'var(--app-bg)' }}
              >
                <th className="py-3 px-3 sm:px-4 text-center w-12">{tt.id}</th>
                <th className="py-3 px-3 sm:px-4">{tt.codeInfo}</th>
                <th className="py-3 px-3 sm:px-4">{tt.civilServantId}</th>
                <th className="py-3 px-3 sm:px-4">{tt.khmerFullName}</th>
                <th className="py-3 px-3 sm:px-4">{tt.englishFullName}</th>
                <th className="py-3 px-3 sm:px-4 text-center">{tt.gender}</th>
                <th className="py-3 px-3 sm:px-4">{tt.dob}</th>
                <th className="py-3 px-3 sm:px-4 text-center">{tt.status}</th>
                <th className="py-3 px-3 sm:px-4 text-right">{tt.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/20 text-xs font-mono">
              {filteredTeachers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center opacity-70">
                    <p className="font-serif text-sm font-bold">{tt.noTeachersFound}</p>
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((teacher, index) => (
                  <tr 
                    key={teacher.id} 
                    className="hover:bg-black/5 transition-colors"
                  >
                    {/* ID / Row Number */}
                    <td className="py-3 px-3 sm:px-4 text-center opacity-60">
                      {index + 1}
                    </td>

                    {/* Teacher Code (codeInfo) */}
                    <td className="py-3 px-3 sm:px-4 font-bold font-mono">
                      {teacher.codeInfo || teacher.teacherId}
                    </td>

                    {/* Civil Servant ID (civilServantId - Optional) */}
                    <td className="py-3 px-3 sm:px-4 font-mono">
                      {teacher.civilServantId ? (
                        teacher.civilServantId
                      ) : (
                        <span className="opacity-40">-</span>
                      )}
                    </td>

                    {/* Khmer Name (Last + First) */}
                    <td className="py-3 px-3 sm:px-4 font-serif text-sm font-bold">
                      {teacher.khmerLastName} {teacher.khmerFirstName}
                    </td>

                    {/* English Name (Last + First) */}
                    <td className="py-3 px-3 sm:px-4">
                      <span className="font-bold">{teacher.englishLastName}</span> {teacher.englishFirstName}
                    </td>

                    {/* Gender */}
                    <td className="py-3 px-3 sm:px-4 text-center">
                      {getGenderLabel(teacher.gender)}
                    </td>

                    {/* Date of Birth */}
                    <td className="py-3 px-3 sm:px-4 opacity-85">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="opacity-50" />
                        {teacher.dob}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 sm:px-4 text-center">
                      {getStatusBadge(teacher.status)}
                    </td>

                    {/* Actions: Edit & Delete */}
                    <td className="py-3 px-3 sm:px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(teacher)}
                          className="p-1.5 border border-ink hover:bg-black/10 transition-colors"
                          style={{ backgroundColor: 'var(--app-bg)' }}
                          title={tt.edit}
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(teacher.id, `${teacher.khmerLastName} ${teacher.khmerFirstName}`)}
                          className="p-1.5 border border-ink hover:bg-red-500/20 text-red-700 transition-colors"
                          style={{ backgroundColor: 'var(--app-bg)' }}
                          title={tt.delete}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
