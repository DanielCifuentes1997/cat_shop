import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly apiService = inject(ApiService);
  private readonly cartService = inject(CartService);

  products$ = this.apiService.getProducts();
  showToast = false;

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}