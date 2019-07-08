import { AlertifyService } from './../../../services/alertify.service';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  deleteCategory(category: Category) {
    if (confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {

      this.categoryService.deleteCategory(category).subscribe((data) => {
        const index = this.categories.indexOf(category);
        this.categories.splice(index, 1);
        this.alertifyService.success('kategori başarıyla silindi');
      }, (error) => {
        this.alertifyService.error('Geçersiz işlem.');
      });
    }

    return false;
  }

}
