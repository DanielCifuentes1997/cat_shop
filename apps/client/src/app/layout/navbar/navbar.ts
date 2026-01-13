import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private cartService = inject(CartService);

  currentUser: any = null;
  cartCount = this.cartService.count;

  ngOnInit() {
    this.apiService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.apiService.getProfile().subscribe({
      error: () => this.currentUser = null
    });
  }

  logout() {
    this.apiService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}