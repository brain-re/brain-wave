import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
    this.productSearchForm = this.productSearchFormBuilder.build();

    this.productSearchForm.valueChanges.subscribe(_form => {
      this.submit();
    });
  }

  public submit(): void {
    if (!this.productSearchForm) {
      return;
    }

    if (this.productSearchForm.valid) {
      this.productService.searchProducts(this.productSearchForm.value);
    }
  }
}
