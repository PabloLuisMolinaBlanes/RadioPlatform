import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PricecalculatorPageRoutingModule } from './pricecalculator-routing.module';

import { PricecalculatorPage } from './pricecalculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PricecalculatorPageRoutingModule
  ],
  declarations: [PricecalculatorPage]
})
export class PricecalculatorPageModule {}
