import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/modules/shared.module';
import { LoginComponent } from '../component/login/login.component';

const APP_ARTICLE_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, RouterModule.forChild(APP_ARTICLE_ROUTES)],
})
export class AuthModule {}
