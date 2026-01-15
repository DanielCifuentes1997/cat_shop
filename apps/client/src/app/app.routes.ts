import { Routes } from '@angular/router';

export const routes: Routes = [
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
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];