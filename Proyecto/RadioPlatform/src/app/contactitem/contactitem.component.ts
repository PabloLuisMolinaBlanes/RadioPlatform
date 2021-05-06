import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact';

@Component({
  selector: 'app-contactitem',
  templateUrl: './contactitem.component.html',
  styleUrls: ['./contactitem.component.scss'],
})
export class ContactitemComponent implements OnInit {
@Input() contact: Contact;
  constructor() { }

  ngOnInit() {}

}
