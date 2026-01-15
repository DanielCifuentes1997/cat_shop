import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private apiService = inject(ApiService);
  private router = inject(Router);

  items = this.cartService.items;
  subtotal = this.cartService.subtotal;
  itemCount = this.cartService.count;

  checkoutForm = this.fb.group({
    department: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
  });

  formValues = toSignal(this.checkoutForm.valueChanges, { initialValue: { city: '', department: '' } });

  shippingCost = computed(() => {
    const count = this.itemCount();
    if (count >= 3) return 0;

    const city = (this.formValues().city || '').toLowerCase().trim();
    const dept = (this.formValues().department || '').toLowerCase().trim();

    if (city === 'armenia') return 0;
    if (dept === 'quindio' || dept === 'quindío') return 10000;
    return 18000;
  });

  total = computed(() => this.subtotal() + this.shippingCost());

  submitOrder() {
    if (this.checkoutForm.invalid) return;

    const orderData = {
      items: this.items().map(i => ({ productId: i.id, quantity: i.quantity })),
      shippingDetails: this.checkoutForm.value
    };

    this.apiService.createOrder(orderData).subscribe({
      next: () => {
        this.cartService.clearCart();
        alert('Pedido realizado con éxito');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear el pedido');
      }
    });
  }
}