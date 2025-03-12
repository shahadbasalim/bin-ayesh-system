import { Component, OnInit } from '@angular/core';
// Components
import { TableComponent } from '../../app/shared/table/table.component';
import { DialogComponent } from '../../app/shared/dialog/dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
// Services
import { UsersService } from './services/users.services';
import { LogService } from '../../app/core/services/log/log.service';
// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
// Models and Constants
import { User } from './interface/users.model';
import { USER_COLUMNS, USER_FIELDS } from './constant/users.constant';

@Component({
  selector: 'app-users',
  imports: [TableComponent, MatIconModule],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  userColumns = USER_COLUMNS;
  userFields = USER_FIELDS;
  dataSource = new MatTableDataSource<User>([]);

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private logService: LogService,
  ) {}

  ngOnInit(): void {
    this.usersService.loadUsersFromLocalStorage();
    this.dataSource.data = this.usersService.getUsers();
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '400px',
      data: {
        title: 'إضافة مستخدم',
        fields: this.userFields,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.addUser(result);
        this.dataSource.data = this.usersService.getUsers();
        this.logService.addLog('إضافة مستخدم', 'المستخدمين');
      }
    });
  }

  openDeleteDialog(user: User): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: {
        message: `هل أنت متأكد من حذف المستخدم؟`,
        confirmButtonLabel: 'نعم',
        cancelButtonLabel: 'إلغاء',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.usersService.deleteUser(user);
        this.dataSource.data = this.usersService.getUsers();
        this.logService.addLog('حذف مستخدم', 'المستخدمين');
      }
    });
  }
}
