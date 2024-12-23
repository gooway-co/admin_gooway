import {
  Component,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
//import { DocumentEditorContainer } from '@syncfusion/ej2-documenteditor';
//import { MenuService } from 'src/app/services/menu.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SideBarComponent {
  @Output() onBooleanOut: EventEmitter<boolean> = new EventEmitter();
  
  booleanClick: boolean = true;

  menu: any = [
    {
      route: '/admin/dashboard',
      text: 'Dashboard',
      icon: 'fa-solid fa-grip',
      tooltip: 'Dashboard'
    },
    {
      route: '/admin/categories',
      text: 'Categoria',
      icon: 'pi pi-sitemap',
      tooltip: 'Categoria',
    },
    {
      route: '/admin/categoriesPlaces',
      text: 'Categoria lugares',
      icon: 'pi pi-sitemap',
      tooltip: 'Categoria',
    },
    {
      route: '/admin/events',
      text: 'Eventos',
      icon: 'pi pi-sitemap',
      tooltip: 'Eventos',
    },
    {
      route: '/admin/lugares',
      text: 'Lugares',
      icon: 'pi pi-map-marker',
      tooltip: 'Lugares',
    },
    {
      route: '/admin/Aliados',
      text: 'Aliados',
      icon: 'pi pi-users',
      tooltip: 'Aliados',
    }
  ];
  
  constructor(
    //private _menuService: MenuService
  ) {}

  ngOnInit(): void {

  }

  onClickButton(index: any, item: any) {
    this.onBooleanOut.emit(this.booleanClick);
  }
}