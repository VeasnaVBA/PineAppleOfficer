export interface Teacher {
  id: string;
  name: string;
  department: string;
  subject: string;
  email: string;
  phone: string;
  classes: string[];
  status: 'Active' | 'On Leave' | 'Tenured';
  joinedDate: string;
  officeRoom: string;
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
