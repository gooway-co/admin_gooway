import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthLoggedGuard } from '../core/guards/auth-logged.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { text: 'Inicio de sesión' },
        //canActivate: [AuthLoggedGuard]
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ],

  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule { }