import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderBy } from './orderBy.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductInsertComponent } from './product-insert/product-insert.component';


@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductListComponent,
    OrderBy,
    ProductInsertComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule
  ],
  exports: [ProductListComponent]
})
export class ProductsModule { }
