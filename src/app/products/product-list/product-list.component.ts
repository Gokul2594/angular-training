import { Component, OnInit } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';
import { FavouriteService } from '../favourite.service';
import { Observable, throwError, EMPTY } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title = 'Products';
  // products: Product[];
  products$: Observable<Product[]>;
  selectedProduct: Product;
  errorMessage;
  productNb = 0;
  currentPage = 1;
  sorter = '-price';

  // pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;

  sortBy(propertyName: string) {
    this.sorter = this.sorter.startsWith('-') ? propertyName : '-' + propertyName;
    this.selectedProduct = null;
  }

  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.selectedProduct = null;
    this.currentPage++;
  }

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.selectedProduct = null;
    this.currentPage--;
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigateByUrl(`/products/${product.id}`);
  }

  get favourites(): number {
    return this.favouriteService.getFavouritesNb();
  }

  constructor(
    private productService: ProductService,
    private favouriteService: FavouriteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.products$ = this
                     .productService
                     .products$
                     .pipe(
                       tap(products => this.productNb = products.length),
                       catchError(
                         error => {
                           this.errorMessage = error;
                           return EMPTY;
                         }
                       )
                     )
    // this.productService
    // .products$
    // .subscribe(results => this.products = results)
  }

}
