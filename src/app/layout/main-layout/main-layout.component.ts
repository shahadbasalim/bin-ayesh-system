import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
})
export class MainLayoutComponent {}
