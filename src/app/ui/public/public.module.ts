import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrimeNgModule } from '../core/shared/prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ]
})
export class PublicModule { }
