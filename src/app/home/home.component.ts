import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-container">
      <h1>مرحبًا بك في الصفحة الرئيسية 🎉</h1>
      <button pButton label="تسجيل الخروج" (click)="logout()"></button>
    </div>
  `,
  styles: [
    `.home-container {
      text-align: center;
      margin-top: 50px;
    }
    button {
      margin-top: 20px;
    }`
  ]
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
    window.location.href = '/login'; // إعادة التوجيه لصفحة تسجيل الدخول
  }
}
