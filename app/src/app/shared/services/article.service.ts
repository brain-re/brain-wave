import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IArticle } from '../../logic/interfaces/article.interface';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { ISearchArticle } from 'src/app/features/article/article-container/article-search/form/article-search.type';

const HTTP_API = '/api';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public articles$: BehaviorSubject<IArticle[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  public fetch(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(`${HTTP_API}/article/search`)
        .pipe(
          tap((articles$: IArticle[]) => {
          this.articles$.next(articles$);
        })
      );
  }

  public search(searchArticle: ISearchArticle): Observable<IArticle[]>
  {
    let request = `${HTTP_API}/article/search?`;
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
    this.http.post(`${HTTP_API}/article/create`, article).subscribe();
  }

  public getById(id: string): Observable<IArticle>
  {
    return this.http.get<IArticle>(`${HTTP_API}/article/search?_id=${id}`).pipe(
      map((articles) => articles[0])
    )
  }

  public like(article_id: string, like: boolean) {
    this.http.post(`${HTTP_API}/article/like`,
     {like: like, article_id: article_id}
    ).subscribe();
  }
}
