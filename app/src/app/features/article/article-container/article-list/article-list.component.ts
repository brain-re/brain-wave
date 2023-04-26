import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/logic/interfaces/article.interface';
import { ArticleService } from 'src/app/shared/services/article.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit
{
  @Input() title: string;
  @Input() limit: number;
  @Input() articles: IArticle[];

  public articles$: BehaviorSubject<IArticle[]> = this.articleService.articles$;

  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {}
}
