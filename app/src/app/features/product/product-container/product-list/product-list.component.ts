import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/logic/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit
{
  @Input() title: string;
  @Input() limit: number;
  @Input() products: IProduct[];

  public products$: BehaviorSubject<IProduct[]> = this.productService.products$;

  constructor(public productService: ProductService) {}

  ngOnInit(): void {}
}
