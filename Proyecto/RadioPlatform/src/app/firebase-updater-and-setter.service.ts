import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/@angular/fire/database'
import { AngularFireAuth } from '../../node_modules/@angular/fire/auth'
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { Antenna } from './antenna';
import { RadioSet } from './radioset';
import { User } from './user';
import { Contact } from './contact';
@Injectable({
  providedIn: 'root'
})
export class FirebaseUpdaterAndSetterService {

  constructor(public afDatabase: AngularFireDatabase, public auth: AngularFireAuth, public http: HttpClient, public storage: AngularFireStorage) { }
  setAntenna(antenna: Antenna) {
    this.afDatabase.database.ref('antennae/').push(antenna).then((r) => { this.afDatabase.database.ref('antennae/' + r.key).update({ id: r.key }) });
  }
  setRadioSet(radioset: RadioSet) {
    this.afDatabase.database.ref('equipment/').push(radioset).then((r) => { this.afDatabase.database.ref('equipment/' + r.key).update({ id: r.key }) });
  }
  setUser(user: User) {
    this.afDatabase.database.ref('users/' + user.id).set(user);
  }
  testHTML() {
    const headers = new HttpHeaders();
    const params = new HttpParams();
    headers.set('User-Agent', 'RadioPlatform (https://github.com/PabloLuisMolinaBlanes/RadioPlatform)');
    console.log(this.http.get<any>('http://localhost:3001/list/Málaga', { headers }));
    this.http.get<any>('http://localhost:3001/list/Málaga', { headers }).subscribe(val => {
      if (val.length === 0) {
        console.log("empty")
      } else {
        console.log(val);
      }
    });

    this.http.post<any>('http://localhost:3001/newcoordinate/', { "coordenada": 'test', "terminobusqueda": 'test' }).subscribe(data => {
      console.log(data);
    });
    this.http.get<any>('http://localhost:3001/list/Test', {}).subscribe(val => {
      if (val.length > 0) {
        console.log(val[0].coordenada);
      } else {
        this.http.get<any>('http://localhost:3001/cani', {}).subscribe(data => {
          console.log(data[0]);
          if (data[0].issearching === 0) {
            const headers = new HttpHeaders();
            headers.set('User-Agent', 'RadioPlatform (https://github.com/PabloLuisMolinaBlanes/RadioPlatform)');
            const params = new HttpParams();
            this.http.get<any>('')
            this.http.post<any>('http://localhost:3001/operatecon/', {}).subscribe(data => {
              console.log(data);
              setTimeout(() => {
                this.http.post<any>('http://localhost:3001/operatecon/', {}).subscribe(data => {
                  console.log(data);
                });
              }, 3000);
            });

          } else {
            console.log("This is where an error is shown");
          }
        });
      }
    });
  }
  async setContact(contact: Contact, audio: File) {
    if (contact.location === null) {
      this.afDatabase.database.ref('contacts/').push(contact).then((r) => { this.afDatabase.database.ref('contacts/' + r.key).update({ id: r.key }) }).then(r => {
        if (audio !== null) {
          this.auth.currentUser.then(u => {
            this.storage.ref(u.uid).listAll().subscribe(data => {
              this.storage.ref(u.uid).child(""+data.items.length).put(audio).then();
            });
          });
        }
      });
    } else {
      this.http.get<any>('http://localhost:3001/list/' + contact.location, {}).subscribe(val => {
        if (val.length > 0) {
          contact.coordinates = val[0].coordenada;
          contact.recording = null;
          console.log("uploading... (1)");
          this.afDatabase.database.ref('contacts/').push(contact).then((r) => { this.afDatabase.database.ref('contacts/' + r.key).update({ id: r.key }) }).then(r => {
            if (audio !== null) {
              this.auth.currentUser.then(u => {
                this.storage.ref(u.uid).listAll().subscribe(data => {
                  this.storage.ref(u.uid).child(""+data.items.length).put(audio).then();
                });
              });
            }
          });
        } else {
          this.http.get<any>('http://localhost:3001/cani', {}).subscribe(data => {
            console.log(data[0]);
            if (data[0].issearching === 0) {
              const headers = new HttpHeaders();
              headers.set('User-Agent', 'RadioPlatform (https://github.com/PabloLuisMolinaBlanes/RadioPlatform)');
              const params = new HttpParams();
              params.append('q', contact.location);
              params.append('email', 'pablo.molina@iescampanillas.com');
              this.http.get<any>('https://nominatim.openstreetmap.org/search.php', { headers, params }).subscribe(data => {
                contact.coordinates = data.lat + "," + data.lon;
                this.http.post<any>('http://localhost:3001/newcoordinate/', { "coordenada": data.lat + "," + data.lon, "terminobusqueda": contact.location }).subscribe(data => {
                  this.http.post<any>('http://localhost:3001/operatecon/', {}).subscribe(data => {
                    console.log(data);
                    setTimeout(() => {
                      this.http.post<any>('http://localhost:3001/operatecon/', {}).subscribe(data => {
                        console.log(data);
                        contact.recording = null;
                        console.log("uploading... (2)");
                        this.afDatabase.database.ref('contacts/').push(contact).then((r) => { this.afDatabase.database.ref('contacts/' + r.key).update({ id: r.key }) }).then(r => {
                          this.auth.currentUser.then(u => {
                            this.storage.ref(u.uid).listAll().subscribe(data => {
                              this.storage.ref(u.uid).child(""+data.items.length).put(audio).then();
                            });
                          });
                        });
                      });
                    }, 3000);
                  });
                });
              });
            } else {
              console.log("This is where an error is shown");
            }
          });
        }
      });
    }
  }
  updateContact(contact: Contact, audio: File) {
    if (contact.location === null) {
      this.afDatabase.database.ref('contacts/'+contact.id).set(contact).then(r => {
        if (audio !== null) {
          this.auth.currentUser.then(u => {
            this.storage.ref(u.uid).listAll().subscribe(data => {
              this.storage.ref(u.uid).child(""+contact.number).put(audio).then();
            });
          });
        }
      });
    } else {
      this.http.get<any>('http://localhost:3001/list/' + contact.location, {}).subscribe(val => {
        if (val.length > 0) {
          contact.coordinates = val[0].coordenada;
          contact.recording = null;
          console.log("uploading... (1)");
          console.log(contact);
          this.afDatabase.database.ref('contacts/'+contact.id).set(contact).then(r => {
            if (audio !== null) {
              this.auth.currentUser.then(u => {
                this.storage.ref(u.uid).listAll().subscribe(data => {
                  this.storage.ref(u.uid).child(""+contact.number).put(audio).then();
                });
              });
            }
          });
        } else {
          this.http.get<any>('http://localhost:3001/cani', {}).subscribe(data => {
            console.log(data[0]);
            if (data[0].issearching === 0) {
              const headers = new HttpHeaders();
              headers.set('User-Agent', 'RadioPlatform (https://github.com/PabloLuisMolinaBlanes/RadioPlatform)');
              const params = new HttpParams();
              params.append('q', contact.location);
              params.append('email', 'pablo.molina@iescampanillas.com');
              this.http.get<any>('https://nominatim.openstreetmap.org/search.php', { headers, params }).subscribe(data => {
                contact.coordinates = data.lat + "," + data.lon;
                this.http.post<any>('http://localhost:3001/newcoordinate/', { "coordenada": data.lat + "," + data.lon, "terminobusqueda": contact.location }).subscribe(data => {
                  this.http.post<any>('http://localhost:3001/operatecon/', {}).subscribe(data => {
                    console.log(data);
                    setTimeout(() => {
                      this.http.post<any>('http://localhost:3001/operatecon/', {}).subscribe(data => {
                        console.log(data);
                        contact.recording = null;
                        console.log("uploading... (2)");
                        this.afDatabase.database.ref('contacts/'+contact.id).set(contact).then(r => {
                          this.auth.currentUser.then(u => {
                            this.storage.ref(u.uid).listAll().subscribe(data => {
                              this.storage.ref(u.uid).child(""+contact.number).put(audio).then();
                            });
                          });
                        });
                      });
                    }, 3000);
                  });
                });
              });
            } else {
              console.log("This is where an error is shown");
            }
          });
        }
      });
    }

  }
  deleteContact(contact: Contact) {
      let thisnumber = contact.number;
      this.afDatabase.database.ref('contacts/'+contact.id).remove().then(c => {
        this.auth.currentUser.then(user => {
          this.storage.ref(user.uid).child(""+thisnumber).delete();
        })
      })
  }
  setUserAndPhoto(user: User) {
    return this.afDatabase.database.ref('users/' + user.id).set(user);
  }
  updateUser(user: User) {
    this.afDatabase.database.ref('users/' + user.id).update({
      'preferredFrequency': user.preferredFrequency,
      'status': user.status,
      'transmitting': user.transmitting,
    });
  }
  updateUserAndPhoto(user: User) {
    return this.afDatabase.database.ref('users/' + user.id).update({
      'preferredFrequency': user.preferredFrequency,
      'status': user.status,
      'transmitting': user.transmitting,
    });
  }
  updateAntenna(antenna: Antenna) {
    this.afDatabase.database.ref('antennae/' + antenna.id).set(antenna);
  }
  updateRadioSet(radioset: RadioSet) {
    this.afDatabase.database.ref('equipment/' + radioset.id).set(radioset);
  }
  deleteAntenna(antenna: Antenna) {
    this.afDatabase.database.ref('antennae/' + antenna.id).remove();
  }
  deleteRadioSet(radioset: RadioSet) {
    this.afDatabase.database.ref('equipment/' + radioset.id).remove();
  }

}
