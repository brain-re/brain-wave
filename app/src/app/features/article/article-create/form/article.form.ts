import { Injectable } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";

import { BaseFormBuilder } from "src/app/shared/form/base-form.builder";
import { IArticleForm } from "./article.type";

@Injectable({
  providedIn: 'root',
})
export class ArticleFormBuilder extends BaseFormBuilder
{
  public build(data: IArticleForm = {
    name: '',
    description: "",
    price: 0,
    category: null
  }): FormGroup
  {
    return super.build({
      name: [
        data.name,
        [
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.required
        ]
      ],
      description: [
        data.description,
        [
          Validators.required
        ]
      ],
      category: [data.category, []],
      price: [
        data.price,
        [
          Validators.min(0),
          Validators.max(99999999),
          Validators.required
        ]
      ]
    });
  }

  public getErrorMessages()
  {
    return {
      name: {
        minlength: {
          fr: "Au moins {{requiredLength}} caractères sont requis."
        },
        maxlength: {
          fr: "{{actualLength}}/{{requiredLength}} caractères maximum."
        },
        required: {
          fr: "Le nom est requis"
        }
      },
      description: {
        required: {
          fr: "La description est requise"
        }
      },
      category: {},
      price: {
        min: {
          fr: "La valeur doit être positive"
        },
        max: {
          fr: "La valeur doit être inférieur à 99999999"
        },
        required: {
          fr: "Le prix est requis"
        }
      }
    }
  }

  protected submit(form: FormGroup): void {
    throw new Error("Method not implemented.");
  }
}
