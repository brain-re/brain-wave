import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IProduct } from '../../logic/interfaces/product.interface';
import { tap, filter, map } from 'rxjs/operators';
import { ProductFixtures } from 'src/app/logic/fixtures/product.fixtures';

const HTTP_API = '/api/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products$: BehaviorSubject<IProduct[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}
  
  public fetchProducts(): Observable<IProduct[]> {
    /*return of(ProductFixtures.load()).pipe(
      tap((products$: IProduct[]) => {
        console.log(products$);
        this.products$.next(products$);
       })
    );*/
    return this.http.get<IProduct[]>(`${HTTP_API}products/`)
         .pipe(
           tap((products$: IProduct[]) => {
            this.products$.next(products$);
           })
        );
    
  }

  public searchProducts(search: string) {
      this.fetchProducts().pipe(
        map((products: IProduct[]) => products.filter(
          (product: IProduct) => {
            let regex = new RegExp(search);
            return (regex.test(product.name) || regex.test(product.description));
          })
        )
      )
      .subscribe((value) => {
        this.products$.next(value);
      })
      .unsubscribe();
  }
}
