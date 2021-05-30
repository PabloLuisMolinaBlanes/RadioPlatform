import { Component, Input, OnInit } from '@angular/core';
import { Antenna } from '../antenna';
import { RadioSet } from '../radioset';
import {Storage} from '@ionic/storage';
import {ModalController} from '@ionic/angular'
@Component({
  selector: 'app-pricecalculator',
  templateUrl: './pricecalculator.page.html',
  styleUrls: ['./pricecalculator.page.scss'],
})
export class PricecalculatorPage implements OnInit {
@Input() antennae: Antenna[] = [];
@Input() equipment: RadioSet[] = [];
@Input() antennaeMultiplierArray: number[] = [];
@Input() equipmentMultiplierArray: number[] = [];
@Input() antennaeMultiplier: number;
@Input() equipmentMultiplier: number;
@Input() antennaChosen: Antenna;
@Input() radiosetChosen: RadioSet;
total: number = 0;
antennaeChosen: Antenna[] = [];
equipmentChosen: RadioSet[] = [];
  constructor(public storage: Storage, private modalController: ModalController) { }
  dismiss() {
    this.modalController.dismiss();
  }
  ngOnInit() {
    this.storage.get('antennae').then((r) => {
      this.antennae = r;
    });
    this.storage.get('equipment').then((r) => {
      this.equipment = r;
    });
  }
  updateAntennaChosen() {
    this.antennaeChosen.push(this.antennaChosen);
    this.calculateTotal();
  }
  updateAntennaMultiplier(antenna: Antenna) {
    this.antennae.forEach(a => {
      if (a.id === antenna.id) {
        a.multiplier = this.antennaeMultiplier;
      }
    })
    this.calculateTotal();
  }
  updateEquipmentMultiplier(equipment: RadioSet) {
    this.equipment.forEach(e => {
      if (e.name === equipment.name) {
        e.multiplier = this.equipmentMultiplier;
      }
    })
   this.calculateTotal();
  }
  updateEquipmentChosen() {
    this.equipmentChosen.push(this.radiosetChosen);
    this.calculateTotal();
  }
  calculateTotal() {
    this.total = 0;
    this.antennaeChosen.forEach(a => {
      console.log(a.multiplier);
      this.total += +a.price* (a.multiplier === undefined ? 1 : a.multiplier);
    });
    this.equipmentChosen.forEach(e => {
      console.log(e.multiplier);
      this.total += +e.price* (e.multiplier === undefined ? 1 : e.multiplier);
    });
  }

}
