import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Employees } from '../interface/employees.model';

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employees | null = null;

  employeeFields: { label: string; key: keyof Employees }[] = [
    { label: 'رقم الهوية/الإقامة', key: 'idNumber' },
    { label: 'الاسم', key: 'name' },
    { label: 'رقم الهاتف', key: 'phone' },
    { label: 'رقم الحدود', key: 'border' },
    { label: 'الجنس', key: 'gender' },
    { label: 'تاريخ الميلاد', key: 'birthday' },
    { label: 'رقم الكفيل', key: 'sponsorNumber' },
    { label: 'المهنة', key: 'job' },
    { label: 'حالة الموظف', key: 'status' },
    { label: 'الجنسية', key: 'nationality' },
    { label: 'رقم الجواز', key: 'passportNumber' },
    { label: 'تاريخ انتهاء الجواز', key: 'passportExpiryDate' },
    { label: 'الفرع الحالي للعمل', key: 'branch' },
    { label: 'اسم البنك', key: 'bank' },
    { label: 'الايبان', key: 'iban' },
    { label: 'البريد الالكتروني', key: 'email' },
    { label: 'رقم تواصل آخر', key: 'additionalPhone' },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const idNumber = this.route.snapshot.paramMap.get('id');
    if (idNumber) {
      const storedData = localStorage.getItem('employees');
      if (storedData) {
        const employees: Employees[] = JSON.parse(storedData);
        this.employee = employees.find((e) => e.idNumber === idNumber) || null;
      }
    }
  }

  @ViewChild('pdfContent') pdfContent!: ElementRef;

  downloadPDF() {
    const content = this.pdfContent.nativeElement;

    // اخفي الزر قبل ما اصور الشاشة
    const noPrintElements: NodeListOf<HTMLElement> =
      content.querySelectorAll('.no-print');
    noPrintElements.forEach((el: HTMLElement) => (el.style.display = 'none'));

    html2canvas(content, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // تحديد حجم A4

        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);
        pdf.save('employee-details.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      })
      .finally(() => {
        // يرجع يظهر الازرار بعد ما يصور الشاشة
        noPrintElements.forEach((el: HTMLElement) => (el.style.display = ''));
      });
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}
