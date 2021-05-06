import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
usersTotal: User[] = [];
usersVisible: User[] = [];
user: User = new User("Spain", "440mhz", "mygreatcat", "offline", false);
  constructor() { }

  ngOnInit() {
    this.usersTotal.push(this.user);
    this.usersVisible = this.usersTotal;
  }

}
