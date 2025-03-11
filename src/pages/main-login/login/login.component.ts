import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    // اذا كان الفورمinvalid  ماراح يكمل العملية
    if (this.loginForm.invalid) return;

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // التحقق من المستخدم الأساسي (ادارة)
    if (email === 'admin@gmail.com' && password === 'securepassword') {
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({ email, role: 'ادارة', name: 'ادمن', id: 1 })
      );
      this.router.navigate(['/users']);
      return;
    }

    // جلب المستخدمين من localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);

      // البحث عن مستخدم مطابق
      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (user) {
        // حفظ بيانات المستخدم المسجّل
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ email, role: user.role, name: user.name, id: user.id })
        );

        // التوجيه حسب الصلاحية
        if (user.role === 'ادارة') {
          this.router.navigate(['/users']); // صلاحية كاملة
        } else {
          this.router.navigate(['/employees']); // السماح فقط بصفحة الموظفين
        }
        return;
      }
    }

    // في حال لم يتم العثور على مستخدم صالح
    this.errorMessage = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
  }


  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
