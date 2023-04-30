import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/logic/interfaces/article.interface';
import { ArticleService } from 'src/app/shared/services/article.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ArticleDetailsComponent } from '../../article-details/article-details.component';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit
{
  @Input() limit: number;
  @Input() articles: IArticle[];

  public articles$: BehaviorSubject<IArticle[]> = this.articleService.articles$;

  constructor(
    public articleService: ArticleService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openDialog(id: string) {
    console.log(id);
    
    const dialogRef = this.dialog.open(ArticleDetailsComponent, {
      data: {_id: id},
    });
  }
}
