import { Component, Input, OnInit } from '@angular/core';
import { Antenna } from '../antenna';

@Component({
  selector: 'app-antennaitem',
  templateUrl: './antennaitem.component.html',
  styleUrls: ['./antennaitem.component.scss'],
})
export class AntennaitemComponent implements OnInit {
@Input() antenna: Antenna;
  constructor() { }

  ngOnInit() {}

}
