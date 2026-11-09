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
  Hash,
  RefreshCw,
  MapPin,
  Copy,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Teacher } from '../types';
import { Language, translations } from '../translations';

export type SortField = 
  | 'id' 
  | 'code' 
  | 'civilServantId' 
  | 'khmerName' 
  | 'englishName' 
  | 'gender'
  | 'dob' 
  | 'birthProvince' 
  | 'birthDistrict' 
  | 'currentProvince' 
  | 'currentDistrict' 
  | 'status';

export type SortOrder = 'asc' | 'desc';

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
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
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
    birthVillage: string;
    birthCommune: string;
    birthDistrict: string;
    birthProvince: string;
    currentVillage: string;
    currentCommune: string;
    currentDistrict: string;
    currentProvince: string;
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
    status: 'Active',
    birthVillage: '',
    birthCommune: '',
    birthDistrict: '',
    birthProvince: '',
    currentVillage: '',
    currentCommune: '',
    currentDistrict: '',
    currentProvince: ''
  });

  const generateUniqueTeacherCode = (currentVal?: string) => {
    const existingCodes = new Set(
      teachers
        .filter(t => t.id !== editingTeacherId)
        .map(t => (t.codeInfo || t.teacherId || '').trim().toUpperCase())
        .filter(Boolean)
    );

    // If currentVal is provided and matches TCH-XXX, start searching from the next number
    let startNum = 1;
    if (currentVal) {
      const match = currentVal.trim().match(/^TCH-(\d+)$/i);
      if (match) {
        startNum = parseInt(match[1], 10) + 1;
      }
    }

    let num = startNum;
    while (num < 10000) {
      const candidate = `TCH-${String(num).padStart(3, '0')}`;
      if (!existingCodes.has(candidate)) {
        return candidate;
      }
      num++;
    }

    // Wrap-around scan from 1
    num = 1;
    while (existingCodes.has(`TCH-${String(num).padStart(3, '0')}`)) {
      num++;
    }
    return `TCH-${String(num).padStart(3, '0')}`;
  };

  const handleGenerateCode = () => {
    const nextCode = generateUniqueTeacherCode(formData.codeInfo);
    setFormData(prev => ({ ...prev, codeInfo: nextCode }));
  };

  const isDuplicateCode = teachers.some(
    t => t.id !== editingTeacherId && 
         (t.codeInfo || t.teacherId || '').trim().toLowerCase() === formData.codeInfo.trim().toLowerCase()
  );

  const handleOpenAdd = () => {
    setEditingTeacherId(null);
    setFormData({
      id: String(Date.now()),
      codeInfo: generateUniqueTeacherCode(),
      civilServantId: '',
      khmerLastName: '',
      khmerFirstName: '',
      englishLastName: '',
      englishFirstName: '',
      gender: 'Male',
      dob: '1990-01-01',
      status: 'Active',
      birthVillage: '',
      birthCommune: '',
      birthDistrict: '',
      birthProvince: '',
      currentVillage: '',
      currentCommune: '',
      currentDistrict: '',
      currentProvince: ''
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (teacher: Teacher) => {
    setEditingTeacherId(teacher.id);
    setFormData({
      id: teacher.id,
      codeInfo: teacher.codeInfo || teacher.teacherId || generateUniqueTeacherCode(),
      civilServantId: teacher.civilServantId || '',
      khmerLastName: teacher.khmerLastName,
      khmerFirstName: teacher.khmerFirstName,
      englishLastName: teacher.englishLastName,
      englishFirstName: teacher.englishFirstName,
      gender: (teacher.gender as 'Male' | 'Female' | 'Other') || 'Male',
      dob: teacher.dob || '1990-01-01',
      status: teacher.status || 'Active',
      birthVillage: teacher.birthVillage || '',
      birthCommune: teacher.birthCommune || '',
      birthDistrict: teacher.birthDistrict || '',
      birthProvince: teacher.birthProvince || '',
      currentVillage: teacher.currentVillage || '',
      currentCommune: teacher.currentCommune || '',
      currentDistrict: teacher.currentDistrict || '',
      currentProvince: teacher.currentProvince || ''
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.codeInfo.trim() || !formData.khmerLastName.trim() || !formData.englishLastName.trim()) {
      return;
    }

    if (isDuplicateCode) {
      onShowToast(
        lang === 'km' ? 'កូដស្ទួន' : 'Duplicate Code',
        lang === 'km' ? `កូដ ${formData.codeInfo} មានរួចហើយក្នុងប្រព័ន្ធ សូមបង្កើតកូដផ្សេង` : `Code ${formData.codeInfo} already exists, please generate another`
      );
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
    const bVill = (tch.birthVillage || '').toLowerCase();
    const bCom = (tch.birthCommune || '').toLowerCase();
    const bDist = (tch.birthDistrict || '').toLowerCase();
    const bProv = (tch.birthProvince || '').toLowerCase();
    const cVill = (tch.currentVillage || '').toLowerCase();
    const cCom = (tch.currentCommune || '').toLowerCase();
    const cDist = (tch.currentDistrict || '').toLowerCase();
    const cProv = (tch.currentProvince || '').toLowerCase();

    const matchesSearch = 
      !query ||
      code.includes(query) ||
      civilId.includes(query) ||
      bVill.includes(query) ||
      bCom.includes(query) ||
      bDist.includes(query) ||
      bProv.includes(query) ||
      cVill.includes(query) ||
      cCom.includes(query) ||
      cDist.includes(query) ||
      cProv.includes(query) ||
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

  const formatAddress = (village?: string, commune?: string, district?: string, province?: string) => {
    const parts = [village, commune, district, province].filter(Boolean);
    if (parts.length === 0) return '-';
    if (lang === 'km') {
      const p = [];
      if (village) {
        const cleanV = village.replace(/^ភូមិ\s*៖?\s*/, '').trim();
        p.push(`ភូមិ៖ ${cleanV || village}`);
      }
      if (commune) {
        const cleanC = commune.replace(/^(ឃុំ\/សង្កាត់|ឃុំ|សង្កាត់)\s*៖?\s*/, '').trim();
        p.push(`ឃុំ/សង្កាត់៖ ${cleanC || commune}`);
      }
      if (district) {
        const cleanD = district.replace(/^(ស្រុក\/ខណ្ឌ|ស្រុក|ខណ្ឌ)\s*៖?\s*/, '').trim();
        p.push(`ស្រុក/ខណ្ឌ៖ ${cleanD || district}`);
      }
      if (province) {
        const cleanP = province.replace(/^ខេត្ត\/ក្រុង\/រាជធានី\s*៖?\s*/, '').trim();
        if (cleanP.startsWith('ខេត្ត') || cleanP.startsWith('រាជធានី') || cleanP.startsWith('ក្រុង')) {
          p.push(cleanP);
        } else {
          p.push(`ខេត្ត/រាជធានី៖ ${cleanP}`);
        }
      }
      return p.join(', ');
    }
    const p = [];
    if (village) p.push(`Village: ${village}`);
    if (commune) p.push(`Commune: ${commune}`);
    if (district) p.push(`District: ${district}`);
    if (province) p.push(`Province: ${province}`);
    return p.join(', ');
  };

  const handleHeaderSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? (
        <ArrowUp size={12} className="inline-block shrink-0 text-amber-300" />
      ) : (
        <ArrowDown size={12} className="inline-block shrink-0 text-amber-300" />
      );
    }
    return (
      <ArrowUpDown size={11} className="inline-block shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
    );
  };

  // Sort logic across all fields including addresses
  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    let cmp = 0;
    switch (sortField) {
      case 'code': {
        const codeA = a.codeInfo || a.teacherId || '';
        const codeB = b.codeInfo || b.teacherId || '';
        cmp = codeA.localeCompare(codeB, undefined, { numeric: true });
        break;
      }
      case 'civilServantId': {
        cmp = (a.civilServantId || '').localeCompare(b.civilServantId || '', undefined, { numeric: true });
        break;
      }
      case 'khmerName': {
        const nameA = `${a.khmerLastName} ${a.khmerFirstName}`.trim();
        const nameB = `${b.khmerLastName} ${b.khmerFirstName}`.trim();
        cmp = nameA.localeCompare(nameB, 'km');
        break;
      }
      case 'englishName': {
        const nameA = `${a.englishLastName} ${a.englishFirstName}`.trim();
        const nameB = `${b.englishLastName} ${b.englishFirstName}`.trim();
        cmp = nameA.localeCompare(nameB, 'en');
        break;
      }
      case 'gender': {
        cmp = (a.gender || '').localeCompare(b.gender || '');
        break;
      }
      case 'dob': {
        cmp = (a.dob || '').localeCompare(b.dob || '');
        break;
      }
      case 'birthProvince': {
        const provA = a.birthProvince || '';
        const provB = b.birthProvince || '';
        cmp = provA.localeCompare(provB, 'km');
        if (cmp === 0) {
          cmp = (a.birthDistrict || '').localeCompare(b.birthDistrict || '', 'km');
        }
        if (cmp === 0) {
          cmp = (a.birthCommune || '').localeCompare(b.birthCommune || '', 'km');
        }
        if (cmp === 0) {
          cmp = (a.birthVillage || '').localeCompare(b.birthVillage || '', 'km');
        }
        break;
      }
      case 'birthDistrict': {
        const distA = a.birthDistrict || '';
        const distB = b.birthDistrict || '';
        cmp = distA.localeCompare(distB, 'km');
        if (cmp === 0) {
          cmp = (a.birthCommune || '').localeCompare(b.birthCommune || '', 'km');
        }
        break;
      }
      case 'currentProvince': {
        const provA = a.currentProvince || '';
        const provB = b.currentProvince || '';
        cmp = provA.localeCompare(provB, 'km');
        if (cmp === 0) {
          cmp = (a.currentDistrict || '').localeCompare(b.currentDistrict || '', 'km');
        }
        if (cmp === 0) {
          cmp = (a.currentCommune || '').localeCompare(b.currentCommune || '', 'km');
        }
        if (cmp === 0) {
          cmp = (a.currentVillage || '').localeCompare(b.currentVillage || '', 'km');
        }
        break;
      }
      case 'currentDistrict': {
        const distA = a.currentDistrict || '';
        const distB = b.currentDistrict || '';
        cmp = distA.localeCompare(distB, 'km');
        if (cmp === 0) {
          cmp = (a.currentCommune || '').localeCompare(b.currentCommune || '', 'km');
        }
        break;
      }
      case 'status': {
        cmp = (a.status || '').localeCompare(b.status || '');
        break;
      }
      case 'id':
      default: {
        const numA = parseInt(a.id, 10);
        const numB = parseInt(b.id, 10);
        if (!isNaN(numA) && !isNaN(numB)) {
          cmp = numA - numB;
        } else {
          cmp = a.id.localeCompare(b.id);
        }
        break;
      }
    }
    return sortOrder === 'asc' ? cmp : -cmp;
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
                    <div className="flex items-center gap-1.5">
                      <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none opacity-50">
                          <Hash size={14} />
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="e.g. TCH-001"
                          value={formData.codeInfo}
                          onChange={(e) => setFormData({ ...formData, codeInfo: e.target.value })}
                          className={`w-full pl-8 pr-3 py-2 border-2 text-xs font-mono focus:outline-none transition-colors ${
                            isDuplicateCode ? 'border-red-600 bg-red-500/10' : 'border-ink'
                          }`}
                          style={{ backgroundColor: isDuplicateCode ? undefined : 'var(--app-bg, #ded5be)' }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleGenerateCode}
                        className="h-[38px] px-2.5 border-2 border-ink hover:bg-black/10 transition-colors flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
                        style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                        title="Generate Code"
                        aria-label="Generate Code"
                      >
                        <RefreshCw size={14} />
                      </button>
                    </div>
                    {isDuplicateCode && formData.codeInfo.trim() && (
                      <p className="text-[10px] text-red-600 font-mono mt-1 font-bold">
                        {lang === 'km' ? '⚠️ កូដនេះមានរួចហើយក្នុងប្រព័ន្ធ' : '⚠️ Code already exists'}
                      </p>
                    )}
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

                {/* Section: អាសយដ្ឋានកំណើត (Birthplace Address) */}
                <div className="pt-4 border-t-2 border-ink space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <h4 className="font-serif font-bold text-sm uppercase">
                      {tt.birthAddress} ({tt.village}, {tt.commune}, {tt.district}, {tt.province})
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* ភូមិ (Village) */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        {tt.village}
                      </label>
                      <input
                        type="text"
                        placeholder="ឧ. ព្រែកតាពៅ"
                        value={formData.birthVillage}
                        onChange={(e) => setFormData({ ...formData, birthVillage: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-ink text-xs focus:outline-none transition-colors"
                        style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                      />
                    </div>

                    {/* ឃុំ/សង្កាត់ (Commune) */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        {tt.commune}
                      </label>
                      <input
                        type="text"
                        placeholder="ឧ. ដើមមាន"
                        value={formData.birthCommune}
                        onChange={(e) => setFormData({ ...formData, birthCommune: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-ink text-xs focus:outline-none transition-colors"
                        style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                      />
                    </div>

                    {/* ស្រុក/ខណ្ឌ (District) */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        {tt.district}
                      </label>
                      <input
                        type="text"
                        placeholder="ឧ. ក្រុងតាខ្មៅ"
                        value={formData.birthDistrict}
                        onChange={(e) => setFormData({ ...formData, birthDistrict: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-ink text-xs focus:outline-none transition-colors"
                        style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                      />
                    </div>

                    {/* ខេត្ត/ក្រុង/រាជធានី (Province) */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        {tt.province}
                      </label>
                      <input
                        type="text"
                        placeholder="ឧ. ខេត្តកណ្តាល"
                        value={formData.birthProvince}
                        onChange={(e) => setFormData({ ...formData, birthProvince: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-ink text-xs focus:outline-none transition-colors"
                        style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Section: អាសយដ្ឋានបច្ចុប្បន្ន (Current Address) */}
                <div className="pt-4 border-t-2 border-ink space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <h4 className="font-serif font-bold text-sm uppercase">
                        {tt.currentAddress}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        currentVillage: prev.birthVillage,
                        currentCommune: prev.birthCommune,
                        currentDistrict: prev.birthDistrict,
                        currentProvince: prev.birthProvince
                      }))}
                      className="flex items-center gap-1.5 px-2.5 py-1 border border-ink text-[11px] font-mono font-bold hover:bg-black/10 transition-colors self-start sm:self-auto"
                      style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                    >
                      <Copy size={12} />
                      <span>{tt.sameAsBirthplace}</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* ភូមិ (Village) */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        {tt.village}
                      </label>
                      <input
                        type="text"
                        placeholder="ឧ. ភូមិ១"
                        value={formData.currentVillage}
                        onChange={(e) => setFormData({ ...formData, currentVillage: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-ink text-xs focus:outline-none transition-colors"
                        style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                      />
                    </div>

                    {/* ឃុំ/សង្កាត់ (Commune) */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        {tt.commune}
                      </label>
                      <input
                        type="text"
                        placeholder="ឧ. បឹងកក់១"
                        value={formData.currentCommune}
                        onChange={(e) => setFormData({ ...formData, currentCommune: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-ink text-xs focus:outline-none transition-colors"
                        style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                      />
                    </div>

                    {/* ស្រុក/ខណ្ឌ (District) */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        {tt.district}
                      </label>
                      <input
                        type="text"
                        placeholder="ឧ. ខណ្ឌទួលគោក"
                        value={formData.currentDistrict}
                        onChange={(e) => setFormData({ ...formData, currentDistrict: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-ink text-xs focus:outline-none transition-colors"
                        style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                      />
                    </div>

                    {/* ខេត្ត/ក្រុង/រាជធានី (Province) */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase mb-1">
                        {tt.province}
                      </label>
                      <input
                        type="text"
                        placeholder="ឧ. រាជធានីភ្នំពេញ"
                        value={formData.currentProvince}
                        onChange={(e) => setFormData({ ...formData, currentProvince: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-ink text-xs focus:outline-none transition-colors"
                        style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
                      />
                    </div>
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

        {/* Filters, Sorting and Counter */}
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

          {/* Sort By Dropdown & Order Toggle */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown size={13} className="opacity-60" />
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="py-2 px-2.5 border-2 border-ink text-xs font-mono focus:outline-none transition-colors cursor-pointer"
              style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
              title={tt.sortBy}
            >
              <option value="id">{tt.defaultSort}</option>
              <option value="code">{tt.sortCode}</option>
              <option value="civilServantId">{tt.sortCivilServantId}</option>
              <option value="khmerName">{tt.sortKhmerName}</option>
              <option value="englishName">{tt.sortEnglishName}</option>
              <option value="dob">{tt.sortDob}</option>
              <option value="birthProvince">{tt.sortBirthProvince}</option>
              <option value="birthDistrict">{tt.sortBirthDistrict}</option>
              <option value="currentProvince">{tt.sortCurrentProvince}</option>
              <option value="currentDistrict">{tt.sortCurrentDistrict}</option>
              <option value="status">{tt.sortStatus}</option>
            </select>

            {/* Asc / Desc Toggle Button */}
            <button
              type="button"
              onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
              className="h-[34px] px-2.5 border-2 border-ink text-xs font-mono font-bold hover:bg-black/10 transition-colors flex items-center gap-1"
              style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
              title={sortOrder === 'asc' ? tt.sortAsc : tt.sortDesc}
            >
              {sortOrder === 'asc' ? <ArrowUp size={13} /> : <ArrowDown size={13} />}
              <span className="text-[11px]">{sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
            </button>
          </div>

          {/* Total Count Badge */}
          <div 
            className="px-3 py-2 border-2 border-ink text-xs font-mono font-bold"
            style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
          >
            <span>{sortedTeachers.length} / {teachers.length}</span>
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
                <th 
                  onClick={() => handleHeaderSort('id')}
                  className="py-3 px-3 sm:px-4 text-center w-12 cursor-pointer select-none hover:bg-black/20 transition-colors group whitespace-nowrap"
                  title={tt.defaultSort}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>{tt.id}</span>
                    {renderSortIcon('id')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('code')}
                  className="py-3 px-3 sm:px-4 cursor-pointer select-none hover:bg-black/20 transition-colors group whitespace-nowrap"
                  title={tt.sortCode}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{tt.codeInfo}</span>
                    {renderSortIcon('code')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('civilServantId')}
                  className="py-3 px-3 sm:px-4 cursor-pointer select-none hover:bg-black/20 transition-colors group whitespace-nowrap"
                  title={tt.sortCivilServantId}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{tt.civilServantId}</span>
                    {renderSortIcon('civilServantId')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('khmerName')}
                  className="py-3 px-3 sm:px-4 cursor-pointer select-none hover:bg-black/20 transition-colors group whitespace-nowrap"
                  title={tt.sortKhmerName}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{tt.khmerFullName}</span>
                    {renderSortIcon('khmerName')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('englishName')}
                  className="py-3 px-3 sm:px-4 cursor-pointer select-none hover:bg-black/20 transition-colors group whitespace-nowrap"
                  title={tt.sortEnglishName}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{tt.englishFullName}</span>
                    {renderSortIcon('englishName')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('gender')}
                  className="py-3 px-3 sm:px-4 text-center cursor-pointer select-none hover:bg-black/20 transition-colors group whitespace-nowrap"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>{tt.gender}</span>
                    {renderSortIcon('gender')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('dob')}
                  className="py-3 px-3 sm:px-4 cursor-pointer select-none hover:bg-black/20 transition-colors group whitespace-nowrap"
                  title={tt.sortDob}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{tt.dob}</span>
                    {renderSortIcon('dob')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('birthProvince')}
                  className="py-3 px-3 sm:px-4 cursor-pointer select-none hover:bg-black/20 transition-colors group whitespace-nowrap"
                  title={`${tt.sortBirthProvince} / ${tt.sortBirthDistrict}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{tt.birthAddress}</span>
                    {renderSortIcon('birthProvince')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('currentProvince')}
                  className="py-3 px-3 sm:px-4 cursor-pointer select-none hover:bg-black/20 transition-colors group whitespace-nowrap"
                  title={`${tt.sortCurrentProvince} / ${tt.sortCurrentDistrict}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{tt.currentAddress}</span>
                    {renderSortIcon('currentProvince')}
                  </div>
                </th>
                <th 
                  onClick={() => handleHeaderSort('status')}
                  className="py-3 px-3 sm:px-4 text-center cursor-pointer select-none hover:bg-black/20 transition-colors group whitespace-nowrap"
                  title={tt.sortStatus}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>{tt.status}</span>
                    {renderSortIcon('status')}
                  </div>
                </th>
                <th className="py-3 px-3 sm:px-4 text-right whitespace-nowrap">{tt.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/20 text-xs font-mono">
              {sortedTeachers.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center opacity-70">
                    <p className="font-serif text-sm font-bold">{tt.noTeachersFound}</p>
                  </td>
                </tr>
              ) : (
                sortedTeachers.map((teacher, index) => (
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
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <Calendar size={12} className="opacity-50" />
                        {teacher.dob}
                      </span>
                    </td>

                    {/* Birthplace Address (អាសយដ្ឋានកំណើត) */}
                    <td className="py-3 px-3 sm:px-4 text-xs font-serif min-w-[190px] leading-relaxed">
                      {formatAddress(teacher.birthVillage, teacher.birthCommune, teacher.birthDistrict, teacher.birthProvince)}
                    </td>

                    {/* Current Address (អាសយដ្ឋានបច្ចុប្បន្ន) */}
                    <td className="py-3 px-3 sm:px-4 text-xs font-serif min-w-[190px] leading-relaxed">
                      {formatAddress(teacher.currentVillage, teacher.currentCommune, teacher.currentDistrict, teacher.currentProvince)}
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
