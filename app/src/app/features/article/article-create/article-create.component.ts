import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from "rxjs";
import { ICategory } from 'src/app/logic/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ArticleFormBuilder } from './form/article.form';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html'
})
export class ArticleCreateComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public categories$: Observable<ICategory[]> = this.categorieService.categories$;

  constructor(
    private articleFormBuilder: ArticleFormBuilder,
    private articleService: ArticleService,
    private categorieService: CategoryService
  ) {}

  ngOnInit(): void {
    this.form = this.articleFormBuilder.build();
  }

  get name(): AbstractControl|null {
    return this.form.get('name');
  }

  get description(): AbstractControl|null {
    return this.form.get('description');
  }

  get categories(): AbstractControl|null {
    return this.form.get('categories');
  }

  get price(): AbstractControl|null {
    return this.form.get('price');
  }

  submit(form: FormGroup): void
  {
    if (!form || !form.valid) {
      return null;
    }

    this.articleService.create(form.value);
  }
}
