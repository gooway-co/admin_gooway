import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/ui/core/shared/prime-ng/prime-ng.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ProfileBarComponent } from './profile-bar/profile-bar.component';



@NgModule({
  declarations: [SideBarComponent, ProfileBarComponent],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports:[
    SideBarComponent,
    ProfileBarComponent
  ]
})
export class LayoutComponentsModule { }