import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-shop-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    <div style="display: flex; flex-direction: column; min-height: 100vh;">
      <app-navbar></app-navbar>

      <main style="flex: 1; padding: 20px;">
        <router-outlet></router-outlet>
      </main>

      <app-footer></app-footer>
    </div>
  `
})
export class ShopLayout {}