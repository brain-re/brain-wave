import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IArticle } from 'src/app/logic/interfaces/article.interface';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  public article?:IArticle = null;
  public isLoading: boolean = true;
  public articles$: BehaviorSubject<IArticle[]> = this.articleService.articles$;

  constructor(
    public articleService: ArticleService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let _id = params.get('_id');
      this.articleService.getById(_id).pipe()
      .subscribe((article) => {
        this.article = article[0];
        this.isLoading = false;
      });
    });
  }

  ngOnInit(): void {

  }
}
