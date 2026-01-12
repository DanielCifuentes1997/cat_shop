import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private apiService = inject(ApiService);
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';

  onLogin() {
    this.apiService.login(this.email, this.password).subscribe({
      next: () => {
        // Si el login es correcto, nos vamos al Home
        this.router.navigate(['/']);
      },
      error: (err) => {
        // Si falla, mostramos mensaje
        this.errorMessage = 'Credenciales incorrectas';
        console.error(err);
      }
    });
  }
}