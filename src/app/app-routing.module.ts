import { CategoryEditComponent } from './pages/categories/category-edit/category-edit.component';
import { CategoryAddComponent } from './pages/categories/category-add/category-add.component';
import { ProductAddComponent } from './pages/products/product-add/product-add.component';
import { CategoryListComponent } from './pages/categories/category-list/category-list.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { match } from 'minimatch';
import { ProductEditComponent } from './pages/products/product-edit/product-edit.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ProductListComponent
      },
      {
        path: 'add',
        component: ProductAddComponent
      },
      {
        path: 'edit/:id',
        component: ProductEditComponent
      }
    ]
  },
  {
    path: 'categories',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: CategoryListComponent
      },
      {
        path: 'add',
        component: CategoryAddComponent
      },
      {
        path: 'edit/:id',
        component: CategoryEditComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
