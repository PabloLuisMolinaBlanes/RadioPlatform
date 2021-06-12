import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab6PageRoutingModule } from './tab6-routing.module';

import { Tab6Page } from './tab6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab6PageRoutingModule
  ],
  declarations: [Tab6Page]
})
export class Tab6PageModule {}
