import { Component, OnInit } from '@angular/core';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import * as firebase from 'firebase';
import { Antenna } from '../antenna';
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
import {ModalController} from '@ionic/angular'
import {FirebaseObtainerService} from '../firebase-obtainer.service'
import {AngularFireDatabase} from '../../../node_modules/@angular/fire/database'
import {AntennaCRUDPagePage} from '../antenna-crudpage/antenna-crudpage.page'
import { PricecalculatorPage } from '../pricecalculator/pricecalculator.page';
import {Storage} from '@ionic/storage'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
antennaeVisible: Antenna[] = [];
antennaeTotal: Antenna[] = [];
allAntennae: Promise<DataSnapshot>;
name: string;
brand: string;
type: string;
height: number;
price: number;
  constructor(private firebaseObtainerService: FirebaseObtainerService,public modalController: ModalController, public storage: Storage,public afDatabase: AngularFireDatabase, public auth: AngularFireAuth) {}
  async ngOnInit() {
    this.antennaeVisible = this.antennaeTotal;
    this.auth.currentUser.then(user => {
      this.afDatabase.database.ref("users/"+user.uid+"/antennae").on("child_added", function (childsnapshot) {
        this.antennaeTotal.push(childsnapshot.val() as unknown as Antenna);
        this.antennaeVisible = this.antennaeTotal;
        this.storage.set('antennae', this.antennaeTotal);
      }, () => {console.log("error here")}, this);
        this.antennaeTotal = [];
    });
    await this.storage.create();
  }
  async presentModal(){
    const modal = await this.modalController.create({
      component:AntennaCRUDPagePage,
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
    this.antennaeVisible = this.antennaeTotal.filter(this.filterAntennae, this);
  }
  filterAntennae = function(antenna: Antenna) {
    if ((this.name === undefined || antenna.name === this.name) && (this.brand === undefined || antenna.brand === this.brand) &&  (this.type === undefined || antenna.type === this.type) && (this.height === undefined || antenna.height === this.height)) {
      return true;
    } else {
      return false;
  }

  }
}
