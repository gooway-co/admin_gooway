import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardActionCreateComponent } from './card-action-create/card-action-create.component';
import { PrimeNgModule } from 'src/app/ui/core/shared/prime-ng/prime-ng.module';
import { CardGeneralComponent } from './card-general/card-general.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CampaignTypeComponent } from './campaign-type/campaign-type.component';
import { TableGeneralComponent } from './table-general/table-general.component';
import { MaterialNgModule } from 'src/app/ui/core/shared/material/google-material.module';
import { TruncateTextPipe } from '../../core/pipes/textShor.pipe';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [CardActionCreateComponent, CardGeneralComponent, CampaignTypeComponent, TableGeneralComponent, LoadingSpinnerComponent, TruncateTextPipe],
  imports: [
    CommonModule,
    PrimeNgModule,
    MaterialNgModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  exports: [
    CardActionCreateComponent,
    CardGeneralComponent,
    CampaignTypeComponent,
    TableGeneralComponent,
    LoadingSpinnerComponent
  ]
})
export class FlayerComponentGlobalModule { }
