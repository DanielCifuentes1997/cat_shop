import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
        const msg = err.error?.message;
        if (Array.isArray(msg)) {
          this.errorMessage = msg.join(', ');
        } else {
          this.errorMessage = msg || 'Error al registrar usuario';
        }
        console.error(err);
      }
    });
  }
}