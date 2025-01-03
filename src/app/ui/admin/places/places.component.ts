import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Place } from 'src/app/domain/models/place/place.interface';
import { MessageService } from 'primeng/api';
import { PlaceService } from 'src/app/infrastructure/services/place/place-api.service';
import { Category } from 'src/app/domain/models/category/category.model';
import { CategoryService } from 'src/app/infrastructure/services/category/category.service';
import { ChangeDetectorRef } from '@angular/core';
import { CategoryPlacesService } from 'src/app/infrastructure/services/category-places/category.service';

interface SelectedImage {
  file: File;
  preview: string;
}

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  providers: [MessageService],
})
export class PlacesComponent implements OnInit {
  places: Place[] = [];
  displayModal: boolean = false;
  checkUpdateOrSave: boolean = false;
  placeForm: FormGroup;
  displayDialogDeleted = false;
  placeId = '';
  selectedImages: { file: File; preview: string }[] = [];
  categories: Category[] = [];
  loading: boolean = false;
  audioFileBase64: string;
  nameAudioFile = '';

  rowTable = [
    { field: 'name', header: 'Nombre', style: 'width: 100px', type: 'text' },
    {
      field: 'description',
      header: 'Descripción',
      style: 'width: 10px',
      type: 'text',
    },
    {
      field: 'longitud',
      header: 'Longitud',
      style: 'width: 50px',
      type: 'number',
    },
    {
      field: 'latitud',
      header: 'latitud',
      style: 'width: 50px',
      type: 'number',
    },

    { field: 'create_at', header: 'Fecha', style: 'width: 50px', type: 'date' },
    { action: [{ edit: true }, { delete: true }, { activate: false }] },
  ];

  constructor(
    private placeService: PlaceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private cd: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllPlaceByCompany();
    this.getAllCategoryByCompany();
    this.loading = false;
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

  getAllPlaceByCompany() {
    this.placeService.getPlacesByCompany().subscribe((value) => {
      if ((value.status = 200)) {
        this.places = value.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: value.menssage,
        });
      }
    });
  }

  editPlace(id: string): void {
    this.router.navigate([`/Place/${id}`]);
  }

  crearPlace(): void {
    this.router.navigate(['admin/Place']);
  }

  initForm() {
    this.placeForm = this.formBuilder.group({
      name: ['', Validators.required],
      images: [[]], // Corrección de 'imagess' a 'images'
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      longitud: ['', Validators.required],
      latitud: ['', Validators.required],
      autor: [''],
      openingDate: [null],
      dedication: [''],
      reference: [''],
      referencePhoto: [''],
      mainTypology: [''],
      secondaryTypology: [''],
      advocacy: [''],
      audio: [''],
      address: ['', Validators.required],
    });
  }

  async validateForm(placeForm: FormGroup) {
    placeForm.markAllAsTouched();
    let validForm = placeForm.valid;

    if (validForm) {
      this.checkUpdateOrSave
        ? this.updatePlace(this.placeId, placeForm)
        : this.savePlace(placeForm);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Campos obligatorios',
        detail: 'Todos los campos son requeridos',
      });
    }
  }

  edit(event: any) {
    this.placeForm.controls.name.setValue(event.name);
    this.placeForm.controls.description.setValue(event.description);
    this.placeForm.controls.images.setValue(event.images);
    this.placeForm.controls.longitud.setValue(event.longitud);
    this.placeForm.controls.latitud.setValue(event.latitud);

    this.placeForm.controls.autor.setValue(event.autor);
    this.placeForm.controls.openingDate.setValue(event.openingDate);
    this.placeForm.controls.referencePhoto.setValue(event.referencePhoto);
    this.placeForm.controls.reference.setValue(event.reference);
    this.placeForm.controls.mainTypology.setValue(event.mainTypology);
    this.placeForm.controls.secondaryTypology.setValue(event.secondaryTypology);
    this.placeForm.controls.advocacy.setValue(event.advocacy);
    this.placeForm.controls.address.setValue(event.address);
    this.placeForm.controls.dedication.setValue(event.dedication);
    this.placeForm.controls.categoryId.setValue(event.categoryId);
    this.checkUpdateOrSave = true;
    this.placeId = event._id;
  }

  delete(event: any) {
    this.placeId = event._id;
  }

  deleteDocument() {
    this.loading = true;
    this.placeService.deletePlace(this.placeId).subscribe((response) => {
      this.loading = false;

      if (response.status == 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro eliminado con éxito',
          detail: response.menssage,
        });
        this.getAllPlaceByCompany();
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

  savePlace(placeForm: FormGroup) {
    let placeData = placeForm.value;
    const formData = new FormData();

    if (
      placeData.openingDate === null ||
      placeData.openingDate === '' ||
      placeData.openingDate === 'null'
    ) {
      delete placeData.openingDate;
    } else {
      placeData.openingDate = new Date(placeData.openingDate);
    }

    Object.keys(placeData).forEach((key) => {
      if (key !== 'audio') {
        formData.append(key, placeData[key]);
      }
    });

    if (this.audioFileBase64) {
      formData.append('audio', this.audioFileBase64); // Agregar el archivo de audio
    }

    this.selectedImages.forEach((imageObj) => {
      formData.append('images', imageObj.file);
    });

    this.loading = true;

    this.placeService.addPlace(formData).subscribe(
      (response) => {
        this.loading = false;

        if (response.status == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Lugar creado correctamente',
          });
          this.hideWindow();
          this.getAllPlaceByCompany();
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
          detail: 'Ha ocurrido un error al crear el lugar',
        });
      }
    );
  }

  updatePlace(id: string, placeForm: FormGroup) {
    const placeData = placeForm.value;
    this.loading = true;

    this.placeService.updatePlace(id, placeData).subscribe(
      (response) => {
        this.loading = false;

        if (response.status == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Lugar actualizado correctamente',
          });
          this.getAllPlaceByCompany();
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
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ha ocurrido un error al actualizar el lugar',
        });
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const files = Array.from(input.files); // Convierte a array
      const imagePromises = files.map((file) => {
        return new Promise<SelectedImage>((resolve) => {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            resolve({
              file: file,
              preview: e.target.result, // Guardamos la URL de la miniatura
            });
          };

          reader.readAsDataURL(file); // Leer el archivo como Data URL
        });
      });

      Promise.all(imagePromises).then((newImages) => {
        this.selectedImages = [...this.selectedImages, ...newImages]; // Nueva referencia
        this.cd.detectChanges(); // Forzar detección de cambios
      });
    }
  }

  handleAudioFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const files = input.files;
      const audioFile = files[0]; 

      this.nameAudioFile = audioFile.name;

      const validAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3'];

      if (!validAudioTypes.includes(audioFile.type)) {
        alert(
          'Formato de archivo no válido. Solo se permiten archivos de audio en formato MP3 o WAV.'
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Audio = reader.result as string;
        this.audioFileBase64 = base64Audio;
      };

      reader.readAsDataURL(audioFile);
    }
  }

  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
  }

  closedDialog() {
    this.displayDialogDeleted = false;
  }

  clearInputForm() {
    this.selectedImages = [];
    this.placeForm.reset();
    this.nameAudioFile = '';
    this.audioFileBase64 = '';
  }

  hideWindow() {
    this.clearInputForm();
    this.displayModal = !this.displayModal;
    this.checkUpdateOrSave = false;
  }
}
