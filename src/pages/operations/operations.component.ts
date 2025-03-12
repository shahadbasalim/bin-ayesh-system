import { Component, OnInit } from '@angular/core';
// components and services
import { TableComponent } from '../../app//shared/table/table.component';
import { LogService } from '../../app/shared/services/log/log.service';
// Angular Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-operations',
  imports: [MatTableModule, TableComponent],
  templateUrl: './operations.component.html',
})
export class OperationsComponent implements OnInit {
  logs: any[] = []; // هنا نخزن البيانات
  
  // نرسل من خلالها أعمدة الجدول
  columns = [
    { key: 'userId', label: 'ID المستخدم' },
    { key: 'user', label: 'المستخدم' },
    { key: 'date', label: 'التاريخ والوقت' },
    { key: 'page', label: 'شاشة العملية' },
    { key: 'operation', label: 'العملية' },
    { key: 'id', label: 'ID العملية' },
  ];
  dataSource = new MatTableDataSource<any>(this.logs);

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.logService.logs$.subscribe((logs) => {
      this.logs = logs;
      this.dataSource.data = this.logs; // تحديث البيانات في الجدول
    });
  }
}
