import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductModule } from './features/product/product.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/modules/shared.module';
import { NavbarComponent } from './domain/navbar/navbar.component';
import { AuthInterceptor } from './domain/auth/auth.interceptor';

const APP_MODULES = [
  ProductModule
  , BrowserAnimationsModule
];

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    ...APP_MODULES,
    RouterModule.forRoot(APP_ROUTES),
  ],
  exports: [
    ...APP_MODULES
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
