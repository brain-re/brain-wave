import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared.module';
import { ProductContainerComponent } from './product-container/product-container.component';
import { ProductListComponent } from './product-container/product-list/product-list.component';

const APP_PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductContainerComponent,
    children: [
      {
        path: ':product',
        component: ProductListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [ProductContainerComponent, ProductListComponent],
  imports: [SharedModule, RouterModule.forChild(APP_PRODUCT_ROUTES)],
})
export class ProductModule {}
