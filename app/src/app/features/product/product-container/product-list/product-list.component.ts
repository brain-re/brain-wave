import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/logic/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductSearchFormBuilder } from './form/product-search.form';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  public products$: BehaviorSubject<IProduct[]>;
  public productSearchForm: FormGroup = new FormGroup({});

  constructor(
    private productSearchFormBuilder: ProductSearchFormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.products$;
    this.productService.fetchProducts().subscribe();

    this.initForm();
  }

  initForm() {
    this.productSearchForm = this.productSearchFormBuilder.withSubmit((_form: FormGroup) => {this.submit(_form)})
                                                          .build();
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

    this.productService.searchProducts(form.value);
  }
}
