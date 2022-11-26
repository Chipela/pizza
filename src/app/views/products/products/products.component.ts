import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {catchError, map, of, retry, Subscription, tap} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {productType} from "../../../../types/product.type";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService,
              private http: HttpClient,
              private router: Router) {
  }

  products: productType[] = [];
  loading: boolean = false;
  private subscription: Subscription | null = null;

  ngOnInit() {
    // this.products = this.productService.getProducts();

    this.loading = true;
    this.subscription = this.productService.getProducts()
      .pipe(
        tap(()=> {
          this.loading = false;
        })
      )
      .subscribe(
        {
          next: (data) => {
            this.products = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


  // addToCard(title: string): void {
  //   this.cartService.product = title;
  //   this.router.navigate(['/order'], {queryParams: {product: title}});
  // }

}
