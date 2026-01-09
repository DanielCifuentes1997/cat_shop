import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 50px;">
      <h1>Prueba de Seguridad (Cookies HttpOnly)</h1>
      
      <button (click)="testRegister()">1. Crear Usuario Random</button>
      
      <button [disabled]="!lastEmail" (click)="testLogin()" style="margin-left: 10px;">
        2. Probar Login {{ lastEmail ? 'con ' + lastEmail : '(Crea un usuario primero)' }}
      </button>
      
      <div *ngIf="response">
        <h3>Última Respuesta del Backend:</h3>
        <pre style="background: #f4f4f4; padding: 10px;">{{ response | json }}</pre>
      </div>

      <div *ngIf="loginSuccess">
        <h3 style="color: green;">¡LOGIN EXITOSO!</h3>
        <p>El token ya NO es visible aquí.</p>
        <p>Está guardado como Cookie HttpOnly en tu navegador.</p>
        <p>Ahora eres inmune a ataques XSS.</p>
      </div>
    </div>
  `,
})
export class AppComponent {
  private apiService = inject(ApiService);
  response: any = null;
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
        this.loginSuccess = true;
        
        alert('¡LOGIN EXITOSO! Cookie recibida.');
      },
      error: (err) => {
        console.error(err);
        this.response = err.error;
        this.loginSuccess = false;
        alert('Error en el Login.');
      }
    });
  }
}