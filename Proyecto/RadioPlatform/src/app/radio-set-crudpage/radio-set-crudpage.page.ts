import { Component, Input, OnInit } from '@angular/core';
import {FirebaseUpdaterAndSetterService} from '../firebase-updater-and-setter.service';
import { RadioSet } from '../radioset';
import {ModalController} from '@ionic/angular'
@Component({
  selector: 'app-radio-set-crudpage',
  templateUrl: './radio-set-crudpage.page.html',
  styleUrls: ['./radio-set-crudpage.page.scss'],
})
export class RadioSetCRUDPagePage implements OnInit {
@Input() brand: string = null;
@Input() name: string = null;
@Input() type: string = null;
@Input() amplitude: string = null;
@Input() radio: RadioSet = null;
@Input() result: boolean = null;
@Input() id?: string = null;
@Input() price: number = null;
  constructor(private firebaseUpdaterAndSetter: FirebaseUpdaterAndSetterService, private modalController: ModalController) { }

  ngOnInit() {
  }
  dismiss() {
    this.modalController.dismiss();
  }
  submit() {
    if (this.id !== undefined) {
      this.radio = new RadioSet(this.brand, this.name, this.type, this.amplitude, this.id, this.price);
      this.firebaseUpdaterAndSetter.updateRadioSet(this.radio);
    } else {
      this.id = "placeholder";
      this.radio = new RadioSet(this.brand, this.name, this.type, this.amplitude, this.id, this.price);
      this.firebaseUpdaterAndSetter.setRadioSet(this.radio);
    }
  }

}
