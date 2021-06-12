import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab7PageRoutingModule } from './tab7-routing.module';

import { Tab7Page } from './tab7.page';
import { RadiosetitemComponent } from '../../components/radiosetitem/radiosetitem.component';
import {AntennaitemComponent} from '../../components/antennaitem/antennaitem.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab7PageRoutingModule
  ],
  declarations: [Tab7Page, RadiosetitemComponent, AntennaitemComponent]
})
export class Tab7PageModule {}
