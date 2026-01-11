import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 50px;">
      <h1>Prueba de Seguridad (Ciclo Completo)</h1>
      
      <button (click)="testRegister()">1. Crear Usuario</button>
      
      <button [disabled]="!lastEmail" (click)="testLogin()" style="margin-left: 10px;">
        2. Login
      </button>

      <button [disabled]="!loginSuccess" (click)="testProfile()" style="margin-left: 10px;">
        3. 🔓 Datos Privados
      </button>

      <button [disabled]="!loginSuccess" (click)="testLogout()" style="margin-left: 10px; background-color: #ffcccc;">
        4. Cerrar Sesión (Logout)
      </button>
      
      <div *ngIf="response">
        <h3>Estado:</h3>
        <pre style="background: #f4f4f4; padding: 10px;">{{ response | json }}</pre>
      </div>

      <div *ngIf="profileData" style="border: 2px solid green; padding: 10px; margin-top: 20px;">
        <h3 style="color: green;">✅ DENTRO DEL SISTEMA</h3>
        <pre>{{ profileData | json }}</pre>
      </div>
    </div>
  `,
})
export class AppComponent {
  private apiService = inject(ApiService);
  response: any = null;
  profileData: any = null;
  loginSuccess: boolean = false;

  lastEmail: string = '';
  lastPassword: string = '';

  testRegister() {
    const randomEmail = `test${Math.floor(Math.random() * 10000)}@gatos.com`;
    const password = 'passwordSeguro123'; 
    
    this.apiService.registerUser(randomEmail, password).subscribe({
      next: (data) => {
        this.response = data;
        this.lastEmail = randomEmail;
        this.lastPassword = password;
        this.loginSuccess = false;
        this.profileData = null;
        alert(`Usuario creado: ${randomEmail}`);
      },
      error: (err) => console.error(err)
    });
  }

  testLogin() {
    if (!this.lastEmail) return;

    this.apiService.login(this.lastEmail, this.lastPassword).subscribe({
      next: (data: any) => {
        this.response = data;
        this.loginSuccess = true;
        this.profileData = null;
        alert('Login OK');
      },
      error: (err) => {
        this.response = err.error;
        this.loginSuccess = false;
        alert('Error Login');
      }
    });
  }

  testProfile() {
    this.apiService.getProfile().subscribe({
      next: (data) => {
        this.profileData = data;
      },
      error: (err) => {
        this.profileData = null;
        alert('Acceso DENEGADO (Cookie inválida o expirada)');
      }
    });
  }

  testLogout() {
    this.apiService.logout().subscribe({
      next: (data) => {
        this.response = data;
        this.loginSuccess = false;
        this.profileData = null;
        alert('Logout Exitoso. Cookie destruida.');
      },
      error: (err) => console.error(err)
    });
  }
}