import { Component, Input, OnInit } from '@angular/core';
import { RadioSet } from '../radioset';

@Component({
  selector: 'app-radiosetitem',
  templateUrl: './radiosetitem.component.html',
  styleUrls: ['./radiosetitem.component.scss'],
})
export class RadiosetitemComponent implements OnInit {
@Input() radioset: RadioSet;
  constructor() { }

  ngOnInit() {}

}
