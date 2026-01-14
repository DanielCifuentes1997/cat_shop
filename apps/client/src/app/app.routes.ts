import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: '**', redirectTo: '' }
];