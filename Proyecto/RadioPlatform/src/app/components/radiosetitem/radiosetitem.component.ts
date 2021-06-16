import { Component, Input, OnInit } from '@angular/core';
import { RadioSet } from '../../classes/radioset';
import {AlertController} from '@ionic/angular';
import {ModalController} from '@ionic/angular';
import {RadioSetCRUDPagePage} from '../../pages/radio-set-crudpage/radio-set-crudpage.page'
import {FirebaseUpdaterAndSetterService} from '../../services/firebase-updater-and-setter.service'
@Component({
  selector: 'app-radiosetitem',
  templateUrl: './radiosetitem.component.html',
  styleUrls: ['./radiosetitem.component.scss'],
})
export class RadiosetitemComponent implements OnInit {
@Input() radioset: RadioSet;
@Input() equipment: RadioSet[] = [];
@Input() favouriteRadioSet: string;
@Input() isadmin: boolean;

isfavourite: boolean = false;
  constructor(public modalController: ModalController, public alertCtrl: AlertController, public firebaseUpdaterAndSetter: FirebaseUpdaterAndSetterService) { }

  ngOnInit() {
    setTimeout(() => {
      this.equipment.forEach(eq => {
        var test = eq.id + ' ' + eq.name + ' ' + eq.brand;
        if (test === this.favouriteRadioSet) {
          eq.isfavourite = true;
        }
      })
    }, 2000);
  }

  async presentModalModify(radioset: RadioSet){
    const modal = await this.modalController.create({
      component:RadioSetCRUDPagePage,
      cssClass: 'placeholder',
      componentProps: {
        'id': radioset.id,
        'type': radioset.type,
        'name': radioset.name,
        'amplitude': radioset.amplitude,
        'brand': radioset.brand,
        'price': radioset.price === undefined ? null : radioset.price,
        'isadmin': true
      }
    });
    return await modal.present();
  }
  
  async presentModalModifyUser(radioset: RadioSet){
    const modal = await this.modalController.create({
      component:RadioSetCRUDPagePage,
      cssClass: 'placeholder',
      componentProps: {
        'id': radioset.id,
        'type': radioset.type,
        'name': radioset.name,
        'amplitude': radioset.amplitude,
        'brand': radioset.brand,
        'price': radioset.price === undefined ? null : radioset.price,
        'isadmin': false
      }
    });
    return await modal.present();
  }
  async presentDeleteConfirmationUser(radioset: RadioSet) {
    let alert = this.alertCtrl.create({
      message: 'Are you sure you want to delete ' + radioset.name + '?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {text:'Delete',
      handler: () => {  
          this.firebaseUpdaterAndSetter.deleteRadioSetUser(radioset);
      }
      }]
    });
    (await alert).present();
  }
  async presentDeleteConfirmation(radioset: RadioSet) {
    let alert = this.alertCtrl.create({
      message: 'Are you sure you want to delete ' + radioset.name + '?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {text:'Delete',
      handler: () => {  
          this.firebaseUpdaterAndSetter.deleteRadioSet(radioset);
      }
      }]
    });
    (await alert).present();
  }
  sendFavouriteData(radioset: RadioSet) {
    if (radioset.isfavourite) {
      var favourite = radioset.id + ' ' + radioset.name + ' ' + radioset.brand;
    } else {
      var favourite = "";
    }
    this.firebaseUpdaterAndSetter.setFavouriteRadioSet(favourite);
  }
}
