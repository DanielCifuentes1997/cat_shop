import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Product } from '../interfaces/product.interface';

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

  createOrder(orderData: any) {
    return this.http.post(`${this.apiUrl}/orders`, orderData, {
      withCredentials: true
    });
  }
}