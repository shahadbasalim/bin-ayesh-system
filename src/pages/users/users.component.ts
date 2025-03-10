import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../app/shared/table/table.component';
import { DialogComponent } from '../../app/shared/dialog/dialog.component';
//
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
//
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { LogService } from '../../app/core/services/log/log.service';

interface User {
  name: string;
  email: string;
  phone: string;
  role: string;
}

@Component({
  selector: 'app-users',
  imports: [TableComponent, MatIconModule],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  // ارسال اعمدة الجدول
  userColumns = [
    { key: 'name', label: 'الاسم' },
    { key: 'email', label: 'البريد الإلكتروني' },
    { key: 'phone', label: 'رقم الهاتف' },
    { key: 'role', label: 'الصلاحية' },
  ];

  users: User[] = [];
  dataSource = new MatTableDataSource<User>(this.users);

  ngOnInit(): void {
    this.loadUsersFromLocalStorage();
  }

  loadUsersFromLocalStorage() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      this.dataSource.data = this.users;
    }
  }

  saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  constructor(private dialog: MatDialog, private logService: LogService) {}


  openAddUserDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '400px',
      data: {
        title: 'إضافة مستخدم',
        fields: [
          { key: 'id', label: 'ID المستخدم', type: 'text', required: true },
          { key: 'name', label: 'الاسم', type: 'text', required: true },
          { key: 'email', label: 'البريد الإلكتروني', type: 'text', required: true },
          { key: 'password', label: 'كلمة المرور', type: 'text', required: true },
          { key: 'phone', label: 'رقم الهاتف', type: 'text', required: true },
          { key: 'role', label: 'الصلاحية', type: 'dropdown', required: true, options: ['ادارة', 'موظف'] },
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newUser = { ...result };
        this.users.push(newUser);
        this.dataSource.data = [...this.users];
        this.saveUsersToLocalStorage();
         //  تسجيل العملية مع اسم الصفحة
      this.logService.addLog('إضافة مستخدم', 'المستخدمين');
      }
    });
  }

  openDeleteDialog(user: User) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: {
        message: `هل انت متأكد من حذف المستخدم؟`,
        confirmButtonLabel: 'نعم',
        cancelButtonLabel: 'إلغاء',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.users = this.users.filter((u) => u !== user);
        this.dataSource.data = [...this.users];
        this.saveUsersToLocalStorage();
        //  تسجيل العملية مع اسم الصفحة
      this.logService.addLog('حذف مستخدم', 'المستخدمون');
      }
    });
  }
}
