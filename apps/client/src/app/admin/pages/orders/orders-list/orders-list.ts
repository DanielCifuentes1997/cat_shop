import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="header">
      <h2>Gestión de Pedidos</h2>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          @for (order of orders$ | async; track order.id) {
            <tr>
              <td>{{ order.id.slice(0, 8) }}...</td>
              <td>{{ order.createdAt | date:'short' }}</td>
              <td>Ver Detalles</td>
              <td>{{ order.total | currency:'COP':'symbol-narrow':'1.0-0' }}</td>
              <td>
                <span class="badge" [class]="order.status.toLowerCase()">
                  {{ order.status }}
                </span>
              </td>
              <td class="actions">
                <button (click)="markAsShipped(order.id)" *ngIf="order.status === 'PAID'">
                  Enviar
                </button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .header { margin-bottom: 20px; }
    .table-container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 12px; border-bottom: 1px solid #eee; }
    th { font-weight: bold; color: #7f8c8d; }
    .badge { padding: 4px 8px; border-radius: 12px; font-size: 0.85rem; font-weight: bold; }
    .badge.pending { background: #f1c40f; color: #fff; }
    .badge.paid { background: #2ecc71; color: #fff; }
    .badge.shipped { background: #3498db; color: #fff; }
    button { cursor: pointer; padding: 5px 10px; background: #34495e; color: white; border: none; border-radius: 4px; }
  `]
})
export class OrdersList {
  private apiService = inject(ApiService);
  orders$ = this.apiService.getOrders();

  markAsShipped(id: string) {
    if (confirm('¿Marcar pedido como enviado?')) {
      this.apiService.updateOrderStatus(id, 'SHIPPED').subscribe(() => {
        this.orders$ = this.apiService.getOrders();
      });
    }
  }
}