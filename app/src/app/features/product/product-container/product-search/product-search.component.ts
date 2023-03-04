import { Observable } from "rxjs";
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductSearchFormBuilder } from './form/product-search.form';
import { ICategory } from 'src/app/logic/interfaces/category.interface';
import { CategoryService } from "../../../../shared/services/category.service";

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  public productSearchForm: FormGroup = new FormGroup({});
  public categories$: Observable<ICategory[]> = this.categoryService.fetch();

  constructor(
    private productSearchFormBuilder: ProductSearchFormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.productSearchForm = this.productSearchFormBuilder.withSubmit((_form: FormGroup) => {this.submit(_form)}).build();
  }

  get category(): AbstractControl|null {
    return this.productSearchForm.get('category');
  }

  get search(): AbstractControl|null {
    return this.productSearchForm.get('search');
  }

  onSearchChange(event: Event) {
    let target = (event.target as HTMLInputElement);

    // Remove ugly style both are really ugly !
    target.classList.remove('ng-valid'); // Ignore ng-valid
    target.classList.remove('ng-invalid'); // Ignore ng-invalid
  }

  onClick(event: Event) {
    let target = (event.target as HTMLInputElement);

    // Remove ugly style both are really ugly !
    target.classList.remove('ng-valid'); // Ignore ng-valid
    target.classList.remove('ng-invalid'); // Ignore ng-invalid
  }

  submit(form: FormGroup): void
  {
    if (!form || !form.valid) {
      return null;
    }

    this.productService.search(form.value).subscribe();
  }
}
