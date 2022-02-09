import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', loadChildren: () => import('./features/homepage/homepage.module').then((m) => m.HomepageModule) },
  { path: 'product', loadChildren: () => import('./features/product/product.module').then((m) => m.ProductModule) },
];
