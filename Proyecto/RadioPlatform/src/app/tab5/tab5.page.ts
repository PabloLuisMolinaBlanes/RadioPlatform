import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {FirebaseObtainerService} from '../firebase-obtainer.service'
import { DataSnapshot } from '@angular/fire/database/interfaces';
@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
usersTotal: User[] = [];
usersVisible: User[] = [];
allUsers: Promise<DataSnapshot>;
transmitting: boolean;
frequency: string = "";
status: string = "";
country: string = "";
user: User = new User("Spain", "440mhz", "mygreatcat", "offline", false);
  constructor(public firebaseObtainerService: FirebaseObtainerService) { }

  ngOnInit() {
    this.usersTotal.push(this.user);
    this.usersVisible = this.usersTotal;
    this.usersVisible = this.usersTotal;
    this.allUsers = this.firebaseObtainerService.listAllUsers();
    this.allUsers.then(m => {
      m.forEach(user => {this.usersTotal.push(user.val() as unknown as User)
      this.usersVisible = this.usersTotal});
    });
  }
  updateArray() {

    this.usersVisible = this.usersTotal.filter(this.filterusers, this);
  }
  filterusers = function(user: User) {
    console.log(this.frequency);
    if ((this.transmitting === undefined || user.transmitting === this.transmitting) && (this.status === "" || user.status === this.status) &&  (this.country === "" || user.country === this.country) && (this.frequency === "" || user.preferredFrequency === this.frequency)) {
      return true;
    } else {
      return false;
  }

  }
}
