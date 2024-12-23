// src/app/category/category-form/category-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../../infrastructure/services/category/category.service';
import { Category } from '../../../../../domain/models/category/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls:['./category-form.component.scss']

})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  isEditMode = false;
  categoryId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Verificar si estamos en modo de edición
    this.categoryId = this.route.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.isEditMode = true;
      this.categoryService.getCategoryById(this.categoryId).subscribe((category: Category) => {
        this.categoryForm.patchValue(category);
      });
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      if (this.isEditMode && this.categoryId) {
        // Modo de actualización
        this.categoryService.updateCategory(this.categoryId, this.categoryForm.value).subscribe(() => {
          console.log('Categoría actualizada');
          this.router.navigate(['admin/categories']);
        });
      } else {
        // Modo de creación
        this.categoryService.addCategory(this.categoryForm.value).subscribe(() => {
          console.log('Categoría creada');
          this.router.navigate(['admin/categories']);
        });
      }
    }
  }

  // onDelete() {
  //   if (this.categoryId) {
  //     this.categoryService.deleteCategory(this.categoryId).subscribe(() => {
  //       console.log('Categoría eliminada');
  //       this.router.navigate(['admin/categories']);
  //     });
  //   }
  // }
}
