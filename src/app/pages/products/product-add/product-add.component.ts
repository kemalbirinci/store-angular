import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  form: FormGroup;
  product: Product;
  categories: Category[];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: Router,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.product = new Product();
    this.getCategories();
    this.createForm();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  createForm() {
    this.form = this.fb.group({
      productName: [this.product.productName, Validators.compose([
        Validators.required
      ])],
      categoryID: [this.product.categoryID, Validators.compose([
        Validators.required
      ])],
      price: [this.product.price, Validators.compose([
        Validators.required,
        Validators.pattern('\\d+([.]\\d+)?')
      ])],
      priceVat: [this.product.priceVat, Validators.compose([
        Validators.required
      ])],
    });
  }

  onSubmit() {
    this.productService.addProduct(this.form.value).subscribe((data) => {
      console.log(data);
      this.alertify.success('Başarıyla eklendi');
      this.route.navigate(['/products']);
    }, (error) => {
      console.log(error);
      this.alertify.error('İşlem gerçekleştirilemedi');
    });
  }
}
