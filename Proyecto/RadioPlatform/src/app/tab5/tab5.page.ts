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

}
