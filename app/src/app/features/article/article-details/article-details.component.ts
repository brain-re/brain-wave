import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IArticle } from 'src/app/logic/interfaces/article.interface';
import { ArticleService } from 'src/app/shared/services/article.service';

export interface DialogData {
  _id: string;
}

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  public article$: BehaviorSubject<IArticle> = new BehaviorSubject(null);
  public subscription: Subscription = null;

  constructor(
    public articleService: ArticleService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.articleService.getById(this.data._id).pipe(
      tap((article) => this.article$.next(article)),
      tap((article) => console.log(article))
    ).subscribe();
  }

  like () {
    this.articleService.like(this.article$.value._id, true);
  }
}
