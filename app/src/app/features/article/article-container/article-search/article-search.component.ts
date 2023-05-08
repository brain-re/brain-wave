import { Observable, Subscription } from "rxjs";
import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class ArticleSearchComponent implements OnInit, OnDestroy {
  public articleSearchForm: FormGroup = new FormGroup({});
  public categories$: Observable<ICategory[]> = this.categoryService.categories$;
  public subscription: Subscription;

  constructor(
    private articleSearchFormBuilder: ArticleSearchFormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.subscription = this.categoryService.init().subscribe();

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
