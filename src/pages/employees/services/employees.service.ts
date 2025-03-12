import { Injectable } from '@angular/core';
import { Employees } from '../interface/employees.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  // interface
  private employees: Employees[] = [];

  getEmployees(): Employees[] {
    return this.employees;
  }

  loadEmployeesFromLocalStorage(): void {
    const storedData = localStorage.getItem('employees');
    if (storedData) {
      this.employees = JSON.parse(storedData);
    } else {
      console.log('no employees');

    }
  }

  saveEmployeesToLocalStorage(): void {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  addEmployee(employee: Employees): void {
    this.employees.push(employee);
    this.saveEmployeesToLocalStorage();
  }

  updateEmployee(employee: Employees): void {
    const index = this.employees.findIndex(
      (e) => e.idNumber === employee.idNumber
    );
    if (index !== -1) {
      this.employees[index] = employee;
      this.saveEmployeesToLocalStorage();
    }
  }
}
