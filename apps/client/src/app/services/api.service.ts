import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/users`, { name, email, password });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password }, {
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
    return this.http.get(`${this.apiUrl}/auth/profile`, {
      withCredentials: true
    }).pipe(
      tap((user: any) => this.currentUserSubject.next(user))
    );
  }

  getProducts() {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }
}