import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { IProduct } from '../../logic/interfaces/product.interface';
import { debounceTime, map, tap } from 'rxjs/operators';
import { ISearchProduct } from 'src/app/features/product/product-container/product-list/form/product-search.type';

const HTTP_API = '/api/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products$: BehaviorSubject<IProduct[]> = new BehaviorSubject(null);
  public subject = new Subject();

  constructor(private http: HttpClient) {
    this.subject.pipe(
      debounceTime(1500),
      map(search =>
        this.http.get<IProduct[]>(`${HTTP_API}products?search=${search}`)
        .subscribe((value) => {
          this.products$.next(value);
        })
      )
    ).subscribe();
  }

  public fetchProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${HTTP_API}products`)
        .pipe(
          tap((products$: IProduct[]) => {
          this.products$.next(products$);
        })
      );
  }

  public searchProducts(searchProduct: ISearchProduct) {
    this.subject.next(searchProduct.search);
  }
}
