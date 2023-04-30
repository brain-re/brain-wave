import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared.module';
import { ArticleContainerComponent } from './article-container/article-container.component';
import { ArticleListComponent } from './article-container/article-list/article-list.component';
import { ArticleCreateComponent } from './article-create/article-create.component';

const APP_ARTICLE_ROUTES: Routes = [
  {
    path: 'articles',
    component: ArticleContainerComponent,
    children: [
      {
        path: '',
        component: ArticleListComponent,
        pathMatch: 'full'
      }
    ],
  },
  {
    path: 'article',
    component: ArticleContainerComponent,
    children: [
      {
        path: 'new',
        component: ArticleCreateComponent
      },
    ]
  }
];

@NgModule({
  declarations: [ArticleContainerComponent, ArticleCreateComponent],
  imports: [SharedModule, RouterModule.forChild(APP_ARTICLE_ROUTES)],
})
export class ArticleModule {}
