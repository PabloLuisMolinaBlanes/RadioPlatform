import { Component, OnInit } from '@angular/core';
import { Antenna } from '../antenna';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
antennaeVisible: Antenna[] = [];
antennaeTotal: Antenna[] = [];

antenna: Antenna = new Antenna("test", "test", 100, 1);
  constructor() {}
  ngOnInit() {
    this.antennaeTotal.push(this.antenna);
    this.antennaeVisible = this.antennaeTotal;
  }
}
