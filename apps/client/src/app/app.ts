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

      <button [disabled]="!loginSuccess" (click)="testProfile()" style="margin-left: 10px;">
        3. 🔓 Probar Acceso Seguro (Perfil)
      </button>
      
      <div *ngIf="response">
        <h3>Última Respuesta General:</h3>
        <pre style="background: #f4f4f4; padding: 10px;">{{ response | json }}</pre>
      </div>

      <div *ngIf="loginSuccess && !profileData">
        <h3 style="color: green;">¡LOGIN EXITOSO!</h3>
        <p>El token está guardado como Cookie HttpOnly.</p>
        <p>Ahora intenta el botón 3 para ver si el backend te deja pasar.</p>
      </div>

      <div *ngIf="profileData" style="border: 2px solid green; padding: 10px; margin-top: 20px;">
        <h3 style="color: green;">✅ ¡ACCESO AUTORIZADO!</h3>
        <p>El Backend leyó tu cookie correctamente.</p>
        <p><strong>Datos del Perfil (Desde el Guard):</strong></p>
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
        this.profileData = null;
        
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

  testProfile() {
    this.apiService.getProfile().subscribe({
      next: (data) => {
        this.profileData = data;
        alert('¡Acceso concedido!');
      },
      error: (err) => {
        console.error(err);
        alert('Acceso Denegado. La cookie falló.');
      }
    });
  }
}