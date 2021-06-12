import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../classes/user';

@Component({
  selector: 'app-useritem',
  templateUrl: './useritem.component.html',
  styleUrls: ['./useritem.component.scss'],
})
export class UseritemComponent implements OnInit {
@Input() user: User;
@Input() users: User[] = [];
  constructor() { }

  ngOnInit() {
  }

}
