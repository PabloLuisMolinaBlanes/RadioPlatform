import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ContactCRUDPagePageRoutingModule } from './contact-crudpage-routing.module';

import { ContactCRUDPagePage } from './contact-crudpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactCRUDPagePageRoutingModule
  ],
  declarations: [ContactCRUDPagePage]
})
export class ContactCRUDPagePageModule {}
