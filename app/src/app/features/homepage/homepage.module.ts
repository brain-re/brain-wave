import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage-container/homepage.component';

const APP_HOMEPAGE_ROUTES: Routes = [
  { path: '', component: HomepageComponent },
];

@NgModule({
  declarations: [HomepageComponent],
  imports: [SharedModule, RouterModule.forChild(APP_HOMEPAGE_ROUTES)],
})
export class HomepageModule { }
