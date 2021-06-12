import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '../../../node_modules/@angular/fire/database'
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
import { DataSnapshot } from '@angular/fire/database/interfaces';

@Injectable({
  providedIn: 'root'
})

export class FirebaseObtainerService {

  constructor(public afDatabase: AngularFireDatabase ,public auth: AngularFireAuth) {
   }
   listAllAntennas() : Promise<DataSnapshot> {
    return this.afDatabase.database.ref("antennae").get();
   }
   listAllRadioSets() {
    return this.afDatabase.database.ref("equipment").get();
   }
   listAllUsers() {
    return this.afDatabase.database.ref("users").get();
   }
   listAllContacts(userid: string) {
    return this.afDatabase.database.ref('/users/'+userid+'/contacts').get();
   }
   listMyself(userid: string) {
    return this.afDatabase.database.ref('/users/'+userid).get();
   }
   listAllUserAntennas(userid: string) {
     return this.afDatabase.database.ref('/users/'+userid+"/antennae").get();
   }
   listAllUserRadioSets(userid: string) {
    return this.afDatabase.database.ref('/users/'+userid+"/equipment").get();
  }
}


