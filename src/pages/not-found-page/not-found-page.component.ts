import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {
  constructor(private router: Router) {}
  goHome() {
    this.router.navigate(['/login']);
  }
}
