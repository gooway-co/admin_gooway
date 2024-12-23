import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Place } from 'src/app/domain/models/place/place.interface';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/domain/models/category/category.model';
import { CategoryService } from 'src/app/infrastructure/services/category/category.service';
import { ChangeDetectorRef } from '@angular/core';
import { CategoryPlacesService } from 'src/app/infrastructure/services/category-places/category.service';
import { EventService } from 'src/app/infrastructure/services/event/events-api.service';

interface SelectedImage {
  file: File;
  preview: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [MessageService],
})
export class EventsComponent implements OnInit {
  places: Place[] = [];
  displayModal: boolean = false;
  checkUpdateOrSave: boolean = false;
  eventForm: FormGroup;
  displayDialogDeleted = false;
  placeId = '';
  selectedImages: { file: File; preview: string }[] = [];
  categories: Category[] = [];
  loading: boolean = false;

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
    private eventService: EventService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private cd: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllPlaceByCompany();
    this.loading = false;
  }



  getAllPlaceByCompany() {
    this.eventService.getEvents().subscribe((value) => {
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
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      images: [[]], // Corrección de 'imagess' a 'images'
      description: ['', Validators.required],
      longitud: ['', Validators.required],
      latitud: ['', Validators.required],
      autor: [''],
      openingDate: [null],
      endDate:  [null],
      dedication: [''],
      invite: [''],
      address: ['', Validators.required],
    });
  }

  async validateForm(eventForm: FormGroup) {
    eventForm.markAllAsTouched();
    let validForm = eventForm.valid;

    if (validForm) {
      this.checkUpdateOrSave
        ? this.updateEvent(this.placeId, eventForm)
        : this.saveEvent(eventForm);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Campos obligatorios',
        detail: 'Todos los campos son requeridos',
      });
    }
  }

  edit(event: any) {
    this.eventForm.controls.name.setValue(event.name);
    this.eventForm.controls.description.setValue(event.description);
    this.eventForm.controls.images.setValue(event.images);
    this.eventForm.controls.longitud.setValue(event.longitud);
    this.eventForm.controls.latitud.setValue(event.latitud);

    this.eventForm.controls.autor.setValue(event.autor);
    this.eventForm.controls.openingDate.setValue(event.openingDate);
    this.eventForm.controls.endDate.setValue(event.endDate);
    this.eventForm.controls.invite.setValue(event.invite);
    this.eventForm.controls.address.setValue(event.address);
    this.eventForm.controls.dedication.setValue(event.dedication);
    this.checkUpdateOrSave = true;
    this.placeId = event._id;
  }

  delete(event: any) {
    this.placeId = event._id;
  }

  deleteDocument() {
    this.loading = true;
    this.eventService.delete(this.placeId).subscribe((response) => {
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

  saveEvent(eventForm: FormGroup) {
    let eventData = eventForm.value;
    console.log("eventData : eventData");
    const formData = new FormData();

    if (
      eventData.openingDate === null || eventData.endDate == null ||
      eventData.openingDate === '' || eventData.endDate === '' ||
      eventData.openingDate === 'null' ||  eventData.endDate  === 'null'
    ) {
      delete eventData.openingDate;
      delete eventData.endDate;

    } else {
      eventData.openingDate = new Date(eventData.openingDate);
      eventData.openingDate = new Date(eventData.endDate);

    }

    Object.keys(eventData).forEach((key) => {
      formData.append(key, eventData[key]);
    });
   

    this.selectedImages.forEach((imageObj) => {
      formData.append('images', imageObj.file);
    });

    this.loading = true;

    this.eventService.create(formData).subscribe(
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

  updateEvent(id: string, eventForm: FormGroup) {
    const eventData = eventForm.value;
    this.loading = true;

    this.eventService.update(id, eventData).subscribe(
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


  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
  }

  closedDialog() {
    this.displayDialogDeleted = false;
  }

  clearInputForm() {
    this.selectedImages = [];
    this.eventForm.reset();
  }

  hideWindow() {
    this.clearInputForm();
    this.displayModal = !this.displayModal;
    this.checkUpdateOrSave = false;
  }
}
