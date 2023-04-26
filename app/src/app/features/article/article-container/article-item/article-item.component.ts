import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/logic/interfaces/article.interface';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {
  @Input() article:IArticle = null;

  ngOnInit(): void {}
}
