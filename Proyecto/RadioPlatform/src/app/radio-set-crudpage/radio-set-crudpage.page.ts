import { Component, Input, OnInit } from '@angular/core';
import {FirebaseUpdaterAndSetterService} from '../firebase-updater-and-setter.service';
import { RadioSet } from '../radioset';
import {ModalController} from '@ionic/angular'
import { FirebaseObtainerService } from '../firebase-obtainer.service';
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
@Input() id?: string = undefined;
@Input() price: number = null;
@Input() isadmin: boolean;
radioSetTotal: RadioSet[] = [];
equipment: RadioSet;
  constructor(private firebaseUpdaterAndSetter: FirebaseUpdaterAndSetterService, private firebaseObtainerService: FirebaseObtainerService, private modalController: ModalController) { }

  ngOnInit() {
    this.firebaseObtainerService.listAllRadioSets().then(ants => {
      ants.forEach(ant => {
        this.radioSetTotal.push(ant.val() as unknown as RadioSet);
      })
     });
  }
  updateRadio() {
    this.type = this.equipment.type;
    this.name = this.equipment.name;
    this.amplitude = this.equipment.amplitude;
    this.brand = this.equipment.brand;
    this.id = this.equipment.id;
    this.price = this.equipment.price;
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
      if (this.isadmin) {
        this.firebaseUpdaterAndSetter.setRadioSetAdmin(this.radio);
      } else {
        this.firebaseUpdaterAndSetter.setRadioSet(this.radio);
      }
    }
  }

}
