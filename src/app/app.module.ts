import { AlertifyService } from './services/alertify.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductAddComponent } from './pages/products/product-add/product-add.component';
import { ProductEditComponent } from './pages/products/product-edit/product-edit.component';
import { CategoryListComponent } from './pages/categories/category-list/category-list.component';
import { CategoryAddComponent } from './pages/categories/category-add/category-add.component';
import { CategoryEditComponent } from './pages/categories/category-edit/category-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
