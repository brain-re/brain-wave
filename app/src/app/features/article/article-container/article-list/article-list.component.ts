import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IArticle } from 'src/app/logic/interfaces/article.interface';
import { ArticleService } from 'src/app/shared/services/article.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit
{
  @Input() limit: number;
  @Input() articles: IArticle[];
  @Output() selectedArticle = new EventEmitter<string>();
  public itemClasses !: {};

  public articles$: BehaviorSubject<IArticle[]> = this.articleService.articles$;

  constructor(
    public articleService: ArticleService,
    public dialog: MatDialog
  ) {
    this.itemClasses = {
      "col-lg-2": true,
      "col-md-3": true,
      "col-sm-4": true,
      "col-6": true
    }
  }

  ngOnInit(): void {}

  selectArticle(article_id: string) {
    this.selectedArticle.emit(article_id);
    this.itemClasses = {
      "col-lg-3": true,
      "col-md-4": true,
      "col-sm-6": true,
      "col-12": true
    }
  }
}
