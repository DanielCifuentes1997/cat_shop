import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="header">
      <h2>Gestión de Productos</h2>
      <a routerLink="/admin/products/new" class="btn-primary">Nuevo Producto</a>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          @for (product of products$ | async; track product.id) {
            <tr>
              <td>
                <img [src]="product.imageUrl" [alt]="product.name" width="50">
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.price | currency:'COP':'symbol-narrow':'1.0-0' }}</td>
              <td>{{ product.stock }}</td>
              <td class="actions">
                <a [routerLink]="['/admin/products', product.id]" class="btn-edit">Editar</a>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .btn-primary { background: #2ecc71; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
    .table-container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 12px; border-bottom: 1px solid #eee; }
    th { font-weight: bold; color: #7f8c8d; }
    .btn-edit { color: #3498db; text-decoration: none; font-weight: bold; }
    img { border-radius: 4px; object-fit: cover; }
  `]
})
export class ProductsList {
  private apiService = inject(ApiService);
  products$ = this.apiService.getProducts();
}