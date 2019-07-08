import { ProductService } from './../../../services/product.service';
import { Product } from 'src/app/models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product;
  form: FormGroup;
  productID: number;
  categories: Category[];
  myModel = '12345';
  mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: Router,
    private alertifyService: AlertifyService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.productID = +params.id;
    });

    this.getProduct(this.productID);
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getProduct(id: number) {

    this.productService.getProduct(id).subscribe((data) => {
      this.product = data;
      this.createForm();
    });
  }

  createForm(): void {
    this.form = this.fb.group({
      productID: [this.product.productID, Validators.compose([
        Validators.required
      ])],
      productName: [this.product.productName, Validators.compose([
        Validators.required
      ])],
      categoryID: [this.product.categoryID, Validators.compose([
        Validators.required
      ])],
      price: [this.product.price, Validators.compose([
        Validators.required
      ])],
      priceVat: [this.product.priceVat, Validators.compose([
        Validators.required
      ])],
    });
  }

  onSubmit() {
    this.productService.updateProduct(this.form.value).subscribe((data) => {
      console.log(data);
      this.alertifyService.success('Başarıyla güncellendi');
    }, (error) => {
      console.log(error);
      this.alertifyService.error('İşlem gerçekleştirilemedi');
    });
  }
}
