import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/users`, { name, email, password });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password }, {
      withCredentials: true
    });
  }

  logout() {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, {
      withCredentials: true
    });
  }

  getProfile() {
    return this.http.get(`${this.apiUrl}/auth/profile`, {
      withCredentials: true
    });
  }
}