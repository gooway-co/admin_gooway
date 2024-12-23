import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './ui/admin/layout/layout.component';
import { AuthGuard } from './ui/core/guards/auth.guard'; // Importa el guard

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./ui/public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'admin',
    component: LayoutComponent,  
    //canActivate: [AuthGuard],
    loadChildren: () => import('./ui/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
