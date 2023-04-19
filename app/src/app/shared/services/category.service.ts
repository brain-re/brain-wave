import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICategory } from 'src/app/logic/interfaces/category.interface';

const HTTP_API = '/api';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public categories$: BehaviorSubject<ICategory[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  public init(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${HTTP_API}/categories/search`)
        .pipe(
          tap((categories: ICategory[]) => {
            this.categories$.next(categories);
          })
        );
  }

  public create(category: string): void
  {
    this.http.post(`${HTTP_API}/categories/create`, {name: category});
  }
}
