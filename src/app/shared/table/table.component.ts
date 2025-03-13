import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
// service
import { TableService } from './service/table.service';
// Angular Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-table',
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginator,
    MatMenuModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<T> implements AfterViewInit {
  @Input() title!: string;
  @Input() addButtonLabel!: string;
  @Input() showAddButton: boolean = true;

  @Input() columns!: { key: string; label: string }[];
  @Input() dataSource!: MatTableDataSource<T>;

  @Input() hasDeleteAction: boolean = false; // delete column
  @Input() hasDetailsActions: boolean = false; //details column

  @Output() addUser = new EventEmitter<void>(); // ذي بتستخدم لصفحة المستخدمين وكمان للموظفين
  @Output() deleteUser = new EventEmitter<T>();

  @Output() editEmployee = new EventEmitter<T>();
  @Output() viewEmployee = new EventEmitter<T>();

  displayedColumns!: string[];
  userRole: string | null = null;

  constructor(private tableService: TableService) {}

  ngOnInit() {
    // استرجاع صلاحية المستخدم من localStorage
    const loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );
    this.userRole = loggedInUser.role;

    // اعداد اعمدة الجدول واعمده الحذف والتفاصيل
    this.displayedColumns = this.tableService.setDisplayedColumns(
      this.columns,
      this.hasDeleteAction,
      this.hasDetailsActions
    );
  }

  // edit icon
  shouldShowEditButton(): boolean {
    return this.userRole === 'ادارة';
  }

  // Search function
  applyFilter(event: Event) {
    this.tableService.applyFilter(event, this.dataSource);
  }

  // Pagination function
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 5; // تحديد عدد الصفوف في الجدول لكل صفحة
  }
}
