import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage-container/homepage.component';
import { ArticleDetailsComponent } from '../article/article-details/article-details.component';

const APP_HOMEPAGE_ROUTES: Routes = [
  { path: '', component: HomepageComponent },
];

@NgModule({
  declarations: [HomepageComponent, ArticleDetailsComponent],
  imports: [SharedModule, RouterModule.forChild(APP_HOMEPAGE_ROUTES)],
})
export class HomepageModule { }
