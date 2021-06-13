import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import {FirebaseObtainerService} from '../../services/firebase-obtainer.service'
import { DataSnapshot } from '@angular/fire/database/interfaces';
import {AngularFireDatabase} from '../../../../node_modules/@angular/fire/database'
import { AngularFireStorage } from '@angular/fire/storage';
import { ɵDomSanitizerImpl } from '@angular/platform-browser';
import { UseritemComponent } from '../../components/useritem/useritem.component';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
usersTotal: User[] = [];
usersVisible: User[] = [];
allUsers: Promise<DataSnapshot>;
transmitting: string;
frequency: string = "";
status: string = "";
country: string = "";
frequencies: string[] = [];
countries: string[] = [];
  constructor(public firebaseObtainerService: FirebaseObtainerService,public afDatabase: AngularFireDatabase, public storage: AngularFireStorage, private sanitizer: ɵDomSanitizerImpl) { }

  ngOnInit() {
    this.usersVisible = this.usersTotal;
    this.usersVisible = this.usersTotal;
    this.allUsers = this.firebaseObtainerService.listAllUsers();
this.afDatabase.database.ref("users").on("child_changed", function (childsnapshot) {
  const child = childsnapshot.val() as unknown as User;
  this.countries.push(child.country);
        this.frequencies.push(child.preferredFrequency);
        this.countries = [...new Set(this.countries)];
        this.frequencies = [...new Set(this.frequencies)];
  this.usersVisible.forEach(user => {
    if (child.id === user.id) {
      user.username = child.username;
      user.country = child.country;
      user.callsign = child.callsign;
      user.favouriteAntenna = child.favouriteAntenna.substr(child.favouriteAntenna.indexOf(' '), child.favouriteAntenna.length);;
      user.favouriteRadioSet = child.favouriteRadioSet.substr(child.favouriteRadioSet.indexOf(' '), child.favouriteRadioSet.length);
      user.preferredFrequency = child.preferredFrequency;
      user.transmitting = child.transmitting;
      user.transmittingFrequency = child.transmittingFrequency;
      user.status = child.status;
    }
  });
}, () => {console.log("error here")}, this);    
this.allUsers.then(m => {
      m.forEach(user => {
      const thisuser = user.val() as unknown as User;
      this.countries.push(thisuser.country);
        this.frequencies.push(thisuser.preferredFrequency);
        this.countries = [...new Set(this.countries)];
        this.frequencies = [...new Set(this.frequencies)];
      if (thisuser.favouriteAntenna !== undefined) {
        thisuser.favouriteAntenna = thisuser.favouriteAntenna.substr(thisuser.favouriteAntenna.indexOf(' '), thisuser.favouriteAntenna.length);
      }
      if (thisuser.favouriteRadioSet !== undefined) {
        thisuser.favouriteRadioSet = thisuser.favouriteRadioSet.substr(thisuser.favouriteRadioSet.indexOf(' '), thisuser.favouriteRadioSet.length);
    }
      this.storage.ref(thisuser.id).getDownloadURL().toPromise().then((downloadURL) => {
        thisuser.profilepicture = this.sanitizer.bypassSecurityTrustResourceUrl(downloadURL);
        this.usersTotal.push(thisuser);
      }).catch((error) => {
        thisuser.profilepicture = undefined;
        if (thisuser.favouriteAntenna !== undefined) {
          thisuser.favouriteAntenna = thisuser.favouriteAntenna.substr(thisuser.favouriteAntenna.indexOf(' '), thisuser.favouriteAntenna.length);
        }
        if (thisuser.favouriteRadioSet !== undefined) {
          thisuser.favouriteRadioSet = thisuser.favouriteRadioSet.substr(thisuser.favouriteRadioSet.indexOf(' '), thisuser.favouriteRadioSet.length);
      }
        this.usersTotal.push(thisuser);
      })
      this.usersVisible = this.usersTotal
    });
    });
  }
  updateArray() {

    this.usersVisible = this.usersTotal.filter(this.filterusers, this);
  }
  filterusers = function(user: User) {
    console.log(this.frequency);
    if ((this.status === "" || user.status === this.status) &&  (this.country === "" || user.country === this.country) && (this.frequency === "" || user.preferredFrequency === this.frequency) && (this.transmitting === "" || user.transmitting === (this.transmitting === "true" ? true : false))) {
      return true;
    } else {
      return false;
  }

  }
}
