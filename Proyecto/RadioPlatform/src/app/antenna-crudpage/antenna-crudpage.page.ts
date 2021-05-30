import { Component, OnInit, Input } from '@angular/core';
import { Antenna } from '../antenna';
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
import {FirebaseUpdaterAndSetterService} from '../firebase-updater-and-setter.service';
import {ModalController} from '@ionic/angular'
@Component({
  selector: 'app-antenna-crudpage',
  templateUrl: './antenna-crudpage.page.html',
  styleUrls: ['./antenna-crudpage.page.scss'],
})
export class AntennaCRUDPagePage implements OnInit {
@Input() type:string = null;
@Input() name:string = null;
@Input() range:number = null;
@Input() height:number = null;
@Input() brand?:string = null;
@Input() id?:string;
@Input() price?:number;
antenna: Antenna;
  constructor(private firebaseUpdaterAndSetter: FirebaseUpdaterAndSetterService, private modalController: ModalController, private auth: AngularFireAuth) {
   }

  ngOnInit() {
  }
  dismiss() {
    this.modalController.dismiss();
  }
  submit() {
    if (this.id !== undefined) {
      this.antenna = new Antenna(this.type, this.name, this.range, this.height, this.brand, this.id, this.price);
      this.firebaseUpdaterAndSetter.updateAntenna(this.antenna);
    } else {
      this.id = "placeholder";
      this.antenna = new Antenna(this.type, this.name, this.range, this.height, this.brand, this.id, this.price);
      this.firebaseUpdaterAndSetter.setAntenna(this.antenna);
    }
  }

}

