import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Product } from '../interfaces/product.interface';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  register(name: string, email: string, password: string) {
    return this.http.post<User>(`${this.apiUrl}/users`, { name, email, password });
  }

  login(email: string, password: string) {
    return this.http.post<{ user: User }>(`${this.apiUrl}/auth/login`, { email, password }, {
      withCredentials: true
    }).pipe(
      switchMap(() => this.getProfile())
    );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => this.currentUserSubject.next(null))
    );
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/auth/profile`, {
      withCredentials: true
    }).pipe(
      tap((user) => this.currentUserSubject.next(user))
    );
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  createProduct(product: any) {
    return this.http.post<Product>(`${this.apiUrl}/products`, product, {
      withCredentials: true
    });
  }

  updateProduct(id: string, product: any) {
    return this.http.patch<Product>(`${this.apiUrl}/products/${id}`, product, {
      withCredentials: true
    });
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/products/${id}`, {
      withCredentials: true
    });
  }

  createOrder(orderData: any) {
    return this.http.post(`${this.apiUrl}/orders`, orderData, {
      withCredentials: true
    });
  }

  getOrders() {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`, {
      withCredentials: true
    });
  }

  updateOrderStatus(id: string, status: string) {
    return this.http.patch(`${this.apiUrl}/orders/${id}/status`, { status }, {
      withCredentials: true
    });
  }
}