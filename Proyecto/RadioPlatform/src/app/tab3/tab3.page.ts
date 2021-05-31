import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';
import {ContactCRUDPagePage} from '../contact-crudpage/contact-crudpage.page'
import {FirebaseObtainerService} from '../firebase-obtainer.service'
import {DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl, ɵDomSanitizerImpl} from "@angular/platform-browser";
import {AngularFireDatabase} from '../../../node_modules/@angular/fire/database'
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
import { AngularFireStorage } from '@angular/fire/storage';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import {Storage} from '@ionic/storage'

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
markers: L.Marker[] = [];
coordinates: string[] = [];
frequency: string = "placeholder";
allContacts: Promise<DataSnapshot>;
country: string = "placeholder";
counter: number = 0;
private map;
  constructor(private modalController: ModalController, private firebaseObtainerService: FirebaseObtainerService, private storage: AngularFireStorage, private auth: AngularFireAuth,private sanitizer: ɵDomSanitizerImpl, private afDatabase: AngularFireDatabase, public store: Storage) {}
  
  ngOnInit() {
  }
  ngAfterViewChecked() {
    this.map.invalidateSize();
  }
  contact: Contact;
  ngAfterViewInit() {
    this.initMap();
    this.store.create();
    this.store.set("contacts", this.contactsTotal);
    this.auth.currentUser.then((user) => {
        this.auth.currentUser.then(user => {
          this.afDatabase.database.ref("users/"+user.uid+"/contacts").on("child_added", function (childsnapshot) {
              this.storage.ref(user.uid).listAll().subscribe(data => {
                this.counter++; 
                var contact = childsnapshot.val() as unknown as Contact;
                console.log(data.items.length);
                if (data.items[contact.number] !== undefined) {
                  data.items[contact.number].getDownloadURL().then(data => {
                    console.log(data);
                    const contact = childsnapshot.val() as unknown as Contact;
                    contact.recording = this.sanitizer.bypassSecurityTrustResourceUrl(data);
                    const lat = contact.coordinates.substr(0,contact.coordinates.search(",")) as unknown as number;
                    const lon = contact.coordinates.substr(contact.coordinates.search(",")+1, contact.coordinates.length) as unknown as number;
                    const marker = L.marker([lat, lon]);
                    this.markers.push(marker);
                    marker.bindPopup(`<div>Frecuencia: ${contact.frequency}</div>` + `<div>Localización: ${contact.location}</div>`+ `<div>Signo de llamada: ${contact.callsign}</div>`);
                    marker.addTo(this.map);
                    this.contactsTotal.push(contact);
                    this.contactsVisible = this.contactsTotal;
                    this.store.set("contacts", this.contactsTotal);
                  })
                } else {
                  const contact = childsnapshot.val() as unknown as Contact;
                  contact.recording = undefined;
                  const lat = contact.coordinates.substr(0,contact.coordinates.search(",")) as unknown as number;
                  const lon = contact.coordinates.substr(contact.coordinates.search(",")+1, contact.coordinates.length) as unknown as number;
                  const marker = L.marker([lat, lon]);
                  this.markers.push(marker);
                  marker.bindPopup(`<div>Frecuencia: ${contact.frequency}</div>` + `<div>Localización: ${contact.location}</div>`+ `<div>Signo de llamada: ${contact.callsign}</div>`);
                  marker.addTo(this.map);
                  this.contactsTotal.push(contact);
                  this.contactsVisible = this.contactsTotal;
                  this.store.set("contacts", this.contactsTotal);
                }
                });
        }, () => {console.log("error here")}, this)
        this.afDatabase.database.ref("users/"+user.uid+"/contacts").on("child_removed", function (childsnapshot) {
          const child = childsnapshot.val() as unknown as Contact;
          const index = this.contactsVisible.findIndex(c => c.id === child.id);
          this.contactsVisible = this.contactsVisible.filter(c => c.id !== child.id);
          this.contactsTotal = this.contactsVisible;
          this.map.removeLayer(this.markers[index]);
          this.store.set("contacts", this.contactsTotal);
        }, () => {console.log("error here")}, this)
        this.afDatabase.database.ref("users/"+user.uid+"/contacts").on("child_changed", function (childsnapshot) {
          console.log("child changed... here we go");
          const contact = childsnapshot.val() as unknown as Contact;
          const index = this.contactsVisible.findIndex(c => c.id === contact.id);
          this.map.removeLayer(this.markers[index]);
          const lat = contact.coordinates.substr(0,contact.coordinates.search(",")) as unknown as number;
          const lon = contact.coordinates.substr(contact.coordinates.search(",")+1, contact.coordinates.length) as unknown as number;
          const marker = L.marker([lat, lon]);
          this.markers.push(marker);
          marker.bindPopup(`<div>Frecuencia: ${contact.frequency}</div>` + `<div>Localización: ${contact.location}</div>`+ `<div>Signo de llamada: ${contact.callsign}</div>`);
          marker.addTo(this.map);
          console.log("checkpoint 1");
          this.storage.ref(user.uid).listAll().subscribe(data => {
            var contact = childsnapshot.val() as unknown as Contact;
            if (data.items[contact.number] !== undefined) {
              data.items[contact.number].getDownloadURL().then(data => {
                console.log("checkpoint 2");
                this.contactsVisible.forEach(contact2 => {
                  if (contact2.id === contact.id) {

                    contact2.frequency = contact.frequency;
                    contact2.recording = this.sanitizer.bypassSecurityTrustResourceUrl(data);
                    contact2.callsign = contact.callsign;
                    contact2.location = contact.location;
                    contact2.coordinates = contact.coordinates;
                    contact2.id = contact.id;
                    contact2.number = contact.number;
                  }
                })
                this.contactsTotal = this.contactsVisible;
                this.store.set("contacts", this.contactsTotal);
                console.log("finished 1");
              });
            } else {
              console.log("checkpoint 2");
              this.contactsVisible.forEach(contact2 => {
                if (contact2.id === contact.id) {
                  contact2.frequency = contact.frequency;
                  contact2.recording = undefined;
                  contact2.callsign = contact.callsign;
                  contact2.location = contact.location;
                  contact2.coordinates = contact.coordinates;
                  contact2.id = contact.id;
                  contact2.number = contact.number;
                }
              })
              this.contactsTotal = this.contactsVisible;
              this.store.set("contacts", this.contactsTotal);
              console.log("finished 2");
            }
          })
          this.store.set("contacts", this.contactsTotal);
        }, () => {console.log("error here")}, this)
        })
    });
  }
  private initMap(): void {
    this.map = L.map('map', {
      center:[40.416775, 3.703790],
      zoom: 3
    }).on('load', function() {
      this.map.invalidateSize();
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <a href="http://localhost:3001/listall"> - Get all coordinate data</a>'
    });
    tiles.addTo(this.map);
  }
  onMapReady(map : L.Map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
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
