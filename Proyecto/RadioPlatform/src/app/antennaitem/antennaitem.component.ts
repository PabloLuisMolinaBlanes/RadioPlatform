import { Component, Input, OnInit } from '@angular/core';
import { Antenna } from '../antenna';
import {AlertController} from '@ionic/angular'
import {ModalController} from '@ionic/angular'
import {AntennaCRUDPagePage} from '../antenna-crudpage/antenna-crudpage.page'
import {FirebaseUpdaterAndSetterService} from '../firebase-updater-and-setter.service'
@Component({
  selector: 'app-antennaitem',
  templateUrl: './antennaitem.component.html',
  styleUrls: ['./antennaitem.component.scss'],
})
export class AntennaitemComponent implements OnInit {
@Input() antenna: Antenna;
@Input() antennae: Antenna[];
@Input() favouriteAntenna: string;
@Input() isadmin: boolean;
  constructor(public modalController: ModalController, public alertCtrl: AlertController, public firebaseUpdaterAndSetter: FirebaseUpdaterAndSetterService) { 
  }
  ngOnInit() {
    setTimeout(() => {
      this.antennae.forEach(ant => {
        var test = ant.id + ' ' + ant.name + ' ' + ant.brand;
        if (test === this.favouriteAntenna) {
          ant.isfavourite = true;
        }
      })
    }, 2000)
  }
  async presentModalModifyUser(antenna: Antenna){
    const modal = await this.modalController.create({
      component:AntennaCRUDPagePage,
      cssClass: 'placeholder',
      componentProps: {
        'id': antenna.id,
        'type': antenna.type,
        'name': antenna.name,
        'range': antenna.range,
        'height': antenna.height,
        'brand': antenna.brand,
        'price': antenna.price,
        'isadmin': false
      }
    });
    return await modal.present();
  }
  async presentModalModify(antenna: Antenna){
    const modal = await this.modalController.create({
      component:AntennaCRUDPagePage,
      cssClass: 'placeholder',
      componentProps: {
        'id': antenna.id,
        'type': antenna.type,
        'name': antenna.name,
        'range': antenna.range,
        'height': antenna.height,
        'brand': antenna.brand,
        'price': antenna.price,
        'isadmin': true
      }
    });
    return await modal.present();
  }
  async presentDeleteConfirmationUser(antenna: Antenna) {
    let alert = this.alertCtrl.create({
      message: 'Are you sure you want to delete ' + antenna.name + '?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {text:'Delete',
      handler: () => {
          this.firebaseUpdaterAndSetter.deleteAntennaUser(antenna);
      }
      }
    ]
    });
    
    (await alert).present();
  }
  async presentDeleteConfirmation(antenna: Antenna) {
    let alert = this.alertCtrl.create({
      message: 'Are you sure you want to delete ' + antenna.name + '?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {text:'Delete',
      handler: () => {
          this.firebaseUpdaterAndSetter.deleteAntennaUser(antenna);
      }
      }
    ]
    });
    
    (await alert).present();
  }
  sendFavouriteData(antenna: Antenna) {
    if (antenna.isfavourite) {
      var favourite = antenna.id + ' ' + antenna.name + ' ' + antenna.brand;
    } else {
      var favourite = "";
    }
    this.firebaseUpdaterAndSetter.setFavouriteAntenna(favourite);
  }
}
