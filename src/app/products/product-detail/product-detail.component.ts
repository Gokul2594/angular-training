import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.interface';
import { FavouriteService } from '../favourite.service';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;

  constructor(
    private favouriteService: FavouriteService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  newFavourite(product: Product) {
    this.favouriteService.addToFavourites(product);
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure?')) {
      this
      .productService
      .deleteProduct(id)
      .subscribe(
        () => {
          console.log('Product deleted on server!');
          this.productService.initProducts();
          this.router.navigateByUrl('/products');
        },
        (error) => {
          console.log(`Could not delete product: ${error}`);
        });
    }
  }

  ngOnInit() {
    const id: number = Number(this.activatedRoute.snapshot.params.id);
    this
      .productService
      .products$
      .pipe(
        flatMap(p => p),
        filter(product => product.id === id)
        // map(results => results.find(p => p.id === id))
      )
      .subscribe(
        result => this.product = result
      );

  }

}
