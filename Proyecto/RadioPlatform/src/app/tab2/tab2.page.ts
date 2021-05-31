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
favouriteRadioSet: string;
amplitude: number;
name: string;
type: string;
brand: string;
isadmin: boolean = false;
  constructor(private firebaseObtainerService: FirebaseObtainerService, public modalController: ModalController, public storage: Storage,public afDatabase: AngularFireDatabase, public auth: AngularFireAuth) {}
  async ngOnInit() {
    this.radiosetsVisible = this.radiosetsTotal;
    this.auth.currentUser.then(user => {
        this.afDatabase.database.ref("users/"+user.uid+"/equipment").on("child_added", function (childsnapshot) {
          this.radiosetsTotal.push(childsnapshot.val() as unknown as RadioSet);
          this.radiosetsVisible = this.radiosetsTotal;
          this.storage.set('equipment', this.radiosetsVisible);
        }, () => {console.log("error here")}, this);
        this.afDatabase.database.ref("users/"+user.uid+"/equipment").on("child_changed", function (childsnapshot) {
          var child = childsnapshot.val() as unknown as RadioSet;
          console.log("detected change");
          this.radiosetsVisible.forEach(ant => {
            console.log(ant);
            if (child.id === ant.id || ant.id === "placeholder") {
              console.log("found radioset");
              ant.name = child.name;
              ant.type = child.type;
              ant.brand = child.brand;
              ant.amplitude = child.amplitude;
              ant.price = child.price;
              ant.id = child.id;
            }
          });
          this.radiosetsTotal = this.radiosetsVisible;
          this.storage.set('antennae', this.radiosetsTotal);
        }, () => {console.log("error here")}, this);
        this.afDatabase.database.ref("users/"+user.uid+"/equipment").on("child_removed", function (childsnapshot) {
          var child = childsnapshot.val() as unknown as RadioSet
          console.log("detected deleted");
          this.radiosetsVisible.forEach(ant => {
            if (child.id === ant.id) {
              console.log("found deleted radioset");
              this.radiosetsVisible = this.radiosetsVisible.filter(antenna => antenna !== ant);
            }
          });
          this.radiosetsTotal = this.radiosetsVisible;
          this.storage.set('antennae', this.radiosetsTotal);
        }, () => {console.log("error here")}, this);
        this.afDatabase.database.ref("users/"+user.uid+"/favouriteRadioSet").on("value", function (childsnapshot) {
          this.favouriteRadioSet = childsnapshot.val() as unknown as string;
          console.log("done");
      }, () => {console.log("error here")}, this)
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
updateArray() {
  this.radiosetsVisible = this.radiosetsTotal.filter(this.filterAntennae, this);
}
filterAntennae = function(radioset: RadioSet) {
  if ((this.name === undefined || radioset.name === this.name) && (this.brand === undefined || radioset.brand === this.brand) &&  (this.type === undefined || radioset.type === this.type) && (this.amplitude === undefined || radioset.amplitude === this.amplitude)) {
    return true;
  } else {
    return false;
}
}
}
