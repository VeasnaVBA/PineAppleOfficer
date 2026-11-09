export type Language = 'en' | 'km';

export interface TranslationDictionary {
  brand: string;
  portal: string;
  socialLinks: string;
  edgeActive: string;
  live: string;
  systemStatus: string;
  allOperational: string;
  readyNotice: string;
  close: string;
  production: string;
  nav: {
    dashboard: string;
    teachers: string;
    students: string;
    classes: string;
    settings: string;
  };
  pages: {
    dashboardTitle: string;
    dashboardSub: string;
    teachersTitle: string;
    teachersSub: string;
    studentsTitle: string;
    studentsSub: string;
    classesTitle: string;
    classesSub: string;
    settingsTitle: string;
    settingsSub: string;
  };
  canvas: {
    canvasSuffix: string;
    desc: (title: string) => string;
    readyBadge: string;
  };
  settings: {
    themeColor: string;
    themeDesc: string;
    fontFamily: string;
    fontDesc: string;
    fontSize: string;
    resetDefaults: string;
    previewTitle: string;
    previewDesc: string;
    language: string;
    languageDesc: string;
  };
  teacher: {
    addTeacher: string;
    editTeacher: string;
    teacherList: string;
    totalTeachers: string;
    searchPlaceholder: string;
    filterStatus: string;
    allStatus: string;
    filterGender: string;
    allGender: string;
    id: string;
    codeInfo: string;
    civilServantId: string;
    teacherId: string;
    optional: string;
    khmerLastName: string;
    khmerFirstName: string;
    englishLastName: string;
    englishFirstName: string;
    khmerFullName: string;
    englishFullName: string;
    gender: string;
    male: string;
    female: string;
    other: string;
    dob: string;
    status: string;
    active: string;
    onLeave: string;
    inactive: string;
    actions: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    confirmDelete: string;
    noTeachersFound: string;
    teacherAddedToast: string;
    teacherUpdatedToast: string;
    teacherDeletedToast: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brand: 'PINEAPPLE OFFICER',
    portal: 'PORTAL',
    socialLinks: 'Social Links',
    edgeActive: 'Vercel Edge',
    live: 'Live',
    systemStatus: 'System Status',
    allOperational: 'All Operational',
    readyNotice: 'Pineapple Officer portal initialized.',
    close: 'Close',
    production: 'Production',
    nav: {
      dashboard: 'Dashboard',
      teachers: 'Teacher Info',
      students: 'Student Info',
      classes: 'Class Info',
      settings: 'Settings'
    },
    pages: {
      dashboardTitle: 'Dashboard Overview',
      dashboardSub: 'Administrative operations & institutional metrics canvas',
      teachersTitle: 'Teacher Info',
      teachersSub: 'Faculty roster, instructor directory, and departmental assignments canvas',
      studentsTitle: 'Student Info',
      studentsSub: 'Student enrollment roster, grade records, and guardian information canvas',
      classesTitle: 'Class Info',
      classesSub: 'Academic course schedule, classrooms, and timetable registry canvas',
      settingsTitle: 'Theme & Typography Settings',
      settingsSub: 'Changes apply instantly to the entire application'
    },
    canvas: {
      canvasSuffix: 'Canvas',
      desc: (title: string) => `This page is empty and ready for your custom ${title.toLowerCase()} components, tables, charts, or forms.`,
      readyBadge: 'Workspace: Ready for implementation'
    },
    settings: {
      themeColor: 'Theme Background Color',
      themeDesc: 'Select an archival paper tint or dark editorial palette for your dashboard:',
      customColor: 'Custom Color Picker',
      customColorDesc: 'Pick any color from the palette to apply across the entire application:',
      fontFamily: 'Application Font Family (Global)',
      fontDesc: 'Click any font to apply it immediately across all headers, sidebar, navigation, and pages:',
      fontSize: 'Interface Font Size',
      resetDefaults: 'Reset Defaults',
      previewTitle: 'Live Real-Time Typography & Theme Preview',
      previewDesc: 'Pineapple Officer administrative portal dynamically applies this font across every navigation item, header, button, and canvas area.',
      language: 'Language Settings',
      languageDesc: 'Switch the application language between English and Khmer (ភាសាខ្មែរ):'
    },
    teacher: {
      addTeacher: 'Add Teacher',
      editTeacher: 'Edit Teacher',
      teacherList: 'Teacher Directory',
      totalTeachers: 'Total Faculty',
      searchPlaceholder: 'Search by Teacher Code, Civil Servant ID, or Name...',
      filterStatus: 'Status',
      allStatus: 'All Statuses',
      filterGender: 'Gender',
      allGender: 'All Genders',
      id: 'ID',
      codeInfo: 'Teacher Code',
      civilServantId: 'Civil Servant ID',
      teacherId: 'Civil Servant ID',
      optional: '(Optional)',
      khmerLastName: 'Khmer Last Name',
      khmerFirstName: 'Khmer First Name',
      englishLastName: 'English Last Name',
      englishFirstName: 'English First Name',
      khmerFullName: 'Khmer Name',
      englishFullName: 'English Name',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      other: 'Other',
      dob: 'Date of Birth',
      status: 'Status',
      active: 'Active',
      onLeave: 'On Leave',
      inactive: 'Inactive',
      actions: 'Actions',
      save: 'Save Teacher',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      confirmDelete: 'Are you sure you want to delete this teacher record?',
      noTeachersFound: 'No teachers found matching your search.',
      teacherAddedToast: 'Teacher registered successfully',
      teacherUpdatedToast: 'Teacher record updated',
      teacherDeletedToast: 'Teacher removed from directory'
    }
  },
  km: {
    brand: 'PINEAPPLE OFFICER',
    portal: 'ច្រកគ្រប់គ្រង',
    socialLinks: 'បណ្តាញសង្គម',
    edgeActive: 'Vercel Edge',
    live: 'ដំណើរការ',
    systemStatus: 'ស្ថានភាពប្រព័ន្ធ',
    allOperational: 'ដំណើរការធម្មតាទាំងអស់',
    readyNotice: 'ប្រព័ន្ធ Pineapple Officer ត្រូវបានចាប់ផ្តើមដំណើរការ។',
    close: 'បិទ',
    production: 'ផលិតកម្ម',
    nav: {
      dashboard: 'ផ្ទាំងគ្រប់គ្រង',
      teachers: 'ព័ត៌មានគ្រូ',
      students: 'ព័ត៌មានសិស្ស',
      classes: 'ព័ត៌មានថ្នាក់',
      settings: 'ការកំណត់'
    },
    pages: {
      dashboardTitle: 'ទិដ្ឋភាពទូទៅនៃផ្ទាំងគ្រប់គ្រង',
      dashboardSub: 'កន្លែងប្រតិបត្តិការរដ្ឋបាល និងរង្វាស់ស្ថាប័ន',
      teachersTitle: 'ព័ត៌មានគ្រូបង្រៀន',
      teachersSub: 'បញ្ជីឈ្មោះសាស្ត្រាចារ្យ និងការចាត់តាំងដេប៉ាតឺម៉ង់',
      studentsTitle: 'ព័ត៌មានសិស្ស',
      studentsSub: 'បញ្ជីឈ្មោះចុះឈ្មោះសិស្ស កំណត់ត្រាពិន្ទុ និងព័ត៌មានអាណាព្យាបាល',
      classesTitle: 'ព័ត៌មានថ្នាក់រៀន',
      classesSub: 'កាលវិភាគវគ្គសិក្សា បន្ទប់រៀន និងតារាងពេលវេលា',
      settingsTitle: 'ការកំណត់រចនាប័ទ្ម និងពុម្ពអក្សរ',
      settingsSub: 'ការផ្លាស់ប្តូរអនុវត្តភ្លាមៗចំពោះកម្មវិធីទាំងមូល'
    },
    canvas: {
      canvasSuffix: 'កន្លែងធ្វើការ',
      desc: (title: string) => `ទំព័រនេះទទេ ហើយរួចរាល់សម្រាប់សមាសធាតុ តារាង គំនូសតាង ឬទម្រង់ផ្ទាល់ខ្លួនរបស់អ្នក។`,
      readyBadge: 'កន្លែងធ្វើការ៖ រួចរាល់សម្រាប់ការអនុវត្ត'
    },
    settings: {
      themeColor: 'ពណ៌ផ្ទៃខាងក្រោយរចនាប័ទ្ម',
      themeDesc: 'ជ្រើសរើសពណ៌ក្រដាសបូរាណ ឬរចនាប័ទ្មងងឹតសម្រាប់ផ្ទាំងគ្រប់គ្រងរបស់អ្នក៖',
      customColor: 'ឧបករណ៍ជ្រើសរើសពណ៌ផ្ទាល់ខ្លួន',
      customColorDesc: 'ជ្រើសរើសពណ៌ណាមួយដើម្បីអនុវត្តលើផ្ទាំងគ្រប់គ្រងទាំងមូល៖',
      fontFamily: 'ពុម្ពអក្សរកម្មវិធី (សកល)',
      fontDesc: 'ចុចលើពុម្ពអក្សរណាមួយដើម្បីអនុវត្តវាភ្លាមៗលើចំណងជើង របារចំហៀង និងទំព័រទាំងអស់៖',
      fontSize: 'ទំហំពុម្ពអក្សរចំណុចប្រទាក់',
      resetDefaults: 'កំណត់ឡើងវិញ',
      previewTitle: 'ការមើលសាកល្បងពុម្ពអក្សរ និងរចនាប័ទ្មផ្ទាល់',
      previewDesc: 'ច្រកគ្រប់គ្រង Pineapple Officer អនុវត្តពុម្ពអក្សរនេះដោយស្វ័យប្រវត្តិចំពោះគ្រប់ធាតុរុករក ចំណងជើង និងកន្លែងធ្វើការ។',
      language: 'ការកំណត់ភាសា',
      languageDesc: 'ផ្លាស់ប្តូរភាសាកម្មវិធីរវាងភាសាអង់គ្លេស និងភាសាខ្មែរ៖'
    },
    teacher: {
      addTeacher: 'បន្ថែមគ្រូបង្រៀន',
      editTeacher: 'កែសម្រួលព័ត៌មានគ្រូ',
      teacherList: 'បញ្ជីឈ្មោះគ្រូបង្រៀន',
      totalTeachers: 'ចំនួនគ្រូសរុប',
      searchPlaceholder: 'ស្វែងរកតាមកូដគ្រូ អត្តលេខមន្ត្រីរាជការ ឬឈ្មោះ...',
      filterStatus: 'ស្ថានភាព',
      allStatus: 'ស្ថានភាពទាំងអស់',
      filterGender: 'ភេទ',
      allGender: 'ភេទទាំងអស់',
      id: 'ល.រ',
      codeInfo: 'កូដគ្រូ',
      civilServantId: 'អត្តលេខមន្រ្តីរាជការ',
      teacherId: 'អត្តលេខមន្រ្តីរាជការ',
      optional: '(មិនទាមទារ)',
      khmerLastName: 'នាមត្រកូល (ខ្មែរ)',
      khmerFirstName: 'នាមខ្លួន (ខ្មែរ)',
      englishLastName: 'នាមត្រកូល (អង់គ្លេស)',
      englishFirstName: 'នាមខ្លួន (អង់គ្លេស)',
      khmerFullName: 'ឈ្មោះខ្មែរ',
      englishFullName: 'ឈ្មោះអង់គ្លេស',
      gender: 'ភេទ',
      male: 'ប្រុស',
      female: 'ស្រី',
      other: 'ផ្សេងៗ',
      dob: 'ថ្ងៃខែឆ្នាំកំណើត',
      status: 'ស្ថានភាព',
      active: 'សកម្ម',
      onLeave: 'ឈប់សម្រាក',
      inactive: 'អសកម្ម',
      actions: 'សកម្មភាព',
      save: 'រក្សាទុកទិន្នន័យ',
      cancel: 'បោះបង់',
      delete: 'លុប',
      edit: 'កែប្រែ',
      confirmDelete: 'តើអ្នកពិតជាចង់លុបទិន្នន័យគ្រូបង្រៀននេះមែនទេ?',
      noTeachersFound: 'រកមិនឃើញទិន្នន័យគ្រូបង្រៀនដែលត្រូវនឹងការស្វែងរកឡើយ។',
      teacherAddedToast: 'បានបញ្ចូលគ្រូបង្រៀនថ្មីដោយជោគជ័យ',
      teacherUpdatedToast: 'បានកែប្រែព័ត៌មានគ្រូបង្រៀនដោយជោគជ័យ',
      teacherDeletedToast: 'បានលុបគ្រូបង្រៀនចេញពីបញ្ជី'
    }
  }
};
