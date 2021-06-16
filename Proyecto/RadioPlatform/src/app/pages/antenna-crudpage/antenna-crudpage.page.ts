import { Component, OnInit, Input } from '@angular/core';
import { Antenna } from '../../classes/antenna';
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth'
import {FirebaseUpdaterAndSetterService} from '../../services/firebase-updater-and-setter.service';
import {FirebaseObtainerService} from '../../services/firebase-obtainer.service'
import {ModalController} from '@ionic/angular'
@Component({
  selector: 'app-antenna-crudpage',
  templateUrl: './antenna-crudpage.page.html',
  styleUrls: ['./antenna-crudpage.page.scss'],
})
export class AntennaCRUDPagePage implements OnInit {
@Input() type:string = null;
@Input() name:string = null;
@Input() range:string = null;
@Input() height:string = null;
@Input() brand?:string = null;
@Input() id?:string;
@Input() price?:number = null;
@Input() isadmin: boolean;
antenna: Antenna;
antennaeTotal: Antenna[] = [];
  constructor(private firebaseUpdaterAndSetter: FirebaseUpdaterAndSetterService, private firebaseObtainerService: FirebaseObtainerService, private modalController: ModalController, private auth: AngularFireAuth) {
   }

  ngOnInit() {
    this.firebaseObtainerService.listAllAntennas().then(ants => {
     ants.forEach(ant => {
       this.antennaeTotal.push(ant.val() as unknown as Antenna);
     })
    });
  }
  updateAntenna() {
    this.type = this.antenna.type;
    this.name = this.antenna.name;
    this.range = this.antenna.range;
    this.height = this.antenna.height;
    this.brand = this.antenna.brand === undefined ? null : this.antenna.brand;
    this.id = this.antenna.id;
    this.price = this.antenna.price === undefined ? null : this.antenna.price;
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
      if (this.isadmin) {
        this.firebaseUpdaterAndSetter.setAntennaAdmin(this.antenna);
      } else {      
        this.firebaseUpdaterAndSetter.setAntenna(this.antenna);
      }
    }
  }

}

