import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared.module';
import { ProductContainerComponent } from './product-container/product-container.component';
import { ProductListComponent } from './product-container/product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const APP_PRODUCT_ROUTES: Routes = [
  {
    path: 'products',
    component: ProductContainerComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
        pathMatch: 'full'
      }
    ],
  },
  {
    path: 'product',
    component: ProductContainerComponent,
    children: [
      {
        path: 'new',
        component: ProductCreateComponent
      },
      {
        path: ':_id',
        component: ProductDetailsComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [ProductContainerComponent, ProductCreateComponent, ProductDetailsComponent],
  imports: [SharedModule, RouterModule.forChild(APP_PRODUCT_ROUTES)],
})
export class ProductModule {}
