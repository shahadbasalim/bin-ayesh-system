import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../app/shared/table/table.component';
import { Router } from '@angular/router';
//
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
//
import { DialogComponent } from '../../app/shared/dialog/dialog.component';
import { LogService } from '../../app/core/services/log/log.service';

export interface Employees {
  idNumber: string;
  name: string;
  phone: string;
  border?: string;
  gender?: string;
  birthday: string;
  sponsorNumber: string;
  job: string;
  status: string;
  nationality: string;
  passportNumber?: string;
  passportExpiryDate?: string;
  branch: string;
  bank?: string;
  iban?: string;
  email?: string;
  additionalPhone?: string;
}

@Component({
  selector: 'app-employees',
  imports: [TableComponent, MatIconModule],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {
  // نرسل من خلالها أعمدة الجدول
  employeesColumns = [
    { key: 'name', label: 'الاسم' },
    { key: 'nationality', label: 'الجنسية' },
    { key: 'status', label: 'حالة الموظف' },
    { key: 'branch', label: 'الفرع' },
    { key: 'idNumber', label: 'رقم الهوية/الإقامة' },
    { key: 'phone', label: 'رقم الهاتف' },
  ];

  employees: Employees[] = [];

  dataSource = new MatTableDataSource<Employees>(this.employees);

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private logService: LogService
  ) {}
  onViewEmployeePage(employee: Employees) {
    this.router.navigate(['/employee-details', employee.idNumber]);
  }

  ngOnInit() {
    this.loadEmployeesFromLocalStorage();
  }

  loadEmployeesFromLocalStorage() {
    const storedData = localStorage.getItem('employees');
    if (storedData) {
      this.employees = JSON.parse(storedData);
      this.dataSource.data = [...this.employees];
    }
  }

  saveEmployeesToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  // تعريف الحقول العامة
  employeeFields = [
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

  openAddEmployeeDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '400px',
      data: {
        title: 'إضافة موظف',
        fields: [...this.employeeFields],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newEmployee = { ...result };
        this.employees.push(newEmployee);
        this.dataSource.data = [...this.employees];
        this.saveEmployeesToLocalStorage();

        // تسجيل العملية مع اسم الصفحة
        this.logService.addLog('اضافة موظف', ' الموظفين');
      }
    });
  }

  onEditEmployee(employee: Employees) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '400px',
      data: {
        title: 'تعديل بيانات الموظف',
        fields: [...this.employeeFields],
        values: employee, // ذي تختص في حال جيت بعدل على حقل بحيث اني مررت له القيم
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // // البحث عن الموظف في المصفوفة الاصلية برقم الهوية
        const index = this.employees.findIndex(
          (e) => e.idNumber === employee.idNumber
        );
        if (index !== -1) {
          this.employees[index] = { ...employee, ...result };
          this.dataSource.data = [...this.employees];
          this.saveEmployeesToLocalStorage();

          // تسجيل العملية مع اسم الصفحة
          this.logService.addLog('تعديل موظف', ' الموظفين');
        }
      }
    });
  }

  onViewEmployee(employee: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '400px',
      data: {
        title: 'عرض البيانات',
        mode: 'view',
        fields: this.employeeFields.map((field) => ({
          ...field,
          disabled: true,
        })), // تعطيل جميع الحقول
        values: employee, // تمرير البيانات الحالية للموظف
      },
    });

    // تسجيل العملية مع اسم الصفحة
    this.logService.addLog('استعراض موظف', ' الموظفين');
  }
}
