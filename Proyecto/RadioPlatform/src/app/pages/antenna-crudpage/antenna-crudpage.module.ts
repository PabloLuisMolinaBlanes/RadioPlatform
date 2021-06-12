import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AntennaCRUDPagePageRoutingModule } from './antenna-crudpage-routing.module';

import { AntennaCRUDPagePage } from './antenna-crudpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AntennaCRUDPagePageRoutingModule
  ],
  declarations: [AntennaCRUDPagePage]
})
export class AntennaCRUDPagePageModule {}
