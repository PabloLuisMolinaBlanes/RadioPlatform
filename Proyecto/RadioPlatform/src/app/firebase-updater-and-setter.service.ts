import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/@angular/fire/database'
import { AngularFireAuth } from '../../node_modules/@angular/fire/auth'
import {AlertController} from '@ionic/angular'
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
  constructor(public afDatabase: AngularFireDatabase, public auth: AngularFireAuth, public http: HttpClient, public storage: AngularFireStorage, public alertCtrl: AlertController) { }
  setAntenna(antenna: Antenna) {
    this.auth.currentUser.then(user => {
      this.afDatabase.database.ref('users/'+user.uid+'/antennae').push(antenna).then((r) => { 
        antenna.id = r.key;
        this.afDatabase.database.ref('users/'+user.uid+'/antennae/' + r.key).update({ id: r.key })
        this.afDatabase.database.ref('antennae/'+r.key).set(antenna);
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
  setFavouriteRadioSet(radioset: string) {
    this.auth.currentUser.then(user => {
      this.afDatabase.database.ref('users/'+user.uid).update({favouriteRadioSet: radioset});
    })
  }
  setRadioSet(radioset: RadioSet) {
    this.auth.currentUser.then(user => {
      this.afDatabase.database.ref('users/'+user.uid+'/equipment').push(radioset).then((r) => { 
        this.afDatabase.database.ref('users/'+user.uid+'/equipment/' + r.key).update({ id: r.key }).then(() => {
          radioset.id = r.key
          this.afDatabase.database.ref('equipment/'+r.key).set(radioset);
          this.alertCtrl.create({
            message: "Item added succesfully",
            buttons: [{
              text: "OK",
              role: 'ok'
            }]
          }).then(a => {
            a.present();
          });
        }) });
    });
  }
  setFavouriteAntenna(antenna: string) {
    this.auth.currentUser.then(user => {
      this.afDatabase.database.ref('users/'+user.uid).update({favouriteAntenna: antenna});
    })
  }
  setUser(user: User) {
    this.afDatabase.database.ref('users/' + user.id).set(user).then(() => {
    });
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
      this.mayi1 = true;
    });
    this.http.get<any>('http://localhost:3001/list/Málaga', {}).subscribe(val => {
      this.mayi2 = true;
      if (val.length > 0) {
        console.log(val[0].coordenada);
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
        this.http.get<any>('http://localhost:3001/cani', {}).subscribe(data => {
          console.log(data[0]);
          this.mayi3 = true;
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
        });
      }
    });
  }
  async setContact(contact: Contact, audio: File) {
    if ((this.mayi1 && this.mayi2 && this.mayi3) || contact.location === null) {
      if (contact.location === null) {
        this.auth.currentUser.then(user => {
          this.afDatabase.database.ref('users/'+user.uid+'/contacts/').push(contact).then((r) => { this.afDatabase.database.ref('users/'+user.uid+'/contacts/' + r.key).update({ id: r.key }) }).then(r => {
            if (audio !== null) {
              this.auth.currentUser.then(u => {
                this.storage.ref(u.uid).listAll().subscribe(data => {
                  this.storage.ref(u.uid).child(""+contact.number).put(audio).then(() => {
                    this.alertCtrl.create({
                      message: "Item added succesfully",
                      buttons: [{
                        text: "OK",
                        role: 'ok'
                      }]
                    }).then(a => {
                      a.present();
                    }); 
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
          });
        })
      } else {
        this.http.get<any>('http://localhost:3001/list/' + contact.location, {}).subscribe(val => {
          if (val.length > 0) {
            contact.coordinates = val[0].coordenada;
            contact.recording = null;
            console.log("uploading... (1)");
            this.auth.currentUser.then(user => {
              this.afDatabase.database.ref('users/'+user.uid+'/contacts/').push(contact).then((r) => { this.afDatabase.database.ref('users/'+user.uid+'/contacts/' + r.key).update({ id: r.key }) }).then(r => {
                if (audio !== null) {
                  this.auth.currentUser.then(u => {
                    this.storage.ref(u.uid).listAll().subscribe(data => {
                      this.storage.ref(u.uid).child(""+contact.number).put(audio).then(() =>{
                        this.alertCtrl.create({
                          message: "Item added succesfully",
                          buttons: [{
                            text: "OK",
                            role: 'ok'
                          }]
                        }).then(a => {
                          a.present();
                        });  
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
              });
            })
          } else {
            this.http.get<any>('http://localhost:3001/cani', {}).subscribe(data => {
              console.log(data[0]);
              if (data[0].issearching === 0) {
                var headers = new HttpHeaders();
                headers = headers.append('Application', 'RadioPlatform (https://github.com/PabloLuisMolinaBlanes/RadioPlatform)');
                const params = new HttpParams();
                params.append('q', contact.location);
                params.append('email', 'pablo.molina@iescampanillas.com');
                this.http.get<any>('https://nominatim.openstreetmap.org/search.php?q='+contact.location+'&email=pablo.molina@iescampanillas.com&format=json&limit=1',{headers}).subscribe(data => {
                  const lat = data[0].lat;
                  const lon = data[0].lon;
                  console.log(lat);
                  console.log(lon);
                  contact.coordinates = "" + lat + "," + "" + lon;
                  this.http.post<any>('http://localhost:3001/newcoordinate/', { "coordenada": data[0].lat + "," + data[0].lon, "terminobusqueda": contact.location }).subscribe(data => {
                    this.http.post<any>('http://localhost:3001/operatecon/', {}).subscribe(data => {
                      console.log(data);
                      setTimeout(() => {
                        this.http.post<any>('http://localhost:3001/operatecon/', {}).subscribe(data => {
                          console.log(data);
                          contact.recording = null;
                          console.log("uploading... (2)");
                          this.auth.currentUser.then(user => {
                            this.afDatabase.database.ref('users/'+user.uid+'/contacts/').push(contact).then((r) => { this.afDatabase.database.ref('users/'+user.uid+'/contacts/' + r.key).update({ id: r.key }) }).then(r => {
                              this.auth.currentUser.then(u => {
                                this.storage.ref(u.uid).listAll().subscribe(data => {
                                  this.storage.ref(u.uid).child(""+contact.number).put(audio).then(() => {
                                    this.alertCtrl.create({
                                      message: "Item added succesfully",
                                      buttons: [{
                                        text: "OK",
                                        role: 'ok'
                                      }]
                                    }).then(a => {
                                      a.present();
                                    }); 
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
                            });
                          })
                        });
                      }, 3000);
                    });
                  });
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
    if ((this.mayi1 && this.mayi2 && this.mayi3) || contact.location === null) {
      if (contact.location === null) {
        this.auth.currentUser.then(user => {
          this.afDatabase.database.ref('users/'+user.uid+'/contacts/'+contact.id).set(contact).then(r => {
            if (audio !== null) {
              this.auth.currentUser.then(u => {
                this.storage.ref(u.uid).listAll().subscribe(data => {
                  this.storage.ref(u.uid).child(""+contact.number).put(audio).then(() => {
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
          });
        })
      } else {
        this.http.get<any>('http://localhost:3001/list/' + contact.location, {}).subscribe(val => {
          if (val.length > 0) {
            contact.coordinates = val[0].coordenada;
            contact.recording = null;
            console.log("uploading... (1)");
            console.log(contact);
            this.auth.currentUser.then(user => {
              this.afDatabase.database.ref('users/'+user.uid+'/contacts/'+contact.id).set(contact).then(r => {
                if (audio !== null) {
                  this.auth.currentUser.then(u => {
                    this.storage.ref(u.uid).listAll().subscribe(data => {
                      this.storage.ref(u.uid).child(""+contact.number).put(audio).then(() => {
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
              });
            })
          } else {
            this.http.get<any>('http://localhost:3001/cani', {}).subscribe(data => {
              console.log(data[0]);
              if (data[0].issearching === 0) {
                var headers = new HttpHeaders();
                headers = headers.append('Application', 'RadioPlatform (https://github.com/PabloLuisMolinaBlanes/RadioPlatform)');
                const params = new HttpParams();
                params.append('q', contact.location);
                params.append('email', 'pablo.molina@iescampanillas.com');
                this.http.get<any>('https://nominatim.openstreetmap.org/search.php?q='+contact.location+'&email=pablo.molina@iescampanillas.com&format=json&limit=1',{headers}).subscribe(data => {
                  const lat = data[0].lat;
                  const lon = data[0].lon;
                  console.log(lat);
                  console.log(lon);
                  contact.coordinates = "" + lat + "," + "" + lon;
                  this.http.post<any>('http://localhost:3001/newcoordinate/', { "coordenada": data[0].lat + "," + data[0].lon, "terminobusqueda": contact.location }).subscribe(data => {
                    this.http.post<any>('http://localhost:3001/operatecon/', {}).subscribe(data => {
                      console.log(data);
                      setTimeout(() => {
                        this.http.post<any>('http://localhost:3001/operatecon/', {}).subscribe(data => {
                          console.log(data);
                          contact.recording = null;
                          console.log("uploading... (2)");
                          this.auth.currentUser.then(user => {
                            this.afDatabase.database.ref('users/'+user.uid+'/contacts/'+contact.id).set(contact).then(r => {
                              this.auth.currentUser.then(u => {
                                this.storage.ref(u.uid).listAll().subscribe(data => {
                                  this.storage.ref(u.uid).child(""+contact.number).put(audio).then(() => {
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
                            });
                          })
                        });
                      }, 3000);
                    });
                  });
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
        this.afDatabase.database.ref('users/'+user.uid+'/contacts/'+contact.id).remove().then(c => {
          this.auth.currentUser.then(user => {
            this.storage.ref(user.uid+"/"+thisnumber).delete().subscribe(() => {
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
  setUserAndPhoto(user: User) {
    if (user.callsign !== null || user.callsign !== undefined) {
      this.afDatabase.database.ref('callsigns/'+user.callsign).set(user.username).then(c => {
        return this.afDatabase.database.ref('users/' + user.id).set(user);
      });
    } else {
      return this.afDatabase.database.ref('users/' + user.id).set(user);
    }
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
    this.auth.currentUser.then((user) => {
      this.afDatabase.database.ref('users/' + user.uid+'/antennae/'+antenna.id).set(antenna);
    })
  }
  updateRadioSet(radioset: RadioSet) {
    this.afDatabase.database.ref('equipment/' + radioset.id).set(radioset);
    this.auth.currentUser.then((user) => {
      this.afDatabase.database.ref('users/' + user.uid+'/equipment/'+radioset.id).set(radioset);
    })
  }
  deleteAntenna(antenna: Antenna) {
      this.afDatabase.database.ref('antennae/' + antenna.id).remove();
  }
  deleteAntennaUser(antenna: Antenna) {
    this.auth.currentUser.then(user => {
      this.afDatabase.database.ref('users/'+user.uid+'/antennae/' + antenna.id).remove();
    })
  }
  deleteRadioSet(radioset: RadioSet) {
    this.afDatabase.database.ref('equipment/' + radioset.id).remove();
  }
  deleteRadioSetUser(radioset: RadioSet) {
    this.auth.currentUser.then(
     user => {
      this.afDatabase.database.ref('users/'+user.uid+'/equipment/'+radioset.id).remove();
     } 
    )
  }
}
