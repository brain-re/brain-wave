import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageModule } from './features/homepage/homepage.module';
import { ProductModule } from './features/product/product.module';
import { ProductDetailsComponent } from './features/product/product-container/product-details/product-details.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

const APP_MODULES = [
  HomepageModule,
  ProductModule,
];

@NgModule({
  declarations: [AppComponent, ProductDetailsComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...APP_MODULES,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
