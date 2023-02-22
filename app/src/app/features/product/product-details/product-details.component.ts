import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { IProduct } from 'src/app/logic/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public product?:IProduct = null;
  public isLoading: boolean = true;
  public products$: BehaviorSubject<IProduct[]> = this.productService.products$;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let _id = params.get('_id');
      this.productService.getById(_id).pipe()
      .subscribe((product) => {
        this.product = product[0];
        this.isLoading = false;
        console.log(this.product);

      });
    });
  }

  ngOnInit(): void {

  }
}
