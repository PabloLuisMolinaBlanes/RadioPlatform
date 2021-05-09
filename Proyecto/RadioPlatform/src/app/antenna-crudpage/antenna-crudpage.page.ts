import { Component, OnInit, Input } from '@angular/core';
import { Antenna } from '../antenna';
import {FirebaseUpdaterAndSetterService} from '../firebase-updater-and-setter.service';
@Component({
  selector: 'app-antenna-crudpage',
  templateUrl: './antenna-crudpage.page.html',
  styleUrls: ['./antenna-crudpage.page.scss'],
})
export class AntennaCRUDPagePage implements OnInit {
@Input() type:string;
@Input() name:string;
@Input() range:number;
@Input() height:number;
@Input() brand?:string;
@Input() id?:string;
@Input() price?:number;
antenna: Antenna;
  constructor(private firebaseUpdaterAndSetter: FirebaseUpdaterAndSetterService) {
   }

  ngOnInit() {
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

