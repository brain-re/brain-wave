import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArticleItemComponent } from 'src/app/features/article/article-container/article-item/article-item.component';
import { ArticleListComponent } from 'src/app/features/article/article-container/article-list/article-list.component';
import { ArticleSearchComponent } from 'src/app/features/article/article-container/article-search/article-search.component';
import { Pipes } from '../pipe/pipes';
import { MaterialModule } from './material.module';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    ArticleListComponent
    , ArticleItemComponent
    , ArticleSearchComponent
  ],
  imports: [
      CommonModule
    , FormsModule
    , MaterialModule
    , ReactiveFormsModule
    , MatDialogModule
    , Pipes
    , RouterModule
  ],
  exports: [
      CommonModule
    , FormsModule
    , MaterialModule
    , ReactiveFormsModule
    , Pipes
    , ArticleListComponent
    , ArticleItemComponent
    , ArticleSearchComponent
  ]
})
export class SharedModule { }
