import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../infrastructure/services/category/category.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CategoryPlacesService } from 'src/app/infrastructure/services/category-places/category.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [MessageService],
})
export class CategoryPlaceComponent implements OnInit {
  categoriesPlace: any[] = [];
  displayModal: boolean = false;
  checkUpdateOrSave: boolean = false;
  categoryForm: FormGroup;
  displayDialogDeleted = false;
  categoryId = '';
  loading: boolean = false;

  rowTable = [
    { field: 'name', header: 'Name', style: 'width: 100px', type: 'text' },
    { field: 'description', header: 'Description', style: 'width: 200px', type: 'text' },
    { field: 'create_at', header: 'Date', style: 'width: 50px', type: 'date' },
    { action: [{ edit: true }, { delete: true }, { activate: false }] },
  ];

  constructor(
    private categoryService: CategoryPlacesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllCategoryByCompany();
  }

  getAllCategoryByCompany() {
    this.loading = true; // Inicia el estado de carga
    this.categoryService.getCategories()
      .pipe(
        finalize(() => this.loading = false) // Finaliza el estado de carga al completar
      )
      .subscribe({
        next: (value) => {
          if (value.status === 200 || value.status === 400 ) {
            this.categoriesPlace = value.data;
          } else if (value.status === 500) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error al cargar categorías',
              detail: 'Se produjo un error inesperado al intentar cargar las categorías. Intente nuevamente más tarde.',
            });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error de red',
            detail: 'No se pudo cargar las categorías. Por favor, inténtelo más tarde.',
          });
        }
      });
  }
  

  editCategory(id: string): void {
    this.router.navigate([`/category/${id}`]);
  }

  crearcategory(): void {
    this.router.navigate(['admin/category']);
  }

  hideWindow() {
    this.displayModal = !this.displayModal;
    this.checkUpdateOrSave = false;
    this.generateCode();
    this.clearInputForm();
  }

  initForm() {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      code: ['', Validators.required],
    });
    this.generateCode();
  }

  async validateForm(categoryForm: FormGroup) {
    categoryForm.markAllAsTouched();
    let validForm = categoryForm.valid;

    if (validForm) {
      this.checkUpdateOrSave
        ? this.updateCategory(this.categoryId, categoryForm)
        : this.saveCategory(categoryForm);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Campos obligatorios',
        detail: 'Todos los campos son requeridos',
      });
    }
  }

  edit(event: any) {
    this.categoryForm.controls.name.setValue(event.name);
    this.categoryForm.controls.code.setValue(event.code);
    this.categoryForm.controls.description.setValue(event.description);
    this.checkUpdateOrSave = true;
    this.categoryId = event._id;
  }

  delete(event: any) {
    this.categoryId = event._id;
  }

  deleteDocument() {
    this.loading = true;
    this.categoryService.deleteCategory(this.categoryId).subscribe((response) => {
      this.loading = false;

      if (response.status == 200)  {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro eliminado con éxito',
          detail: response.menssage,
        });
       
        this.displayDialogDeleted = false;
        this.getAllCategoryByCompany();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response.menssage,
        });
      }
    });
  }

  closedDialog() {
    this.displayDialogDeleted = false;
  }

  generateCode() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.categoryForm.controls.code.setValue(result);
    return result;
  }

  saveCategory(categoryForm: FormGroup) {
    let categoryData = categoryForm.value;
    console.log("categoryData ", categoryData);
    this.loading = true;
    this.categoryService.addCategory(categoryData).subscribe((response) => {
      this.loading = false;
      if (response.status == 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro exitoso',
          detail: response.menssage,
        });
        this.categoriesPlace.push(response.data);
        this.clearInputForm();
        this.displayModal = false;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response.menssage,
        });
      }
    });
  }

  updateCategory(categoryId: string, categoryForm: FormGroup) {
    this.loading = true;
    this.categoryService.updateCategory(categoryId, categoryForm.value).pipe(
      finalize(() => this.loading = false)
    ).subscribe((response) => {
      if (response.status == 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro exitoso',
          detail: response.menssage,
        });
        this.getAllCategoryByCompany();
        this.displayModal = false;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response.menssage,
        });
      }
    });
  }

  clearInputForm() {
    this.categoryForm.controls.name.setValue('');
    this.categoryForm.controls.description.setValue('');
    this.categoryId = '';
  }


}
