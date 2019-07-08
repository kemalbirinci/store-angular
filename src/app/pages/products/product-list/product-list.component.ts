import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../services/alertify.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(
    private productService: ProductService,
    private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  deleteProduct(product: Product) {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {

      this.productService.deleteProduct(product).subscribe((data) => {
        const index = this.products.indexOf(product);
        this.products.splice(index, 1);
        this.alertifyService.success('Ürün başarıyla silindi');
      }, (error) => {
        this.alertifyService.error('Geçersiz işlem.');
      });
    }

    return false;
  }
}
