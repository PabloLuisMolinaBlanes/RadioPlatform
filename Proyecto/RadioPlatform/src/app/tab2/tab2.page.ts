import { Component, OnInit } from '@angular/core';
import { RadioSet } from '../radioset';
import {FirebaseObtainerService} from '../firebase-obtainer.service'
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { ModalController } from '@ionic/angular';
import {AngularFireDatabase} from '../../../node_modules/@angular/fire/database'
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
  constructor(private firebaseObtainerService: FirebaseObtainerService, public modalController: ModalController, public storage: Storage,public afDatabase: AngularFireDatabase, public auth: AngularFireAuth) {}
  async ngOnInit() {
    this.radiosetsVisible = this.radiosetsTotal;
    this.auth.currentUser.then(user => {
        this.afDatabase.database.ref("users/"+user.uid+"/equipment").on("child_added", function (childsnapshot) {
          this.radiosetsTotal.push(childsnapshot.val() as unknown as RadioSet);
          this.radiosetsVisible = this.radiosetsTotal;
          this.storage.set('equipment', this.radiosetsVisible);
        }, () => {console.log("error here")}, this);
    });
   await this.storage.create();
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
