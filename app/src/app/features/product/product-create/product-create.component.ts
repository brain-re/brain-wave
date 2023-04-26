import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from "rxjs";
import { ICategory } from 'src/app/logic/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductFormBuilder } from './form/product.form';
import { map, startWith, tap } from 'rxjs/operators';
import { IProduct } from 'src/app/logic/interfaces/product.interface';
import { category } from 'src/app/logic/class/category.class';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html'
})
export class ProductCreateComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public categories$: BehaviorSubject<ICategory[]> = this.categorieService.categories$;
  public filteredCategories: Observable<ICategory[]>;
  public selectedCategory?: ICategory = null;

  constructor(
    private productFormBuilder: ProductFormBuilder,
    private productService: ProductService,
    private categorieService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categorieService.init().pipe(
      tap(() => this.filteredCategories = this.category.valueChanges.pipe(
        startWith(''),
        tap(() => this.selectedCategory = null), // Each time the category value change, we want to reset the selected category filter
        map(value => this._filter(value || '')),
      ))
    ).subscribe();
    this.form = this.productFormBuilder.build();    
  }

  private _filter(value: string): ICategory[] {
    const filterValue = value.toLowerCase();
    
    return this.categorieService.categories$.value.filter(cat => cat.name.toLowerCase().includes(filterValue));
  }

  private onSelectCategory(event) {
    let el = event.target as Element;
    let category_id = el.parentElement.id;

    this.selectedCategory = this.categories$.value.find(cat => cat._id == category_id);
  }

  get name(): AbstractControl|null {
    return this.form.get('name');
  }

  get description(): AbstractControl|null {
    return this.form.get('description');
  }

  get category(): AbstractControl|null {
    return this.form.get('category');
  }

  get price(): AbstractControl|null {
    return this.form.get('price');
  }

  submit(form: FormGroup): void
  {
    if (!form || !form.valid) {
      return null;
    }

    let product: IProduct = form.value;    

    if (!this.selectedCategory) {
      // Create new category object
      product = {...product, category: new category(form.value.category, '')}
    } else {
      // Use an existing category object
      product = {...product, category: this.selectedCategory}
    }
    
    this.productService.create(product);
  }
}
