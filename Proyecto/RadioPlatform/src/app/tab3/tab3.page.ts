import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit { 
contactsTotal: Contact[] = [];
contactsVisible: Contact[] = [];
contact: Contact = new Contact("440mhz");
  constructor() {}
  
  ngOnInit() {
    this.contactsTotal.push(this.contact);
    this.contactsVisible = this.contactsTotal;
  }
}
