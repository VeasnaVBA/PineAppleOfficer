import { AcademicMetric, Teacher } from '../types';

export const initialTeachers: Teacher[] = [
  {
    id: '1',
    teacherId: 'TCH-001',
    khmerLastName: 'ស៊ុន',
    khmerFirstName: 'វណ្ណា',
    englishLastName: 'Sun',
    englishFirstName: 'Vanna',
    gender: 'Male',
    dob: '1985-05-12',
    status: 'Active'
  },
  {
    id: '2',
    teacherId: 'TCH-002',
    khmerLastName: 'ចាន់',
    khmerFirstName: 'ធីតា',
    englishLastName: 'Chan',
    englishFirstName: 'Thida',
    gender: 'Female',
    dob: '1990-08-23',
    status: 'Active'
  },
  {
    id: '3',
    teacherId: 'TCH-003',
    khmerLastName: 'គឹម',
    khmerFirstName: 'សុខា',
    englishLastName: 'Kim',
    englishFirstName: 'Sokha',
    gender: 'Male',
    dob: '1982-11-04',
    status: 'Active'
  },
  {
    id: '4',
    teacherId: 'TCH-004',
    khmerLastName: 'លី',
    khmerFirstName: 'សុភាព',
    englishLastName: 'Ly',
    englishFirstName: 'Sopheap',
    gender: 'Female',
    dob: '1992-02-18',
    status: 'On Leave'
  },
  {
    id: '5',
    teacherId: 'TCH-005',
    khmerLastName: 'ហេង',
    khmerFirstName: 'វិចិត្រ',
    englishLastName: 'Heng',
    englishFirstName: 'Vicheth',
    gender: 'Male',
    dob: '1988-09-30',
    status: 'Active'
  },
  {
    id: '6',
    teacherId: 'TCH-006',
    khmerLastName: 'សេង',
    khmerFirstName: 'ពិសី',
    englishLastName: 'Seng',
    englishFirstName: 'Pisey',
    gender: 'Female',
    dob: '1994-07-15',
    status: 'Inactive'
  }
];

export const initialAcademicMetrics: AcademicMetric[] = [
  {
    id: 1,
    label: '1.',
    title: 'Pineapple Officer Administrative Portal',
    date: 'Term 2026',
    value: 'System Ready',
    change: 'Operational'
  },
  {
    id: 2,
    label: '2.',
    title: 'Institutional Module Status',
    date: 'All Services',
    value: 'Blank Workspaces',
    change: 'Active'
  },
  {
    id: 3,
    label: '3.',
    title: 'Vercel Edge Cloud Deployment',
    date: 'Connected',
    value: '99.98% Uptime',
    change: 'Sub-30ms'
  }
];
