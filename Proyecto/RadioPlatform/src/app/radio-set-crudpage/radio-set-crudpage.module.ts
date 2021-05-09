import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RadioSetCRUDPagePageRoutingModule } from './radio-set-crudpage-routing.module';

import { RadioSetCRUDPagePage } from './radio-set-crudpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RadioSetCRUDPagePageRoutingModule
  ],
  declarations: [RadioSetCRUDPagePage]
})
export class RadioSetCRUDPagePageModule {}
