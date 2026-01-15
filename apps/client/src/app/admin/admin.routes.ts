import { Routes } from '@angular/router';
import { AdminLayout } from './layout/admin-layout';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      { 
        path: 'dashboard', 
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard) 
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products-list/products-list').then(m => m.ProductsList)
      },
      {
        path: 'products/new',
        loadComponent: () => import('./pages/products/product-form/product-form').then(m => m.ProductForm)
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./pages/products/product-form/product-form').then(m => m.ProductForm)
      },
      {
        path: 'orders',
        loadComponent: () => import('./pages/orders/orders-list/orders-list').then(m => m.OrdersList)
      },
      { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      }
    ]
  }
];