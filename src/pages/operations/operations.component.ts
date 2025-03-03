import { Component, OnInit } from '@angular/core';
import { LogService } from '../../app/services/log/log.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableComponent } from '../../app//shared/table/table.component'; 

@Component({
  selector: 'app-operations',
  imports: [MatTableModule, TableComponent],
  templateUrl: './operations.component.html',
})
export class OperationsComponent implements OnInit {
  logs: any[] = [];
  // نرسل من خلالها أعمدة الجدول
  columns = [
    { key: 'id', label: 'ID العملية' },
    { key: 'operation', label: 'العملية' },
    { key: 'page', label: 'صفحة العملية' },
    { key: 'date', label: 'التاريخ والوقت' },
  ];
  dataSource = new MatTableDataSource<any>(this.logs);

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.logService.logs$.subscribe((logs) => {
      this.logs = logs;
      this.dataSource.data = this.logs; // تحديث البيانات في dataSource
    });
  }
}
