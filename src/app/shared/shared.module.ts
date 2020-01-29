import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home.component';
import { ContactComponent } from './contact.component';
import { ErrorComponent } from './error.component';



@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    ContactComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
