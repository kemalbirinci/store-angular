import { AlertifyService } from './../../../services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  form: FormGroup;
  category: Category;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: Router,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      categoryName: ['', Validators.compose([
        Validators.required
      ])],
      isActive: ['', Validators.compose([
      ])],
      order: ['', Validators.compose([
        Validators.required
      ])],
    });
  }

  onSubmit() {
    this.categoryService.addCategory(this.form.value).subscribe((data) => {
      console.log(data);
      this.alertify.success('Başarıyla eklendi');
      this.route.navigate(['/categories']);
    }, (error) => {
      console.log(error);
      this.alertify.error('İşlem gerçekleştirilemedi');
    });
  }

}
