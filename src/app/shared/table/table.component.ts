import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
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
    MatMenuModule
  ],

  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<T> implements AfterViewInit {
  @Input() title!: string;
  @Input() addButtonLabel!: string ;
  @Input() showAddButton: boolean = true;

  @Input() columns!: { key: string; label: string }[];
  @Input() dataSource!: MatTableDataSource<T>;

  @Input() hasDeleteAction: boolean = false; // عامود للديليت
  @Input() hasDetailsActions: boolean = false; //عامود للديتايلس

  @Output() addUser = new EventEmitter<void>(); // ذي بتستخدم لصفحة المستخدمين وكمان للموظفين
  @Output() deleteUser = new EventEmitter<T>();

  @Output() editEmployee = new EventEmitter<T>();
  @Output() viewEmployee = new EventEmitter<T>();

  displayedColumns!: string[];
  userRole: string | null = null;

  ngOnInit() {
    // استرجاع صلاحية المستخدم من localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userRole = loggedInUser.role;

    // هنا بنمشي على كل عامود في الجدول وفي حال تحقق الشرط راح نضيف العامود الخاص
    this.displayedColumns = [...this.columns.map((col) => col.key)];

    if (this.hasDeleteAction) {
      this.displayedColumns.push('delete-action');
    }

    if (this.hasDetailsActions) {
      this.displayedColumns.push('details-actions');
    }
  }

  // Search function
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Pagination function
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 5; // تحديد عدد الصفوف في الجدول لكل صفحة
  }

  // التحقق من اظهار أيقونة التعديل بناء على صلاحية المستخدم
  shouldShowEditButton(): boolean {
    return this.userRole === 'ادارة';
  }
}
