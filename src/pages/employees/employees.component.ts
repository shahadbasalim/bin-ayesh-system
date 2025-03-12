import { Component, OnInit } from '@angular/core';
// components
import { TableComponent } from '../../app/shared/table/table.component';
import { DialogComponent } from '../../app/shared/dialog/dialog.component';
// angular material
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
// model and service
import { Employees } from './interface/employees.model';
import { EmployeesService } from './services/employees.service';
import {
  EMPLOYEES_COLUMNS,
  EMPLOYEE_FIELDS,
} from './constant/employees.constants';
import { LogService } from '../../app/shared/services/log/log.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  imports: [TableComponent],
})
export class EmployeesComponent implements OnInit {
  employeesColumns = EMPLOYEES_COLUMNS;
  employeeFields = EMPLOYEE_FIELDS;
  dataSource = new MatTableDataSource<Employees>([]);

  constructor(
    private dialog: MatDialog,
    private employeesService: EmployeesService,
    private logService: LogService
  ) {}

  ngOnInit() {
    this.employeesService.loadEmployeesFromLocalStorage();
    this.dataSource.data = this.employeesService.getEmployees();
  }

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
        this.employeesService.addEmployee(result);
        this.dataSource.data = this.employeesService.getEmployees();
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
        values: employee,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeesService.updateEmployee({ ...employee, ...result }); //Spread Operator
        this.dataSource.data = this.employeesService.getEmployees();
        this.logService.addLog('تعديل موظف', ' الموظفين');
      }
    });
  }

  onViewEmployee(employee: Employees) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '400px',
      data: {
        title: 'عرض البيانات',
        mode: 'view',
        fields: this.employeeFields.map((field) => ({
          ...field, //Spread Operator
          disabled: true,
        })),
        values: employee,
      },
    });

    this.logService.addLog('استعراض موظف', ' الموظفين');
  }
}
