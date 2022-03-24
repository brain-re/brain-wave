import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ISearchProduct } from 'src/app/features/product/product-container/product-list/form/product-search.type';

@Injectable({
  providedIn: 'root',
})
export class ProductSearchFormBuilder {

  constructor(private fb: FormBuilder) {}

  build(emptyData: ISearchProduct = {search: ''}): FormGroup
  {
    return this.fb.group({
      search: [
        emptyData.search,
        [
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ]
    });
  }

  errors : {[field: string]: {[field: string]: string}} = {
    search: {
      minlength: "Au moins 3 caractères sont requis.",
      maxLength: "100 caractères maximum."
    }
  }
}
