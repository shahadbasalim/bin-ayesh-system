import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// Angular Material
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  navLinks = [
    { path: '/users', icon: 'group', label: 'المستخدمين', role: 'ادارة' },
    { path: '/employees', icon: 'badge', label: 'الموظفين', role: 'all' },
    { path: '/operations', icon: 'timeline', label: 'حركة العمليات', role: 'ادارة' },
    { path: '/login', icon: 'logout', label: 'تسجيل الخروج', role: 'all' },
  ];

  loggedInUser: any = null;
  isNavOpen = false;
  // يخزن المسار الحالي للصفحة النشطة
  activeRoute = '/';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
    });
    this.loadLoggedInUser();
  }

  loadLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
    }
  }

  getFilteredNavLinks() {
    if (!this.loggedInUser) return [];
    return this.navLinks.filter(link => link.role === 'all' || link.role === this.loggedInUser.role);
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
