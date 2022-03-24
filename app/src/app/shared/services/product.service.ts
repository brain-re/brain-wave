import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IProduct } from '../../logic/interfaces/product.interface';
import { tap } from 'rxjs/operators';
import { ISearchProduct } from 'src/app/features/product/product-container/product-list/form/product-search.type';

const HTTP_API = '/api/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products$: BehaviorSubject<IProduct[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  public fetchProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${HTTP_API}products`)
        .pipe(
          tap((products$: IProduct[]) => {
          this.products$.next(products$);
        })
      );
  }

  public searchProducts(searchProduct: ISearchProduct) {
    const input_search = searchProduct.search;
      this.http.get<IProduct[]>(`${HTTP_API}products?search=${input_search}`)
      .subscribe((value) => {
        this.products$.next(value);
      });
  }
}
