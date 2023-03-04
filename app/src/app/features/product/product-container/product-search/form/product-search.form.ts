import { Injectable } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";

import { ISearchProduct } from "./product-search.type";
import { BaseFormBuilder } from "src/app/shared/form/base-form.builder";

@Injectable({
  providedIn: 'root',
})
export class ProductSearchFormBuilder extends BaseFormBuilder
{
  constructor() {
    super();
  }

  public build(data: ISearchProduct = {search: '', category: ''}): FormGroup
  {
    return super.build({
      search: [
        data.search,
        [
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],
      category: [
        data.category,
        []
      ]
    });
  }

  public getErrorMessages()
  {
    return {
      search: {
        minlength: {
          fr: "Au moins {{requiredLength}} caractères sont requis."
        },
        maxlength: {
          fr: "{{actualLength}}/{{requiredLength}} caractères maximum."
        }
      }
    }
  }

  protected submit(form: FormGroup): void {
    throw new Error("Method not implemented.");
  }
}
