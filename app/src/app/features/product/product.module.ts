import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared.module';
import { ProductDetailsComponent } from './product-container/product-details/product-details.component';
import { ProductContainerComponent } from './product-container/product-container.component';

const APP_PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductContainerComponent,
    children: [
      {
        path: ':product',
        component: ProductDetailsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [ProductContainerComponent],
  imports: [SharedModule, RouterModule.forChild(APP_PRODUCT_ROUTES)],
})
export class ProductModule {}
