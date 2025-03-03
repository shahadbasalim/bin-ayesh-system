import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employees } from '../employees.component';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-employee-details',
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employees | null = null;

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
    if (!this.pdfContent) {
      console.error('Error: pdfContent is not initialized yet!');
      return;
    }

    const content = this.pdfContent.nativeElement;

    // اخفي الزر قبل ما اصور الشاشة
    const noPrintElements: NodeListOf<HTMLElement> =
      content.querySelectorAll('.no-print');
    noPrintElements.forEach((el: HTMLElement) => (el.style.display = 'none'));

    html2canvas(content, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
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
