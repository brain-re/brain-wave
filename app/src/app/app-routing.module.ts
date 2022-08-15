import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./features/homepage/homepage.module').then((m) => m.HomepageModule) },
  { path: 'products', loadChildren: () => import('./features/product/product.module').then((m) => m.ProductModule) },
  { path: 'auth', loadChildren: () => import('./domain/auth/module/auth.module').then((m) => m.AuthModule) },
  { path: '**', component: NotFoundComponent}
];
