import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/logic/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  public products$: BehaviorSubject<IProduct[]>
  public form: FormGroup = new FormGroup({})

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.products$;

    this.productService.fetchProducts().subscribe();
  }

  public search(searchEvent: InputEvent) {
    let input = searchEvent.target as HTMLInputElement;
    let search = input.value;
    this.productService.searchProducts(search);
  }

  public submit(): void {
    if (this) {

    }
  }
}
