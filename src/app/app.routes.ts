import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from '../pages/main-login/login/login.component';
import { ForgotPasswordComponent } from '../pages/main-login/forgot-password/forgot-password.component';
//
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { UsersComponent } from '../pages/users/users.component';
import { EmployeesComponent } from '../pages/employees/employees.component';
import { EmployeeDetailsComponent } from '../pages/employees/employee-details/employee-details.component';
import { OperationsComponent } from '../pages/operations/operations.component';
// 
import { NotFoundPageComponent } from '../pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ],
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'employee-details/:id', component: EmployeeDetailsComponent },
      { path: 'operations', component: OperationsComponent },
    ],
  },

  { path: '**', component: NotFoundPageComponent },
];
