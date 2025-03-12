// بنرسل اعمدة الجدول
export const EMPLOYEES_COLUMNS = [
  { key: 'name', label: 'الاسم' },
  { key: 'nationality', label: 'الجنسية' },
  { key: 'status', label: 'حالة الموظف' },
  { key: 'branch', label: 'الفرع' },
  { key: 'idNumber', label: 'رقم الهوية/الإقامة' },
  { key: 'phone', label: 'رقم الهاتف' },
];

// بنرسل حقول dialog
export const EMPLOYEE_FIELDS = [
  {
    key: 'idNumber',
    label: 'رقم الهوية/الإقامة',
    type: 'text',
    required: true,
  },
  { key: 'name', label: 'الاسم', type: 'text', required: true },
  { key: 'phone', label: 'رقم الهاتف', type: 'text', required: true },
  { key: 'border', label: 'رقم الحدود', type: 'text', required: false },
  {
    key: 'gender',
    label: 'الجنس',
    type: 'dropdown',
    required: false,
    options: ['ذكر', 'أنثى'],
  },
  { key: 'birthday', label: 'تاريخ الميلاد', type: 'date', required: true },
  {
    key: 'sponsorNumber',
    label: 'رقم الكفيل',
    type: 'dropdown',
    required: true,
    options: ['70009800'],
  },
  {
    key: 'job',
    label: 'المهنة',
    type: 'dropdown',
    required: true,
    options: ['محاسب'],
  },
  {
    key: 'status',
    label: 'حالة الموظف',
    type: 'dropdown',
    required: true,
    options: ['على رأس العمل', 'موقوف', 'خروج نهائي'],
  },
  {
    key: 'nationality',
    label: 'الجنسية',
    type: 'dropdown',
    required: true,
    options: ['سعودي', 'مصري'],
  },
  {
    key: 'passportNumber',
    label: 'رقم الجواز',
    type: 'text',
    required: false,
  },
  {
    key: 'passportExpiryDate',
    label: 'تاريخ انتهاء الجواز',
    type: 'date',
    required: false,
  },
  {
    key: 'branch',
    label: 'الفرع الحالي للعمل',
    type: 'dropdown',
    required: true,
    options: ['الطائف'],
  },
  {
    key: 'bank',
    label: 'اسم البنك',
    type: 'dropdown',
    required: false,
    options: ['الاهلي', 'البلاد', 'الراجحي'],
  },
  { key: 'iban', label: 'الايبان', type: 'text', required: false },
  { key: 'email', label: 'البريد الالكتروني', type: 'text', required: false },
  {
    key: 'additionalPhone',
    label: 'رقم تواصل آخر',
    type: 'text',
    required: false,
  },
  //  حقول الملفات
  {
    key: 'iqamaImage',
    label: 'صورة الإقامة',
    type: 'file',
    required: false,
  },
  {
    key: 'profileImage',
    label: 'صورة شخصية',
    type: 'file',
    required: false,
  },
  {
    key: 'driverCard',
    label: 'بطاقة سائق',
    type: 'file',
    required: false,
  },
  {
    key: 'engineeringMembership',
    label: 'عضوية هيئة المهندسين',
    type: 'file',
    required: false,
  },
  {
    key: 'certificates',
    label: 'الشهادات (إن وجدت)',
    type: 'file',
    required: false,
  },
  {
    key: 'license',
    label: 'الرخصة',
    type: 'file',
    required: false,
  },
];
