import { Component, OnInit } from '@angular/core';
import { RadioSet } from '../radioset';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
radiosetsVisible: RadioSet[] = [];
radiosetsTotal: RadioSet[] = [];
radioset: RadioSet = new RadioSet("test", "test", "SDR", "440mhz");
  constructor() {}
  ngOnInit() {
    this.radiosetsTotal.push(this.radioset);
    this.radiosetsVisible = this.radiosetsTotal;
  }
}
