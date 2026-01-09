import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 50px;">
      <h1>Prueba de Seguridad (Auth)</h1>
      
      <button (click)="testRegister()">1. Crear Usuario Random</button>
      
      <button [disabled]="!lastEmail" (click)="testLogin()" style="margin-left: 10px;">
        2. Probar Login {{ lastEmail ? 'con ' + lastEmail : '(Crea un usuario primero)' }}
      </button>
      
      <div *ngIf="response">
        <h3>Última Respuesta del Backend:</h3>
        <pre style="background: #f4f4f4; padding: 10px;">{{ response | json }}</pre>
      </div>

      <div *ngIf="token">
        <h3 style="color: green;">¡TOKEN RECIBIDO! (Llave de acceso):</h3>
        <code style="word-break: break-all;">{{ token }}</code>
      </div>
    </div>
  `,
})
export class AppComponent {
  private apiService = inject(ApiService);
  response: any = null;
  token: string = '';

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
        this.token = '';
        
        alert(`Usuario creado: ${randomEmail}`);
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear usuario.');
      }
    });
  }

  testLogin() {
    if (!this.lastEmail) return;

    this.apiService.login(this.lastEmail, this.lastPassword).subscribe({
      next: (data: any) => {
        this.response = data;
        
        if (data.accessToken) {
          this.token = data.accessToken;
          alert('¡LOGIN EXITOSO!');
        }
      },
      error: (err) => {
        console.error(err);
        this.response = err.error;
        alert('Error en el Login.');
      }
    });
  }
}