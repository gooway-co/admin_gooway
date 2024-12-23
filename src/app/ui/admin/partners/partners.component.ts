import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Place } from 'src/app/domain/models/place/place.interface';
import { MessageService } from 'primeng/api';
import { PartnersService } from 'src/app/infrastructure/services/partners/partners-api.service';
import { Category } from 'src/app/domain/models/category/category.model';
import { CategoryService } from 'src/app/infrastructure/services/category/category.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface SelectedImage {
  file: File;
  preview: string;
}
@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
  providers: [MessageService],
})
export class PartnersComponent implements OnInit {

  partners: Place[] = [];
  displayModal: boolean = false;
  checkUpdateOrSave: boolean = false;
  partnerForm: FormGroup;
  displayDialogDeleted = false;
  partnerId = '';
  categories: Category[] = [];
  selectedImage: { file: any; preview: string } | null = null; // Inicialización correcta
  selectedImages: { file: File; preview: string }[] = [];

  preview = "";
  safeImageUrl: SafeResourceUrl | null = null;
  loading: boolean = false;


  rowTable = [
    { field: 'name', header: 'Nombre', style: 'width: 100px', type: 'text' },
    {
      field: 'description',
      header: 'Descripción',
      style: 'width: 10px',
      type: 'text',
    },

    { field: 'create_at', header: 'Fecha', style: 'width: 50px', type: 'date' },
    { action: [{ edit: true }, { delete: true }, { activate: false }] },
  ];

  constructor(
    private partnersService: PartnersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private sanitizer: DomSanitizer
  ) {}

  ngAfterViewInit(): void {
    this.initForm();
  }

  ngOnInit(): void {
    
    this.getAllPartnersByCompany();
    this.getAllCategoryByCompany();
  }

  getAllCategoryByCompany() {
    this.categoryService.getCategories().subscribe((value) => {
      if ((value.status = 200)) {
        this.categories = value.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ha ocurrido un error al cargar las categorías',
        });
      }
    });
  }

  getAllPartnersByCompany() {
    this.partnersService.getPartnersByCompany().subscribe((value) => {
      if ((value.status = 200)) {
        this.partners = value.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: value.menssage,
        });
      }
    });
  }

  editPartners(id: string): void {
    this.router.navigate([`/Partners/${id}`]);
  }

  crearPartners(): void {
    this.router.navigate(['admin/Partners']);
  }

  hideWindow() {
    this.displayModal = !this.displayModal;
    this.checkUpdateOrSave = false;
    this.clearInputForm();
  }

  initForm() {
    this.partnerForm = this.formBuilder.group({
      name: ['', Validators.required],
      longitud: [0],
      latitud: [0],
      images: [''], // Corrección de 'imagess' a 'images'
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      phone: [0],
      whatsapp: [0],
      email: [''],
      link: ['', Validators.required], 
      address: ['', Validators.required],
    });
  }

  async validateForm(partnerForm: FormGroup) {
    partnerForm.markAllAsTouched();
    let validForm = partnerForm.valid;

    if (validForm) {
      this.checkUpdateOrSave
        ? this.updatePartners(this.partnerId, partnerForm)
        : this.savePartners(partnerForm);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Campos obligatorios',
        detail: 'Todos los campos son requeridos',
      });
    }
  }

  edit(event: any) {
    this.partnerForm.controls.name.setValue(event.name);
    this.partnerForm.controls.description.setValue(event.description);
    this.partnerForm.controls.images.setValue(event.images);
    this.partnerForm.controls.phone.setValue(event.phone);
    this.partnerForm.controls.whatsapp.setValue(event.whatsapp);
    this.partnerForm.controls.address.setValue(event.address);
    this.partnerForm.controls.link.setValue(event.link);
    this.partnerForm.controls.categoryId.setValue(event.categoryId);
    this.partnerForm.controls.longitud.setValue(event.longitud);
    this.partnerForm.controls.latitud.setValue(event.latitud);
    this.partnerForm.controls.email.setValue(event.email);
    this.preview = event.image;
    this.checkUpdateOrSave = true;

    this.checkUpdateOrSave = true;
    this.partnerId = event._id;
  }

  delete(event: any) {
    this.partnerId = event._id;
  }

  deleteDocument() {
    this.loading = true;

    this.partnersService
      .deletePartners(this.partnerId)
      .subscribe((response) => {
        this.loading = false;

        if (response.status == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Registro eliminado con éxito',
            detail: response.menssage,
          });
          this.getAllPartnersByCompany();
          this.displayDialogDeleted = false;
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

  clearInputForm() {
    this.partnerForm.reset();
    this.selectedImage = null; 
    this.preview = '';
    this.safeImageUrl = null;
  }

  savePartners(partnerForm: FormGroup) {
    let partnerData = partnerForm.value;
    
    partnerData.longitud = partnerData.longitud || 0;
    partnerData.latitud = partnerData.latitud || 0;
    partnerData.phone = partnerData.phone || 0;
    partnerData.whatsapp = partnerData.whatsapp || 0;
    partnerData.email = partnerData.email || "";


    const formData = new FormData();

    Object.keys(partnerData).forEach((key) => {
      if (key !== 'images') {
        formData.append(key, partnerData[key]);
      }
    });
  
    this.selectedImages.forEach((imageObj) => {
      formData.append('images', imageObj.file);
    });

    this.loading = true;

    this.partnersService.addPartners(formData).subscribe(
      (response) => {
        this.loading = false;

        if (response.status == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'aliado creado correctamente',
          });
  
          this.hideWindow();
          this.getAllPartnersByCompany();
          
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response.message,
          });
        }
      },
      (error) => {
        this.loading = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ha ocurrido un error al crear el aliado',
        });
      }
    );
  }

  updatePartners(id: string, partnerForm: FormGroup) {
    const placeData = partnerForm.value;
    this.loading = true;
    this.partnersService.updatePartners(id, placeData).subscribe(
      (response) => {
        this.loading = false;

        if (response.status == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'aliado actualizado correctamente',
          });
          this.getAllPartnersByCompany();
          this.hideWindow();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response.message,
          });
        }
      },
      (error) => {
        this.loading = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ha ocurrido un error al actualizar el aliado',
        });
      }
    );
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const files = Array.from(input.files);
      const imagePromises = files.map((file) => {
        return new Promise<SelectedImage>((resolve) => {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            resolve({
              file: file,
              preview: e.target.result,
            });
          };

          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then((newImages) => {
        this.selectedImages = [...this.selectedImages, ...newImages];
      });
    }
  }

  handleAudioFileInput(files: any) {
    if (files && files.length > 0) {
      const audioFile = files[0];
      const validAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3'];

      if (!validAudioTypes.includes(audioFile.type)) {
        alert('Formato de archivo no válido. Solo se permiten archivos de audio en formato MP3 o WAV.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.partnerForm.patchValue({
          audio: audioFile
        });
      };

      reader.readAsArrayBuffer(audioFile);
    }
  }


  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
  }
}
