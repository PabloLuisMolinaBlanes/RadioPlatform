import { Component, OnInit } from '@angular/core';
import { RadioSet } from '../radioset';
import {FirebaseObtainerService} from '../firebase-obtainer.service'
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { ModalController } from '@ionic/angular';
import {RadioSetCRUDPagePage} from '../radio-set-crudpage/radio-set-crudpage.page'
import { PricecalculatorPage } from '../pricecalculator/pricecalculator.page';
import {Storage} from '@ionic/storage'
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
radiosetsVisible: RadioSet[] = [];
radiosetsTotal: RadioSet[] = [];
allEquipment: Promise<DataSnapshot>
  constructor(private firebaseObtainerService: FirebaseObtainerService, public modalController: ModalController, public storage: Storage) {}
  ngOnInit() {
    this.radiosetsVisible = this.radiosetsTotal;
    this.storage.create();
    this.allEquipment = this.firebaseObtainerService.listAllRadioSets();
    this.allEquipment.then(m => {
      m.forEach(antenna => {this.radiosetsVisible.push(antenna.val() as unknown as RadioSet)
      });
      this.storage.set('equipment', this.radiosetsTotal); 
    });
  }
  async presentModal(){
    const modal = await this.modalController.create({
      component:RadioSetCRUDPagePage,
      cssClass: 'placeholder'
    });
    return await modal.present();
}
async presentCalculator(){
  const modal = await this.modalController.create({
    component:PricecalculatorPage,
    cssClass: 'placeholder',
  });
  return await modal.present();
}
}
