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
  constructor(public modalController: ModalController, public alertCtrl: AlertController, public firebaseUpdaterAndSetter: FirebaseUpdaterAndSetterService) { }

  ngOnInit() {}

  async presentModalModify(){
    const modal = await this.modalController.create({
      component:RadioSetCRUDPagePage,
      cssClass: 'placeholder',
      componentProps: {
        'id': this.radioset.id,
        'type': this.radioset.type,
        'name': this.radioset.name,
        'amplitude': this.radioset.amplitude,
        'brand': this.radioset.brand,
        'price': this.radioset.price
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
