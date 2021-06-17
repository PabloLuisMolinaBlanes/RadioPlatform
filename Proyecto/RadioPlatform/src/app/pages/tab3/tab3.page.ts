import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Contact } from '../../classes/contact';
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';
import { ContactCRUDPagePage } from '../contact-crudpage/contact-crudpage.page'
import { FirebaseObtainerService } from '../../services/firebase-obtainer.service'
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl, ɵDomSanitizerImpl } from "@angular/platform-browser";
import { AngularFireDatabase } from '../../../../node_modules/@angular/fire/database'
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth'
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
  countries: string[] = [];
  frequencies: string[] = [];
  private map;
  constructor(private modalController: ModalController, private firebaseObtainerService: FirebaseObtainerService, private storage: AngularFireStorage, private auth: AngularFireAuth, private sanitizer: ɵDomSanitizerImpl, private afDatabase: AngularFireDatabase, public store: Storage) { }

  ngOnInit() {
  }
  bindingPopups(contact: Contact) {
    this.markers.forEach(marker => {
      if (marker !== null) {
        this.map.removeLayer(marker);
      }
    });
    this.markers = [];
    console.log("Removed all markers");
    this.contactsVisible.forEach(contact2 => {
      if (contact2.location !== undefined) {
        const lat = contact2.coordinates.substr(0, contact2.coordinates.search(",")) as unknown as number;
        const lon = contact2.coordinates.substr(contact2.coordinates.search(",") + 1, contact2.coordinates.length) as unknown as number;
        const marker = L.marker([lat, lon]);
        this.markers.push(marker);
        marker.bindPopup(`<div>Frecuencia: ${contact2.frequency}</div>` + `<div>Localización: ${contact2.location}</div>` + `<div>Signo de llamada: ${contact2.callsign}</div>`);
        marker.addTo(this.map);
      } else {
        this.markers.push(null);
      }
    });
    var found = false;
    var contactsFound = [];
    for (let i = 0; i < this.contactsVisible.length; i += 1) {
      let originalArray = [];
      this.contactsVisible.forEach(contact => {
            originalArray.push(contact);
      })
      var rearrangedArray = this.contactsVisible.reverse();
      var countArrays = 0;
     rearrangedArray.forEach(contact => {
        if (contactsFound[''+contact.location] === undefined && contact.location !== undefined) {
          contactsFound[''+contact.location] = countArrays;
        }
        countArrays += 1;
      })
  
      this.contactsVisible = originalArray;
      for (let j = 0; j < this.contactsVisible.length; j += 1) {
        if (this.contactsVisible[i].location === this.contactsVisible[j].location && this.contactsVisible[j].location !== undefined && contactsFound[''+this.contactsVisible[j].location] !== this.contactsVisible.length - 1 - j && contactsFound[''+this.contactsVisible[i].location+"_found"] !== 1) {
          found = true;
          let originalArray2 = [];
          this.contactsVisible.forEach(contact => {
            originalArray2.push(contact);
          })
          var rearrangedArray = this.contactsVisible.reverse();
          this.contactsVisible = originalArray2;
          var indexfound = rearrangedArray.findIndex((contact4) => contact4.location === this.contactsVisible[j].location);
          this.markers[this.markers.length - 1 - indexfound].bindPopup(this.markers[this.markers.length - 1 - indexfound].getPopup().getContent() + ` | ` + `<div>Frecuencia: ${this.contactsVisible[j].frequency}</div>` + `<div>Localización: ${this.contactsVisible[j].location}</div>` + `<div>Signo de llamada: ${this.contactsVisible[j].callsign}</div>`)
        }
      }
      contactsFound[''+this.contactsVisible[i].location+"_found"] = 1;
    }
  }
  checkExistingPopups(contact: Contact) {
    var found = false;
    this.contactsTotal.forEach(contact2 => {
      if (contact.location === contact2.location && contact.id !== contact2.id) {
        found = true;
        var index = this.contactsTotal.findIndex((contact3) => contact3.id === contact2.id);
        console.log(index);
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
        const child = childsnapshot.val() as unknown as Contact;
        this.countries.push(child.location);
        this.frequencies.push(child.frequency);
        this.countries = [...new Set(this.countries)];
        this.frequencies = [...new Set(this.frequencies)];
          setTimeout(() => {
            this.storage.ref(user.uid).listAll().subscribe(data => {
              this.counter++;
              var contact = childsnapshot.val() as unknown as Contact;
              console.log(contact.updated);
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
                  this.contactsTotal.push(contact);
                  this.contactsVisible = this.contactsTotal;
                  this.bindingPopups(contact);
                })
              } else {
                const contact = childsnapshot.val() as unknown as Contact;
                contact.recording = undefined;
                this.contactsTotal.push(contact);
                this.contactsVisible = this.contactsTotal;
                this.bindingPopups(contact);
              }
            });
          }, 3000)
        }, () => { console.log("error here") }, this)
        
        this.afDatabase.database.ref("users/" + user.uid + "/contacts").on("child_removed", function (childsnapshot) {
          const child = childsnapshot.val() as unknown as Contact;
          const index = this.contactsVisible.findIndex(c => c.id === child.id);
          this.contactsTotal = this.contactsTotal.filter(c => c.id !== child.id);
          this.contactsVisible = this.contactsVisible.filter(c => c.id !== child.id);
          this.bindingPopups(null);
        }, () => { console.log("error here") }, this)

        this.afDatabase.database.ref("users/" + user.uid + "/contacts").on("child_changed", function (childsnapshot) {
          console.log("child changed... here we go");
          const contact = childsnapshot.val() as unknown as Contact;
        this.countries.push(contact.location);
        this.frequencies.push(contact.frequency);
        this.countries = [...new Set(this.countries)];
        this.frequencies = [...new Set(this.frequencies)];
          this.contactsVisible.forEach(contact2 => {
            if (contact2.id === "placeholder") {
              contact2.id = contact.id;
            }
          });
          
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
                      contact2.updated = contact.updated;
                    }
                  })
                  this.contactsTotal.forEach(contact2 => {
                    if (contact2.id === contact.id || contact2.id === "placeholder") {
                      contact2.frequency = contact.frequency;
                      contact2.recording = this.sanitizer.bypassSecurityTrustResourceUrl(data);
                      contact2.callsign = contact.callsign;
                      contact2.location = contact.location;
                      contact2.coordinates = contact.coordinates;
                      contact2.id = contact.id;
                      contact2.number = contact.number;
                      contact2.updated = contact.updated;
                    }
                  })
                  this.bindingPopups(contact);
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
                    contact2.updated = contact.updated;
                  }
                })
                this.contactsTotal.forEach(contact2 => {
                  if (contact2.id === contact.id || contact2.id === "placeholder") {
                    contact2.frequency = contact.frequency;
                    contact2.recording = undefined;
                    contact2.callsign = contact.callsign;
                    contact2.location = contact.location;
                    contact2.coordinates = contact.coordinates;
                    contact2.id = contact.id;
                    contact2.number = contact.number;
                    contact2.updated = contact.updated;
                  }
                })
                this.contactsTotal = this.contactsVisible;
                this.bindingPopups(contact);
                console.log("finished 2");
              }
            })
          }, 6000);
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
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <a href="https://radioplatforminfrastructure.herokuapp.com/listall"> - Get all coordinate data</a>'
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
    this.bindingPopups(null);
  }
  filterContacts = function (contact: Contact) {
    let contactcountry = contact.location;
    let contactfrequency = contact.frequency;
    if ((this.country === "placeholder" || contactcountry === this.country) && (this.frequency === "placeholder" || contactfrequency === this.frequency)) {
      return true;
    } else {
      return false;
    }
  }
}
