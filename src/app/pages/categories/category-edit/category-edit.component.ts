import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Category } from 'src/app/models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  category: Category;
  form: FormGroup;
  categoryId: number;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: Router,
    private alertifyService: AlertifyService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.categoryId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getCategory(this.categoryId);
  }

  getCategory(id: number) {

    this.categoryService.getCategory(id).subscribe((data) => {
      this.category = data;
      this.createForm();
    });
  }

  createForm(): void {
    this.form = this.fb.group({
      categoryID: [this.category.categoryID, Validators.compose([
        Validators.required
      ])],
      categoryName: [this.category.categoryName, Validators.compose([
        Validators.required
      ])],
      isActive: [this.category.isActive, Validators.compose([
      ])],
      order: [this.category.order, Validators.compose([
        Validators.required
      ])],
    });
  }

  onSubmit() {
    this.categoryService.updateCategory(this.form.value).subscribe((data) => {
      console.log(data);
      this.alertifyService.success('Başarıyla güncellendi');
    }, (error) => {
      console.log(error);
      this.alertifyService.error('İşlem gerçekleştirilemedi');
    });
  }
}
