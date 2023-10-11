import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/logic/interfaces/article.interface';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  @Input() article ?: IArticle = null;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    console.log(this.article);
  }

  toggleLike(): void {
    this.articleService.like(this.article._id, true).subscribe();
  }

  toggleDislike(): void {
    this.articleService.like(this.article._id, false).subscribe();
  }
}
