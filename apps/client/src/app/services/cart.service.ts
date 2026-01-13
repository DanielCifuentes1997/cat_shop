import { Injectable, computed, signal } from '@angular/core';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  count = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));

  subtotal = computed(() => this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0));

  items = this.cartItems.asReadonly();

  addToCart(product: any) {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.id === product.id);

      if (existingItem) {
        return items.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }

      return [...items, {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        imageUrl: product.imageUrl,
        quantity: 1
      }];
    });
  }

  decreaseQuantity(productId: string) {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.id === productId);

      if (existingItem && existingItem.quantity > 1) {
        return items.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      }

      return items.filter(item => item.id !== productId);
    });
  }

  removeFromCart(productId: string) {
    this.cartItems.update(items => items.filter(item => item.id !== productId));
  }
  
  clearCart() {
    this.cartItems.set([]);
  }
}