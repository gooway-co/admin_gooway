import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CategoryListComponent } from "./category/category-list/category-list.component";
import { PlacesComponent } from "./places/places.component";
import { PartnersComponent } from "./partners/partners.component";
import { CategoryPlaceComponent } from "./category-places/category-list/category-list.component";
import { EventsComponent } from "./events/events.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
      {
        path: 'categories',
        component: CategoryListComponent,
        data: { title: "Categories" }
      },
      {
        path: 'categoriesPlaces',
        component: CategoryPlaceComponent,
        data: { title: "Categories" }
      },
      {
        path: 'events',
        component: EventsComponent 
      },
      {
        path: 'lugares',
        component: PlacesComponent 
      },
      {
        path: 'Aliados',
        component: PartnersComponent,
      },
      {
        path: '', // Añadir esta línea para redirigir desde 'admin' a 'dashboard'
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TecniAdminSchoolRoutingModule { }
