import { Observable } from "rxjs";
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ArticleSearchFormBuilder } from './form/article-search.form';
import { ICategory } from 'src/app/logic/interfaces/category.interface';
import { CategoryService } from "../../../../shared/services/category.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss']
})
export class ArticleSearchComponent implements OnInit {
  public articleSearchForm: FormGroup = new FormGroup({});
  public categories$: Observable<ICategory[]> = this.categoryService.categories$;

  constructor(
    private articleSearchFormBuilder: ArticleSearchFormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.route.queryParamMap.subscribe((params) => {
      this.articleSearchForm = this.articleSearchFormBuilder.withSubmit((_form: FormGroup) => {this.submit(_form)}).build({
        category: params.get('category')
      });
      this.submit(this.articleSearchForm);
    })
  }

  get category(): AbstractControl|null {
    return this.articleSearchForm.get('category');
  }

  get search(): AbstractControl|null {
    return this.articleSearchForm.get('search');
  }

  clear() {
    this.articleSearchForm.get('search').setValue('');
  }

  submit(form: FormGroup): void
  {
    if (!form || !form.valid) {
      return null;
    }

    this.articleService.search(form.value).subscribe();
  }
}
