import { Component, OnInit, Output } from '@angular/core';
import { BehaviorSubject, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IArticle } from 'src/app/logic/interfaces/article.interface';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit
{
  public listClasses !: {}
  public selected$ : BehaviorSubject<IArticle> = new BehaviorSubject<IArticle>(null);

  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {
    this.selected$.pipe(
      tap((selected) => {
          this.listClasses = {
            "col-12": !selected,
            "col-8": !!selected
          }
      })
    ).subscribe();
  }

  selectedArticle($event: string) {
    this.articleService.getById($event).pipe(
      tap((article: IArticle) => this.selected$.next(article)),
    )
    .subscribe();
  }

}
