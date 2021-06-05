import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';
import { ContactCRUDPagePage } from '../contact-crudpage/contact-crudpage.page'
import { FirebaseObtainerService } from '../firebase-obtainer.service'
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl, ɵDomSanitizerImpl } from "@angular/platform-browser";
import { AngularFireDatabase } from '../../../node_modules/@angular/fire/database'
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
import { AngularFireStorage } from '@angular/fire/storage';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Storage } from '@ionic/storage'

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
  constructor(private modalController: ModalController, private firebaseObtainerService: FirebaseObtainerService, private storage: AngularFireStorage, private auth: AngularFireAuth, private sanitizer: ɵDomSanitizerImpl, private afDatabase: AngularFireDatabase, public store: Storage) { }

  ngOnInit() {
  }
  bindingPopups(contact: Contact) {
    const index = this.contactsVisible.findIndex(c => c.id === contact.id);
    if (index !== -1) {
      if (this.markers[index] !== undefined) {
        this.map.removeLayer(this.markers[index]);
        this.contactsTotal.forEach(c => {
          var index = this.contactsTotal.findIndex(contact => c.location === contact.location);
          if (index !== -1 && this.contactsTotal.findIndex((contact, index2) => c.location === contact.location && index < index2) !== -1) {
            this.markers[index].bindPopup(`<div>Frecuencia: ${this.contactsTotal[index].frequency}</div>` + `<div>Localización: ${this.contactsTotal[index].location}</div>` + `<div>Signo de llamada: ${this.contactsTotal[index].callsign}</div>`);
          }
        })
      }
    }
    this.checkExistingPopups(contact); 
  }
  checkExistingPopups(contact: Contact) {
    var found = false;
    this.contactsTotal.forEach(contact2 => {
      if (contact.location === contact2.location && contact !== contact2) {
        found = true;
        var index = this.contactsTotal.findIndex((contact3) => contact3 === contact2);
        this.markers[index].bindPopup(this.markers[index].getPopup().getContent() + ` | ` + `<div>Frecuencia: ${contact.frequency}</div>` + `<div>Localización: ${contact.location}</div>` + `<div>Signo de llamada: ${contact.callsign}</div>`)
      }
    });
    if (!(found)) {
      if (contact.coordinates !== undefined) {
        const lat = contact.coordinates.substr(0, contact.coordinates.search(",")) as unknown as number;
        const lon = contact.coordinates.substr(contact.coordinates.search(",") + 1, contact.coordinates.length) as unknown as number;
        const marker = L.marker([lat, lon]);
        this.markers.push(marker);
        marker.bindPopup(`<div>Frecuencia: ${contact.frequency}</div>` + `<div>Localización: ${contact.location}</div>` + `<div>Signo de llamada: ${contact.callsign}</div>`);
        marker.addTo(this.map);
      }
    }
  }
  ngAfterViewChecked() {
    this.map.invalidateSize();
  }
  contact: Contact;
  ngAfterViewInit() {

    this.initMap();
    this.store.create();

    this.auth.currentUser.then((user) => {
      this.auth.currentUser.then(user => {
        this.afDatabase.database.ref("users/" + user.uid + "/contacts").on("child_added", function (childsnapshot) {
          setTimeout(() => {
            this.storage.ref(user.uid).listAll().subscribe(data => {
              this.counter++;
              var contact = childsnapshot.val() as unknown as Contact;
              var isitthere = false;
              var index = 0;
              console.log(data.items.length);
              data.items.forEach(item => {
                if (item.name === contact.number) {
                  isitthere = true;
                  index = data.items.findIndex(item2 => item.name === item2.name);
                }
              });
              if (isitthere) {
                data.items[index].getDownloadURL().then(data => {
                  console.log(data);
                  const contact = childsnapshot.val() as unknown as Contact;
                  contact.recording = this.sanitizer.bypassSecurityTrustResourceUrl(data);
                  this.checkExistingPopups(contact);
                  this.contactsTotal.push(contact);
                  this.contactsVisible = this.contactsTotal;
                })
              } else {
                const contact = childsnapshot.val() as unknown as Contact;
                contact.recording = undefined;
                this.checkExistingPopups(contact);
                this.contactsTotal.push(contact);
                this.contactsVisible = this.contactsTotal;
              }
            });
          }, 3000)
        }, () => { console.log("error here") }, this)
        
        this.afDatabase.database.ref("users/" + user.uid + "/contacts").on("child_removed", function (childsnapshot) {
          const child = childsnapshot.val() as unknown as Contact;
          const index = this.contactsVisible.findIndex(c => c.id === child.id);
          this.contactsVisible = this.contactsVisible.filter(c => c.id !== child.id);
          this.contactsTotal = this.contactsVisible;
          this.map.removeLayer(this.markers[index]);
        }, () => { console.log("error here") }, this)

        this.afDatabase.database.ref("users/" + user.uid + "/contacts").on("child_changed", function (childsnapshot) {
          console.log("child changed... here we go");
          const contact = childsnapshot.val() as unknown as Contact;
          this.contactsVisible.forEach(contact2 => {
            if (contact2.id === "placeholder") {
              contact2.id = contact.id;
            }
          });
          this.bindingPopups(contact);
          console.log("checkpoint 1");
          setTimeout(() => {
            this.storage.ref(user.uid).listAll().subscribe(data => {
              var isitthere = false;
              var index = 0;
              var contact = childsnapshot.val() as unknown as Contact;
              data.items.forEach(item => {
                if (item.name == contact.number) {
                  isitthere = true;
                  index = data.items.findIndex(item2 => item.name === item2.name);
                }
              })
              if (isitthere) {
                data.items[index].getDownloadURL().then(data => {
                  this.contactsVisible.forEach(contact2 => {
                    if (contact2.id === contact.id || contact2.id === "placeholder") {
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
                  console.log("finished 1");
                });
              } else {
                this.contactsVisible.forEach(contact2 => {
                  if (contact2.id === contact.id || contact2.id === "placeholder") {
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
                console.log("finished 2");
              }
            })
          }, 5000);
        }, () => { console.log("error here") }, this)
      })
    });
  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [40.416775, 3.703790],
      zoom: 3
    }).on('load', function () {
      this.map.invalidateSize();
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <a href="http://localhost:3001/listall"> - Get all coordinate data</a>'
    });
    tiles.addTo(this.map);
  }
  onMapReady(map: L.Map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ContactCRUDPagePage,
      cssClass: 'placeholder'
    });
    return await modal.present();
  }
  updateArray() {
    this.contactsVisibleTotal = this.contactsVisible;
    this.contactsVisible = this.contactsTotal.filter(this.filterContacts, this);
  }
  filterContacts = function (contact: Contact) {
    let contactcountry = contact.location;
    if ((this.country === "placeholder" || contactcountry === this.country)) {
      return true;
    } else {
      return false;
    }
  }
}
