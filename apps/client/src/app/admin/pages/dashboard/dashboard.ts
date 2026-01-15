import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h1>Dashboard</h1>
    <p>Bienvenido al panel de control de Noah Rascadores.</p>
    <div class="stats-grid">
      <div class="card">
        <h3>Ventas Hoy</h3>
        <p class="number">$0</p>
      </div>
      <div class="card">
        <h3>Pedidos Pendientes</h3>
        <p class="number">0</p>
      </div>
    </div>
  `,
  styles: [`
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 20px; }
    .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .number { font-size: 2rem; font-weight: bold; color: #2c3e50; margin: 10px 0 0; }
  `]
})
export class Dashboard {}