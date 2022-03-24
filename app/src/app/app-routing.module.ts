import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', loadChildren: () => import('./features/homepage/homepage.module').then((m) => m.HomepageModule) },
  { path: 'product', loadChildren: () => import('./features/product/product.module').then((m) => m.ProductModule) },
  { path: '**', component: NotFoundComponent}
];
