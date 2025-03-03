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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
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

    // اذا كان الفورم صالح على ذي البيانات بيكمل العملية
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (email === 'admin@gmail.com' && password === 'securepassword') {
      this.router.navigate(['/users']);
    } else {
      this.errorMessage = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
    }
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
