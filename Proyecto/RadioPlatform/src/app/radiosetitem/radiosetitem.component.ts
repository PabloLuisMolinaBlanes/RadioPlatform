import { Component, Input, OnInit } from '@angular/core';
import { RadioSet } from '../radioset';
import {AlertController} from '@ionic/angular';
import {ModalController} from '@ionic/angular';
import {RadioSetCRUDPagePage} from '../radio-set-crudpage/radio-set-crudpage.page'
import {FirebaseUpdaterAndSetterService} from '../firebase-updater-and-setter.service'
@Component({
  selector: 'app-radiosetitem',
  templateUrl: './radiosetitem.component.html',
  styleUrls: ['./radiosetitem.component.scss'],
})
export class RadiosetitemComponent implements OnInit {
@Input() radioset: RadioSet;
@Input() equipment: RadioSet[] = [];
  constructor(public modalController: ModalController, public alertCtrl: AlertController, public firebaseUpdaterAndSetter: FirebaseUpdaterAndSetterService) { }

  ngOnInit() {}

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
        'price': radioset.price
      }
    });
    return await modal.present();
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
        this.firebaseUpdaterAndSetter.deleteRadioSet(this.radioset);
      }
      }]
    });
    (await alert).present();
  }
}
