import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private readonly cartService = inject(CartService);

  items = this.cartService.items;
  subtotal = this.cartService.subtotal;

  increase(item: any) {
    this.cartService.addToCart(item);
  }

  decrease(id: string) {
    this.cartService.decreaseQuantity(id);
  }

  remove(id: string) {
    this.cartService.removeFromCart(id);
  }
}