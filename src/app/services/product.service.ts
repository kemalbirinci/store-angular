import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  headers: HttpHeaders;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + `products/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'products', product, { headers: this.headers });
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + 'products', product, { headers: this.headers });
  }

  deleteProduct(product: Product) {
    return this.http.delete(this.baseUrl + `products/${product.productID}`);
  }
}
