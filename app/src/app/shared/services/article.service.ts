import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IArticle } from '../../logic/interfaces/article.interface';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { ISearchArticle } from 'src/app/features/article/article-container/article-search/form/article-search.type';

const HTTP_API = '/api';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public articles$: BehaviorSubject<IArticle[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  public fetch(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(`${HTTP_API}/articles/search`)
        .pipe(
          tap((articles$: IArticle[]) => {
          this.articles$.next(articles$);
        })
      );
  }

  public search(searchArticle: ISearchArticle): Observable<IArticle[]>
  {
    let request = `${HTTP_API}/articles/search?`;
    if (searchArticle.search !== null) {
      request += `name=${searchArticle.search}&`
    }

    if (searchArticle.category !== null) {
      request += `category=${searchArticle.category}&`
    }
        
    return this.http.get<IArticle[]>(request)
    .pipe(
      debounceTime(500),
      tap(data => {
        this.articles$.next(data);
      })
    );
  }

  public create(article: IArticle) {
    this.http.post(`${HTTP_API}/articles/create`, article).subscribe();
  }

  public getById(id: string): Observable<IArticle>
  {
    return this.http.get<IArticle>(`${HTTP_API}/articles/search?_id=${id}`)
  }
}
