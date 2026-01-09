import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 50px;">
      <h1>Prueba de Conexión</h1>
      <button (click)="testRegister()">Crear Usuario de Prueba</button>
      
      <div *ngIf="response">
        Respuesta del Backend: <br>
        <pre>{{ response | json }}</pre>
      </div>
    </div>
  `,
})
export class AppComponent {
  private apiService = inject(ApiService);
  response: any = null;

  testRegister() {
    const randomEmail = `test${Math.floor(Math.random() * 1000)}@gatos.com`;
    const password = 'passwordSeguro123'; //Prueba
    
    this.apiService.registerUser(randomEmail, password).subscribe({
      next: (data) => {
        console.log('Éxito:', data);
        this.response = data;
        alert('¡Usuario creado en BD con Password encriptado!');
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Error conectando con el backend. Revisa la consola.');
      }
    });
  }
}