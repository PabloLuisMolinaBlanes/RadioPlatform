import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/@angular/fire/database'
import { AngularFireAuth } from '../../node_modules/@angular/fire/auth'
import { AlertController } from '@ionic/angular'
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
  mayi1: boolean = true;
  mayi2: boolean = true;
  mayi3: boolean = true;
  constructor(public afDatabase: AngularFireDatabase, public auth: AngularFireAuth, public https: HttpClient, public storage: AngularFireStorage, public alertCtrl: AlertController) { }
  setAntenna(antenna: Antenna) {
    this.auth.currentUser.then(user => {
      this.afDatabase.database.ref('users/' + user.uid + '/antennae').push(antenna).then((r) => {
        antenna.id = r.key;
        this.afDatabase.database.ref('users/' + user.uid + '/antennae/' + r.key).update({ id: r.key })
        this.afDatabase.database.ref('antennae/' + r.key).set(antenna);
        this.alertCtrl.create({
          message: "Item added succesfully",
          buttons: [{
            text: "OK",
            role: 'ok'
          }]
        }).then(a => {
          a.present();
        });
      });
    });
  }
  setAntennaAdmin(antenna: Antenna) {
    this.afDatabase.database.ref('/antennae/').push(antenna).then(r => {
      this.afDatabase.database.ref('/antennae/'+r.key).update({id: r.key}).then(a => {
        this.makeAddSuccessMessage();
      });
    })
  }
  setRadioSetAdmin(radioset: RadioSet) {
    this.afDatabase.database.ref('/equipment/').push(radioset).then(r => {
      this.afDatabase.database.ref('/equipment/'+r.key).update({id: r.key}).then(a => {
        this.makeAddSuccessMessage();
      });
    })
  }
  setFavouriteRadioSet(radioset: string) {
    this.auth.currentUser.then(user => {
      this.afDatabase.database.ref('users/' + user.uid).update({ favouriteRadioSet: radioset });
    })
  }
  setRadioSet(radioset: RadioSet) {
    this.auth.currentUser.then(user => {
      this.afDatabase.database.ref('users/' + user.uid + '/equipment').push(radioset).then((r) => {
        radioset.id = r.key;
        this.afDatabase.database.ref('users/' + user.uid + '/equipment/' + r.key).update({ id: r.key }).then(() => {
          this.afDatabase.database.ref('equipment/' + radioset.id).set(radioset);
          this.alertCtrl.create({
            message: "Item added succesfully",
            buttons: [{
              text: "OK",
              role: 'ok'
            }]
          }).then(a => {
            a.present();
          });
        })
      });
    });
  }
  setFavouriteAntenna(antenna: string) {
    this.auth.currentUser.then(user => {
      this.afDatabase.database.ref('users/' + user.uid).update({ favouriteAntenna: antenna });
    })
  }
  makeErrorMessage() {
    this.alertCtrl.create({
      message: "There has been an error in the infrastructure, please try again later",
      buttons: [{
        text: "OK",
        role: 'ok'
      }]
    }).then(a => {
      a.present();
    });
  }
  makeAddSuccessMessage() {
    this.alertCtrl.create({
      message: "Item added succesfully",
      buttons: [{
        text: "OK",
        role: 'ok'
      }]
    }).then(a => {
      a.present();
    });
  }
  testHTML() {
    const headers = new HttpHeaders();
    const params = new HttpParams();
    headers.set('User-Agent', 'RadioPlatform (https://github.com/PabloLuisMolinaBlanes/RadioPlatform)');
    console.log(this.https.get<any>('https://radioplatforminfrastructure.herokuapp.com/list/Málaga', { headers }));
    this.https.get<any>('https://radioplatforminfrastructure.herokuapp.com/list/Malaga', { headers }).toPromise().then(val => {
      if (val.length === 0) {
        console.log("empty")
      } else {
        console.log(val);
      }
      this.mayi1 = true;
    }).catch(err => {
      this.makeErrorMessage();
    });
    this.https.get<any>('https://radioplatforminfrastructure.herokuapp.com/list/Malaga', {}).toPromise().then(val => {
      this.mayi2 = true;
      if (val.length > 0) {
        console.log(val[0].coordenada);
      } else {
        this.https.get<any>('https://radioplatforminfrastructure.herokuapp.com/cani', {}).toPromise().then(data => {
          console.log(data[0]);
          this.mayi3 = true;
          if (data[0].issearching === 0) {
            const headers = new HttpHeaders();
            headers.set('User-Agent', 'RadioPlatform (https://github.com/PabloLuisMolinaBlanes/RadioPlatform)');
            const params = new HttpParams();
            this.https.get<any>('')
            this.https.post<any>('https://radioplatforminfrastructure.herokuapp.com/operatecon/', {}).toPromise().then(data => {
              console.log(data);
              setTimeout(() => {
                this.https.post<any>('https://radioplatforminfrastructure.herokuapp.com/operatecon/', {}).toPromise().then(data => {
                  console.log(data);
                }).catch(err => {
                  this.makeErrorMessage();
                });
              }, 3000);
            }).catch(err => {
              this.makeErrorMessage();
            });
          }
        }).catch(err => {
          this.makeErrorMessage();
        });
      }
    }).catch(err => {
      this.makeErrorMessage();
    });
  }
  setContactMethod(contact: Contact, audio: File) {
    this.auth.currentUser.then(u => {
      this.storage.ref(u.uid).listAll().toPromise().then(data => {
        this.storage.ref(u.uid).child("" + contact.number).put(audio).then(() => {
          this.makeAddSuccessMessage();
        }).catch(err => {
          this.alertCtrl.create({
            message: "Item added succesfully, no audio detected",
            buttons: [{
              text: "OK",
              role: 'ok'
            }]
          }).then(a => {
            a.present();
          });
        });
      });
    });
  }
  updateContactMethod(contact: Contact, audio: File) {
    this.auth.currentUser.then(u => {
      this.storage.ref(u.uid).listAll().toPromise().then(data => {
        this.storage.ref(u.uid).child("" + contact.number).put(audio).then(() => {
          this.alertCtrl.create({
            message: "Item updated succesfully",
            buttons: [{
              text: "OK",
              role: 'ok'
            }]
          }).then(a => {
            a.present();
          });
        }).catch(err => {
          this.alertCtrl.create({
            message: "Item updated succesfully, no audio detected",
            buttons: [{
              text: "OK",
              role: 'ok'
            }]
          }).then(a => {
            a.present();
          });
        });
      });
    });
  }
  async setContact(contact: Contact, audio: File) {
    contact.updated = "false";
    if ((this.mayi1 && this.mayi2 && this.mayi3) || contact.location === null) {
      if (contact.location === null) {
        this.auth.currentUser.then(user => {
          this.afDatabase.database.ref('users/' + user.uid + '/contacts/').push(contact).then((r) => {
            contact.number = r.key.replace("-", "").replace("_", "");
            this.afDatabase.database.ref('users/' + user.uid + '/contacts/' + r.key).update({ id: r.key, number: r.key.replace("-", "").replace("_", "") })
          }).then(r => {
            this.setContactMethod(contact, audio);
          });
        })
      } else {
        this.https.get<any>('https://radioplatforminfrastructure.herokuapp.com/list/' + contact.location, {}).toPromise().then(val => {
          if (val.length > 0) {
            contact.coordinates = val[0].coordenada;
            contact.recording = null;
            console.log("uploading... (1)");
            this.auth.currentUser.then(user => {
              this.afDatabase.database.ref('users/' + user.uid + '/contacts/').push(contact).then((r) => {
                contact.number = r.key.replace("-", "").replace("_", "");
                this.afDatabase.database.ref('users/' + user.uid + '/contacts/' + r.key).update({ id: r.key, number: r.key.replace("-", "").replace("_", "") })
              }).then(r => {
                this.setContactMethod(contact, audio);
              });
            })
          } else {
            this.https.get<any>('https://radioplatforminfrastructure.herokuapp.com/cani', {}).toPromise().then(data => {
              console.log(data[0]);
              if (data[0].issearching === false) {
                var headers = new HttpHeaders();
                headers = headers.append('Application', 'RadioPlatform (https://github.com/PabloLuisMolinaBlanes/RadioPlatform)');
                headers = headers.append('Access-Control-Allow-Origin', 'https://www.openstreetmap.org');
                const params = new HttpParams();
                params.append('q', contact.location);
                params.append('email', 'pablo.molina@iescampanillas.com');
                this.https.get<any>('https://nominatim.openstreetmap.org/search.php?q=' + contact.location + '&email=pablo.molina@iescampanillas.com&format=json&limit=1', { headers }).toPromise().then(data => {
                  if (data[0] === undefined) {
                    this.alertCtrl.create({
                      message: "No location has been found, please try another",
                      buttons: [{
                        text: "OK",
                        role: 'ok'
                      }]
                    }).then(a => {
                      a.present();
                      this.https.post<any>('https://radioplatforminfrastructure.herokuapp.com/operatecon/', {}).toPromise().then(data => {
                        console.log(data);
                        setTimeout(() => {
                          this.https.post<any>('https://radioplatforminfrastructure.herokuapp.com/operatecon/', {}).toPromise().then(data => {
                        });
                      });
                    });
                  });
                  } else {
                    const lat = data[0].lat;
                    const lon = data[0].lon;
                    console.log(lat);
                    console.log(lon);
                    contact.coordinates = "" + lat + "," + "" + lon;
                    this.https.post<any>('https://radioplatforminfrastructure.herokuapp.com/newcoordinate/', { "coordenada": data[0].lat + "," + data[0].lon, "terminobusqueda": contact.location }).toPromise().then(data => {
                      this.https.post<any>('https://radioplatforminfrastructure.herokuapp.com/operatecon/', {}).toPromise().then(data => {
                        console.log(data);
                        setTimeout(() => {
                          this.https.post<any>('https://radioplatforminfrastructure.herokuapp.com/operatecon/', {}).toPromise().then(data => {
                            console.log(data);
                            contact.recording = null;
                            console.log("uploading... (2)");
                            this.auth.currentUser.then(user => {
                              this.afDatabase.database.ref('users/' + user.uid + '/contacts/').push(contact).then((r) => {
                                contact.number = r.key.replace("-", "").replace("_", "");
                                this.afDatabase.database.ref('users/' + user.uid + '/contacts/' + r.key).update({ id: r.key, number: r.key.replace("-", "").replace("_", "") })
                              }).then(r => {
                                this.setContactMethod(contact, audio);
                              });
                            })
                          });
                        }, 3000);
                      });
                    }); 
                  }
                });
              } else {
                this.alertCtrl.create({
                  message: "The server appears busy right now, please try again later",
                  buttons: [{
                    text: "OK",
                    role: 'ok'
                  }]
                }).then(a => {
                  a.present();
                });
              }
            });
          }
        });
      }
    } else {
      this.alertCtrl.create({
        message: "There has been an error in the infrastructure, please try again later",
        buttons: [{
          text: "OK",
          role: 'ok'
        }]
      }).then(a => {
        a.present();
      });
    }
  }
  updateContact(contact: Contact, audio: File) {
    console.log(contact.updated);
    if (contact.updated === "true") {
      contact.updated = "false";
      console.log(contact.updated + " modified");
    } else {
      contact.updated = "true";
      console.log(contact.updated + " modified");
    }
    if ((this.mayi1 && this.mayi2 && this.mayi3) || contact.location === null) {
      if (contact.location === null) {
        this.auth.currentUser.then(user => {
          this.afDatabase.database.ref('users/' + user.uid + '/contacts/' + contact.id).update(contact).then(r => {
            this.updateContactMethod(contact, audio);
          });
        })
      } else {
        this.https.get<any>('https://radioplatforminfrastructure.herokuapp.com/list/' + contact.location, {}).toPromise().then(val => {
          if (val.length > 0) {
            contact.coordinates = val[0].coordenada;
            contact.recording = null;
            console.log("uploading... (1)");
            console.log(contact);
            this.auth.currentUser.then(user => {
              this.afDatabase.database.ref('users/' + user.uid + '/contacts/' + contact.id).update(contact).then(r => {
                this.updateContactMethod(contact, audio);
              });
            })
          } else {
            this.https.get<any>('https://radioplatforminfrastructure.herokuapp.com/cani', {}).toPromise().then(data => {
              console.log(data[0]);
              if (data[0].issearching === false) {
                var headers = new HttpHeaders();
                headers = headers.append('Application', 'RadioPlatform (https://github.com/PabloLuisMolinaBlanes/RadioPlatform)');
                headers = headers.append('Access-Control-Allow-Origin', 'https://www.openstreetmap.org');
                const params = new HttpParams();
                params.append('q', contact.location);
                params.append('email', 'pablo.molina@iescampanillas.com');
                this.https.get<any>('https://nominatim.openstreetmap.org/search.php?q=' + contact.location + '&email=pablo.molina@iescampanillas.com&format=json&limit=1', { headers }).toPromise().then(data => {
                  if (data[0] === undefined) {
                    this.alertCtrl.create({
                      message: "No location has been found, please try another",
                      buttons: [{
                        text: "OK",
                        role: 'ok'
                      }]
                    }).then(a => {
                      a.present();
                      this.https.post<any>('https://radioplatforminfrastructure.herokuapp.com/operatecon/', {}).toPromise().then(data => {
                        console.log(data);
                        setTimeout(() => {
                          this.https.post<any>('https://radioplatforminfrastructure.herokuapp.com/operatecon/', {}).toPromise().then(data => {
                        });
                      });
                    });
                  });
                  } else {
                    const lat = data[0].lat;
                    const lon = data[0].lon;
                    console.log(lat);
                    console.log(lon);
                    contact.coordinates = "" + lat + "," + "" + lon;
                    this.https.post<any>('https://radioplatforminfrastructure.herokuapp.com/newcoordinate/', { "coordenada": data[0].lat + "," + data[0].lon, "terminobusqueda": contact.location }).toPromise().then(data => {
                      this.https.post<any>('https://radioplatforminfrastructure.herokuapp.com/operatecon/', {}).toPromise().then(data => {
                        console.log(data);
                        setTimeout(() => {
                          this.https.post<any>('https://radioplatforminfrastructure.herokuapp.com/operatecon/', {}).toPromise().then(data => {
                            console.log(data);
                            contact.recording = null;
                            console.log("uploading... (2)");
                            this.auth.currentUser.then(user => {
                              this.afDatabase.database.ref('users/' + user.uid + '/contacts/' + contact.id).update(contact).then(r => {
                                this.updateContactMethod(contact, audio);
                              });
                            });
                          });
                        }, 3000);
                      });
                    });
                  }
                });
              } else {
                this.alertCtrl.create({
                  message: "The server appears busy right now, please try again later",
                  buttons: [{
                    text: "OK",
                    role: 'ok'
                  }]
                }).then(a => {
                  a.present();
                });
              }
            });
          }
        });
      }
    } else {
      this.alertCtrl.create({
        message: "There has been an error in the infrastructure, please try again later",
        buttons: [{
          text: "OK",
          role: 'ok'
        }]
      }).then(a => {
        a.present();
      });
    }
  }
  deleteContact(contact: Contact) {
    let thisnumber = contact.number;
    this.auth.currentUser.then(user => {
      this.afDatabase.database.ref('users/' + user.uid + '/contacts/' + contact.id).remove().then(c => {
        this.auth.currentUser.then(user => {
          this.storage.ref(user.uid + "/" + thisnumber).delete().toPromise().then(() => {
            this.alertCtrl.create({
              message: "Audio deleted succesfully",
              buttons: [{
                text: "OK",
                role: 'ok'
              }]
            }).then(a => {
              a.present();
            });
          });
          this.alertCtrl.create({
            message: "Item deleted successfully",
            buttons: [{
              text: "OK",
              role: 'ok'
            }]
          }).then(a => {
            a.present();
          });
        })
      })
    })
  }
  setUser(user: User): Promise<any> {
    if (user.callsign !== null || user.callsign !== undefined) {
      this.afDatabase.database.ref('callsigns/' + user.callsign).set(user.username).then(c => {
      });
    }
    return this.afDatabase.database.ref('users/' + user.id).set(user);
  }
  updateUser(user: User) {
    this.afDatabase.database.ref('users/' + user.id).update({
      'preferredFrequency': user.preferredFrequency,
      'status': user.status,
      'transmitting': user.transmitting,
      'transmittingFrequency': user.transmittingFrequency
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
    this.auth.currentUser.then((user) => {
      this.afDatabase.database.ref('users/' + user.uid + '/antennae/' + antenna.id).set(antenna);
    })
  }
  updateRadioSet(radioset: RadioSet) {
    this.afDatabase.database.ref('equipment/' + radioset.id).set(radioset);
    this.auth.currentUser.then((user) => {
      this.afDatabase.database.ref('users/' + user.uid + '/equipment/' + radioset.id).set(radioset);
    })
  }
  deleteAntenna(antenna: Antenna) {
    this.afDatabase.database.ref('antennae/' + antenna.id).remove();
  }
  deleteAntennaUser(antenna: Antenna) {
    this.auth.currentUser.then(user => {
      this.afDatabase.database.ref('users/' + user.uid + '/antennae/' + antenna.id).remove();
    })
  }
  deleteRadioSet(radioset: RadioSet) {
    this.afDatabase.database.ref('equipment/' + radioset.id).remove();
  }
  deleteRadioSetUser(radioset: RadioSet) {
    this.auth.currentUser.then(
      user => {
        this.afDatabase.database.ref('users/' + user.uid + '/equipment/' + radioset.id).remove();
      }
    )
  }
}
