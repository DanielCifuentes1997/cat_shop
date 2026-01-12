import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private apiService = inject(ApiService);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  errorMessage = '';

  onRegister() {
    this.apiService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Error al registrar usuario';
        console.error(err);
      }
    });
  }
}