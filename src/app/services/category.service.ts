import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  headers: HttpHeaders;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'categories');
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.baseUrl + `categories/${id}`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl + 'categories', category, { headers: this.headers });
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.baseUrl + 'categories', category, { headers: this.headers });
  }

  deleteCategory(category: Category) {
    return this.http.delete(this.baseUrl + `categories/${category.categoryID}`);
  }
}
