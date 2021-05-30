import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact';
import {ModalController} from '@ionic/angular'
import {AlertController} from '@ionic/angular'
import {ContactCRUDPagePage} from '../contact-crudpage/contact-crudpage.page';
import {FirebaseUpdaterAndSetterService} from '../firebase-updater-and-setter.service'
@Component({
  selector: 'app-contactitem',
  templateUrl: './contactitem.component.html',
  styleUrls: ['./contactitem.component.scss'],
})
export class ContactitemComponent implements OnInit {
@Input() contact: Contact;
@Input() contacts: Contact[] = [];
@Input() numberInArray: number;
  constructor(public modalController: ModalController, public alertCtrl: AlertController, public firebaseUpdaterAndSetter: FirebaseUpdaterAndSetterService) { }

  ngOnInit() {}
  async presentModalModify(contact: Contact){
    const modal = await this.modalController.create({
      component:ContactCRUDPagePage,
      cssClass: 'placeholder',
      componentProps: {
        'frequency': contact.frequency,
        'callsign': contact.callsign,
        'location': contact.location,
        'recording': contact.recording,
        'id': contact.id,
        'number': contact.number
       }
    });
    return await modal.present();
  }
  async presentDeleteConfirmation(contact: Contact) {
    let alert = this.alertCtrl.create({
      message: 'Are you sure you want to delete ' + contact.frequency + '?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {text:'Delete',
      handler: () => {
        this.firebaseUpdaterAndSetter.deleteContact(contact);
      }
      }]
    });
    (await alert).present();
  }
}
