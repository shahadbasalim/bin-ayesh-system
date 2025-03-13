import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  // هنا بنمشي على كل عامود في الجدول وفي حال تحقق الشرط راح نضيف العامود الخاص
  setDisplayedColumns(
    columns: { key: string; label: string }[],
    hasDeleteAction: boolean,
    hasDetailsActions: boolean
  ): string[] {
    let displayedColumns = columns.map((col) => col.key);

    if (hasDeleteAction) {
      displayedColumns.push('delete-action');
    }

    if (hasDetailsActions) {
      displayedColumns.push('details-actions');
    }

    return displayedColumns;
  }

  // Search function
  applyFilter(event: Event, dataSource: MatTableDataSource<any>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();
  }
}
