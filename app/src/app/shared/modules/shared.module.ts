import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductItemComponent } from 'src/app/features/product/product-container/product-item/product-item.component';
import { ProductListComponent } from 'src/app/features/product/product-container/product-list/product-list.component';
import { ProductSearchComponent } from 'src/app/features/product/product-container/product-search/product-search.component';
import { Pipes } from '../pipe/pipes';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent,
    ProductSearchComponent
  ],
  imports: [
      CommonModule
    , FormsModule
    , MaterialModule
    , ReactiveFormsModule
    , Pipes
    , RouterModule
  ],
  exports: [
      CommonModule
    , FormsModule
    , MaterialModule
    , ReactiveFormsModule
    , Pipes
    , ProductListComponent
    , ProductItemComponent
    , ProductSearchComponent
  ]
})
export class SharedModule { }
