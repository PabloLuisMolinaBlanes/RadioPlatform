import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-useritem',
  templateUrl: './useritem.component.html',
  styleUrls: ['./useritem.component.scss'],
})
export class UseritemComponent implements OnInit {
@Input() user: User;
  constructor() { }

  ngOnInit() {}

}
