import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared.module';
import { ProductComponent } from './product-container/product.component';

const APP_PRODUCT_ROUTES: Routes = [
  { path: '', component: ProductComponent },
];

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(APP_PRODUCT_ROUTES),
  ]
})
export class ProductModule { }
