import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponentsModule } from './layout/components/layout-component.module';
import { LayoutComponent } from './layout/layout.component';
import { FlayerComponentGlobalModule } from './components/flayer-component-global.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrimeNgModule } from '../core/shared/prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TecniAdminSchoolRoutingModule } from './admin-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { CategoryFormComponent } from './category/components/category-form/category-form.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { PlacesComponent } from './places/places.component';
import { PartnersComponent } from './partners/partners.component'
import { CategoryPlaceComponent } from './category-places/category-list/category-list.component';
import { EventsComponent } from './events/events.component';
// import { SettingModule } from './setting/setting.module';


@NgModule({
  declarations: [
    LayoutComponent,  
    DashboardComponent, 
    CategoryFormComponent,
    CategoryListComponent,
    CategoryPlaceComponent,
    PlacesComponent,
    PartnersComponent,
    EventsComponent
  ],
  imports: [
    CommonModule,
    LayoutComponentsModule,
    TecniAdminSchoolRoutingModule,
    FlayerComponentGlobalModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports:[
    LayoutComponent,
    DashboardComponent,
    CategoryFormComponent,
    CategoryListComponent,
    CategoryPlaceComponent,
    PartnersComponent,
    EventsComponent
  ],

  // providers:[
  //   TeacherUseCases,
  //   {
  //     provide: TeacherGetaway,
  //     useClass: TeacherApiService
  //   }
  // ]
  
})
export class AdminModule { }
