export interface Teacher {
  id: string;
  codeInfo: string; // Teacher code info (e.g. TCH-001) - required
  civilServantId?: string; // អត្តលេខមន្រ្តីរាជការ (Civil Servant ID) - optional / not required
  teacherId?: string; // Backwards compatibility fallback
  khmerLastName: string;
  khmerFirstName: string;
  englishLastName: string;
  englishFirstName: string;
  gender: 'Male' | 'Female' | 'Other' | string;
  dob: string;
  status: 'Active' | 'On Leave' | 'Inactive';

  // Birthplace Address (អាសយដ្ឋានកំណើត)
  birthVillage?: string; // ភូមិ
  birthCommune?: string; // ឃុំ/សង្កាត់
  birthDistrict?: string; // ស្រុក/ខណ្ឌ
  birthProvince?: string; // ខេត្ត/ក្រុង/រាជធានី
  birthPlace?: string; // Full formatted fallback

  // Current Address (អាសយដ្ឋានបច្ចុប្បន្ន)
  currentVillage?: string; // ភូមិ
  currentCommune?: string; // ឃុំ/សង្កាត់
  currentDistrict?: string; // ស្រុក/ខណ្ឌ
  currentProvince?: string; // ខេត្ត/ក្រុង/រាជធានី
  currentAddress?: string; // Full formatted address string

  // Optional convenience fields for backwards compatibility
  name?: string;
  department?: string;
  subject?: string;
  email?: string;
  phone?: string;
  classes?: string[];
  joinedDate?: string;
  officeRoom?: string;
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  grade: string;
  section: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  attendanceRate: number; // percentage e.g. 96
  gpa: string;
  status: 'Enrolled' | 'Probation' | 'Graduated';
  enrolledDate: string;
}

export interface ClassInfo {
  id: string;
  code: string;
  name: string;
  department: string;
  teacherName: string;
  room: string;
  schedule: string;
  enrolled: number;
  capacity: number;
  semester: string;
}

export interface AcademicMetric {
  id: number;
  label: string;
  title: string;
  date: string;
  value: string;
  change: string;
}
