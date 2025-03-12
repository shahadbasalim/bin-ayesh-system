// ارسال اعمدة الجدول
export const USER_COLUMNS = [
  { key: 'name', label: 'الاسم' },
  { key: 'email', label: 'البريد الإلكتروني' },
  { key: 'phone', label: 'رقم الهاتف' },
  { key: 'role', label: 'الصلاحية' },
];

// ارسال حقول dialog
export const USER_FIELDS = [
  { key: 'id', label: 'ID المستخدم', type: 'text', required: true },
  { key: 'name', label: 'الاسم', type: 'text', required: true },
  { key: 'email', label: 'البريد الإلكتروني', type: 'text', required: true },
  { key: 'password', label: 'كلمة المرور', type: 'text', required: true },
  { key: 'phone', label: 'رقم الهاتف', type: 'text', required: true },
  { key: 'role', label: 'الصلاحية', type: 'dropdown', required: true, options: ['ادارة', 'موظف'] },
];
