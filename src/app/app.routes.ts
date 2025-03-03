import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/main-login/login/login.component';
import { ForgotPasswordComponent } from '../pages/main-login/forgot-password/forgot-password.component';
import { UsersComponent } from '../pages/users/users.component';
import { EmployeesComponent } from '../pages/employees/employees.component';
import { EmployeeDetailsComponent } from '../pages/employees/employee-details/employee-details.component';

import { OperationsComponent } from '../pages/operations/operations.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'users', component: UsersComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee-details/:id', component: EmployeeDetailsComponent },
  { path: 'operations', component: OperationsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
