import { Routes } from '@angular/router';
import { ShopLayout } from './layout/shop-layout/shop-layout';

export const routes: Routes = [
  {
    path: '',
    component: ShopLayout,
    children: [
      { 
        path: '', 
        loadComponent: () => import('./pages/home/home').then(m => m.Home) 
      },
      { 
        path: 'login', 
        loadComponent: () => import('./pages/auth/login/login').then(m => m.Login) 
      },
      { 
        path: 'register', 
        loadComponent: () => import('./pages/auth/register/register').then(m => m.Register) 
      },
      { 
        path: 'cart', 
        loadComponent: () => import('./pages/cart/cart').then(m => m.Cart) 
      },
      { 
        path: 'checkout', 
        loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout) 
      }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];