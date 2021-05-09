import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';
import {ContactCRUDPagePage} from '../contact-crudpage/contact-crudpage.page'
import {FirebaseObtainerService} from '../firebase-obtainer.service'
import {DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl, ɵDomSanitizerImpl} from "@angular/platform-browser";
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
import { AngularFireStorage } from '@angular/fire/storage';
import { DataSnapshot } from '@angular/fire/database/interfaces';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, AfterViewInit { 
contactsTotal: Contact[] = [];
contactsVisible: Contact[] = [];
contactsVisibleTotal: Contact[] = [];
coordinates: string[] = [];
contact: Contact = new Contact("440mhz");
contact2: Contact = new Contact("405mhz");
frequency: string = "placeholder";
allContacts: Promise<DataSnapshot>;
country: string = "placeholder";
private map;
  constructor(private modalController: ModalController, private firebaseObtainerService: FirebaseObtainerService, private storage: AngularFireStorage, private auth: AngularFireAuth,private sanitizer: ɵDomSanitizerImpl) {}
  
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.initMap();
    this.allContacts = this.firebaseObtainerService.listAllContacts();
    var counter: number = 0;
    this.allContacts.then(m => {
      m.forEach(c => {
        this.auth.currentUser.then(user => {
          this.storage.ref(user.uid).listAll().subscribe(data => {
            if (data.items[counter] !== undefined) {
              data.items[counter].getDownloadURL().then(url => {
                const contact = c.val() as unknown as Contact;
                contact.recording = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                contact.number = this.contactsTotal.length;
                const lat = contact.coordinates.substr(0,contact.coordinates.search(",")) as unknown as number;
                const lon = contact.coordinates.substr(contact.coordinates.search(",")+1, contact.coordinates.length) as unknown as number;
                const marker = L.marker([lat, lon]);
                marker.bindPopup(`<div>Frecuencia: ${contact.frequency}</div>` + `<div>Localización: ${contact.location}</div>`+ `<div>Signo de llamada: ${contact.callsign}</div>`);
                marker.addTo(this.map);
                this.contactsTotal.push(contact);
                this.contactsVisible = this.contactsTotal;
                counter++;
              });
            } else {
              const contact = c.val() as unknown as Contact;
              contact.recording = undefined;
              contact.number = this.contactsTotal.length;
              this.contactsTotal.push(contact);
              this.contactsVisible = this.contactsTotal;
            }
            });
          });
        });
      });
  }
  private initMap(): void {
    this.map = L.map('map', {
      center:[40.416775, 3.703790],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }
  async presentModal(){
    const modal = await this.modalController.create({
      component:ContactCRUDPagePage,
      cssClass: 'placeholder'
    });
    return await modal.present();
}
updateArray() {
  this.contactsVisibleTotal = this.contactsVisible;
  this.contactsVisible = this.contactsTotal.filter(this.filterContacts, this);
}
filterContacts = function(contact: Contact) {
  let contactfrequency = contact.frequency;
  let contactcountry = contact.location;
  if ((this.frequency === "placeholder" || contactfrequency === this.frequency) && (this.country === "placeholder" || contactcountry === this.country)) {
    return true;
  } else {
    return false;
}
}
}
