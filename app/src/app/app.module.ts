import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageModule } from './features/homepage/homepage.module';
import { ProductModule } from './features/product/product.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const APP_MODULES = [
    HomepageModule
  , ProductModule
  , BrowserAnimationsModule
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ...APP_MODULES,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
