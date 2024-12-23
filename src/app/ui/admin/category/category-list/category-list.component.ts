import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../infrastructure/services/category/category.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [MessageService],
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  displayModal: boolean = false;
  checkUpdateOrSave: boolean = false;
  categoryForm: FormGroup;
  displayDialogDeleted = false;
  categoryId = '';
  selectedImage: { file: any; preview: string } | null = null; // Inicialización correcta
  preview = "";
  safeImageUrl: SafeResourceUrl | null = null;

  rowTable = [
    { field: 'name', header: 'Name', style: 'width: 100px', type: 'text' },
    { field: 'description', header: 'Description', style: 'width: 200px', type: 'text' },
    { field: 'create_at', header: 'Date', style: 'width: 50px', type: 'date' },
    { action: [{ edit: true }, { delete: true }, { activate: false }] },
  ];

  constructor(
    private categoryService: CategoryService,
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
    this.categoryService.getCategories().subscribe((value) => {
      if (value.status === 200 || value.status === 400 ) {
        this.categories = value.data;
     
      } else if (value.status === 500) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar categorías',
          detail: 'Se produjo un error inesperado al intentar cargar las categorías. Intente nuevamente más tarde.',
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
      image: [''],
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
    this.categoryForm.controls.image.setValue(event.image);


    this.preview = event.image;
    this.checkUpdateOrSave = true;
    this.categoryId = event._id;
  }

  delete(event: any) {
    this.categoryId = event._id;
  }

  deleteDocument() {
    this.categoryService.deleteCategory(this.categoryId).subscribe((response) => {
      if (response.status == 200 ||response.status == 400) {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro eliminado con éxito',
          detail: response.menssage,
        });
        this.getAllCategoryByCompany();
        this.displayDialogDeleted = false;
      } else if (response.status == 500) {
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
    const formData = new FormData();

    Object.keys(categoryData).forEach((key) => {
      formData.append(key, categoryData[key]);
    });

    if (this.selectedImage) {
      formData.append('image', this.selectedImage.file); 
    }

    this.categoryService.addCategory(formData).subscribe((response) => {
      if (response.status == 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro exitoso',
          detail: response.menssage,
        });
        this.getAllCategoryByCompany();
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
    this.categoryService.updateCategory(categoryId, categoryForm.value).subscribe((response) => {
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
    this.categoryForm.controls.image.setValue('');
    this.categoryId = '';
    this.selectedImage = null; 
    this.preview = '';
    this.safeImageUrl = null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // Tomamos solo el primer archivo
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.selectedImage = {
          file: file,
          preview: e.target.result,
        };

        this.safeImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.preview = '';
    this.safeImageUrl = null;
    this.selectedImage = null; // Resetear selectedImage al quitar la imagen
  }
}
