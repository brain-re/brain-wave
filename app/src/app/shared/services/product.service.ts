import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../../logic/interfaces/product.interface';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { ISearchProduct } from 'src/app/features/product/product-container/product-search/form/product-search.type';

const HTTP_API = '/api';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products$: BehaviorSubject<IProduct[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.fetch().subscribe();
  }

  public fetch(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${HTTP_API}/products/search`)
        .pipe(
          tap((products$: IProduct[]) => {
          this.products$.next(products$);
        })
      );
  }

  public search(searchProduct: ISearchProduct): Observable<IProduct[]>
  {
    let search = searchProduct.search;
    let category = searchProduct.category;
    return this.http.get<IProduct[]>(`${HTTP_API}/products/search?name=${search}&categories=${category}`)
    .pipe(
      debounceTime(500),
      tap(data => {
        this.products$.next(data);
      })
    );
  }

  public create(product: IProduct) {
    this.http.post(`${HTTP_API}/products/create`, product).subscribe();
  }

  public getById(id: string): Observable<IProduct>
  {
    return this.http.get<IProduct>(`${HTTP_API}/products/search?_id=${id}`)
  }
}
