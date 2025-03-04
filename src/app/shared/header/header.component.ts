import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  navLinks = [
    { path: '/users', icon: 'group', label: 'المستخدمين' },
    { path: '/employees', icon: 'badge', label: 'الموظفين' },
    { path: '/operations', icon: 'timeline', label: 'حركة العمليات' },
    { path: '/login', icon: 'logout', label: 'تسجيل الخروج' },
  ];

  isNavOpen = false;
  // يخزن المسار الحالي للصفحة النشطة
  activeRoute = '/';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
    });
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  getArrowIcon() {
    return this.isNavOpen
      ? 'keyboard_double_arrow_right'
      : 'keyboard_double_arrow_left';
  }
}
