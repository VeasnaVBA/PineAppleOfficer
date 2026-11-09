import { Teacher, Student, ClassInfo, AcademicMetric } from '../types';

export const initialAcademicMetrics: AcademicMetric[] = [
  {
    id: 1,
    label: '1.',
    title: 'Total Enrolled Students',
    date: 'Academic Term 2026',
    value: '1,420 Enrolled',
    change: '+42 this term'
  },
  {
    id: 2,
    label: '2.',
    title: 'Active Faculty & Instructors',
    date: 'All Departments',
    value: '84 Faculty Members',
    change: '100% Staffed'
  },
  {
    id: 3,
    label: '3.',
    title: 'Daily Attendance Average',
    date: 'Updated Today 08:30 AM',
    value: '96.8% Present',
    change: 'Optimal Rate'
  }
];

export const initialTeachers: Teacher[] = [
  {
    id: 'tch-1',
    name: 'Dr. Arthur Sterling',
    department: 'Literature & Humanities',
    subject: 'Classical English & Rhetoric',
    email: 'a.sterling@academy.edu',
    phone: '+1 (555) 234-8901',
    classes: ['ENG-101', 'LIT-304'],
    status: 'Tenured',
    joinedDate: '14.08.2018',
    officeRoom: 'Hall B, Rm 204'
  },
  {
    id: 'tch-2',
    name: 'Prof. Eleanor Vance',
    department: 'Mathematics & Computing',
    subject: 'Advanced Calculus & Logic',
    email: 'e.vance@academy.edu',
    phone: '+1 (555) 789-1023',
    classes: ['MATH-201', 'MATH-402'],
    status: 'Active',
    joinedDate: '01.09.2021',
    officeRoom: 'Science Wing, Rm 112'
  },
  {
    id: 'tch-3',
    name: 'Marcus Holloway',
    department: 'Natural Sciences',
    subject: 'Theoretical Physics & Mechanics',
    email: 'm.holloway@academy.edu',
    phone: '+1 (555) 456-7812',
    classes: ['PHYS-101', 'PHYS-203'],
    status: 'Active',
    joinedDate: '15.01.2023',
    officeRoom: 'Lab Complex 3'
  },
  {
    id: 'tch-4',
    name: 'Clara Beaumont',
    department: 'Fine Arts & Architecture',
    subject: 'History of Architecture & Design',
    email: 'c.beaumont@academy.edu',
    phone: '+1 (555) 678-9012',
    classes: ['ARCH-110', 'DES-201'],
    status: 'Active',
    joinedDate: '22.08.2020',
    officeRoom: 'Studio Hall 4'
  },
  {
    id: 'tch-5',
    name: 'Julian Thorne',
    department: 'Social Sciences',
    subject: 'Modern World History & Politics',
    email: 'j.thorne@academy.edu',
    phone: '+1 (555) 345-6789',
    classes: ['HIST-105'],
    status: 'On Leave',
    joinedDate: '10.02.2019',
    officeRoom: 'Tower Rm 302'
  }
];

export const initialStudents: Student[] = [
  {
    id: 'std-1',
    studentId: 'ST-2026-081',
    name: 'Alexander Ross',
    grade: 'Grade 11',
    section: 'Section Alpha',
    guardianName: 'Robert Ross',
    guardianEmail: 'r.ross@archive-mail.com',
    guardianPhone: '+1 (555) 390-1284',
    attendanceRate: 98,
    gpa: '3.92',
    status: 'Enrolled',
    enrolledDate: '01.09.2024'
  },
  {
    id: 'std-2',
    studentId: 'ST-2026-082',
    name: 'Beatrice Chen',
    grade: 'Grade 12',
    section: 'Section Honors',
    guardianName: 'Dr. Michael Chen',
    guardianEmail: 'm.chen@hospital-corp.org',
    guardianPhone: '+1 (555) 489-3012',
    attendanceRate: 99,
    gpa: '4.00',
    status: 'Enrolled',
    enrolledDate: '01.09.2023'
  },
  {
    id: 'std-3',
    studentId: 'ST-2026-083',
    name: 'Damian Clarke',
    grade: 'Grade 10',
    section: 'Section Beta',
    guardianName: 'Helena Clarke',
    guardianEmail: 'helena.clarke@post.net',
    guardianPhone: '+1 (555) 901-4432',
    attendanceRate: 92,
    gpa: '3.45',
    status: 'Enrolled',
    enrolledDate: '01.09.2025'
  },
  {
    id: 'std-4',
    studentId: 'ST-2026-084',
    name: 'Evelyn Wood',
    grade: 'Grade 11',
    section: 'Section Alpha',
    guardianName: 'Sarah Wood',
    guardianEmail: 's.wood@design.co',
    guardianPhone: '+1 (555) 782-9011',
    attendanceRate: 96,
    gpa: '3.78',
    status: 'Enrolled',
    enrolledDate: '01.09.2024'
  },
  {
    id: 'std-5',
    studentId: 'ST-2026-085',
    name: 'Felix Moreau',
    grade: 'Grade 10',
    section: 'Section Gamma',
    guardianName: 'Jean Moreau',
    guardianEmail: 'j.moreau@consulate.fr',
    guardianPhone: '+1 (555) 612-8877',
    attendanceRate: 88,
    gpa: '3.15',
    status: 'Probation',
    enrolledDate: '01.09.2025'
  },
  {
    id: 'std-6',
    studentId: 'ST-2026-086',
    name: 'Gwendolyn Harper',
    grade: 'Grade 12',
    section: 'Section Honors',
    guardianName: 'Thomas Harper',
    guardianEmail: 't.harper@press.org',
    guardianPhone: '+1 (555) 321-7654',
    attendanceRate: 97,
    gpa: '3.89',
    status: 'Enrolled',
    enrolledDate: '01.09.2023'
  }
];

export const initialClasses: ClassInfo[] = [
  {
    id: 'cls-1',
    code: 'ENG-101',
    name: 'Classical English & Rhetoric',
    department: 'Literature',
    teacherName: 'Dr. Arthur Sterling',
    room: 'Hall B, Rm 204',
    schedule: 'Mon / Wed / Fri • 08:30 - 10:00',
    enrolled: 28,
    capacity: 30,
    semester: 'Fall 2026'
  },
  {
    id: 'cls-2',
    code: 'MATH-201',
    name: 'Advanced Differential Calculus',
    department: 'Mathematics',
    teacherName: 'Prof. Eleanor Vance',
    room: 'Science Wing, Rm 112',
    schedule: 'Tue / Thu • 10:15 - 12:15',
    enrolled: 24,
    capacity: 25,
    semester: 'Fall 2026'
  },
  {
    id: 'cls-3',
    code: 'PHYS-101',
    name: 'Principles of Classical Mechanics',
    department: 'Sciences',
    teacherName: 'Marcus Holloway',
    room: 'Lab Complex 3',
    schedule: 'Mon / Wed • 13:00 - 15:00',
    enrolled: 20,
    capacity: 22,
    semester: 'Fall 2026'
  },
  {
    id: 'cls-4',
    code: 'ARCH-110',
    name: 'Monolithic & Modernist Architecture',
    department: 'Arts',
    teacherName: 'Clara Beaumont',
    room: 'Studio Hall 4',
    schedule: 'Friday • 13:30 - 17:00',
    enrolled: 18,
    capacity: 20,
    semester: 'Fall 2026'
  },
  {
    id: 'cls-5',
    code: 'HIST-105',
    name: 'Post-Industrial World History',
    department: 'Social Sciences',
    teacherName: 'Julian Thorne',
    room: 'Tower Rm 302',
    schedule: 'Tue / Thu • 14:00 - 15:30',
    enrolled: 29,
    capacity: 30,
    semester: 'Fall 2026'
  }
];
