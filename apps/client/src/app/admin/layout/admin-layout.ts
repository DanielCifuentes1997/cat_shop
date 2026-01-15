import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="admin-container">
      <aside class="sidebar">
        <h2>Noah Admin</h2>
        <nav>
          <a routerLink="/admin/dashboard" routerLinkActive="active">Dashboard</a>
          <a routerLink="/admin/products" routerLinkActive="active">Productos</a>
          <a routerLink="/admin/orders" routerLinkActive="active">Pedidos</a>
          <a routerLink="/" class="exit-link">Volver a la Tienda</a>
        </nav>
      </aside>
      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .admin-container { display: flex; min-height: 100vh; }
    .sidebar { width: 250px; background: #2c3e50; color: white; padding: 20px; display: flex; flex-direction: column; }
    .sidebar h2 { margin-bottom: 2rem; color: #ecf0f1; }
    .sidebar nav { display: flex; flex-direction: column; gap: 10px; }
    .sidebar a { color: #bdc3c7; text-decoration: none; padding: 10px; border-radius: 4px; transition: 0.3s; }
    .sidebar a:hover, .sidebar a.active { background: #34495e; color: white; }
    .sidebar a.exit-link { margin-top: auto; background: #c0392b; color: white; text-align: center; }
    .content { flex: 1; padding: 20px; background: #f4f6f7; }
  `]
})
export class AdminLayout {}