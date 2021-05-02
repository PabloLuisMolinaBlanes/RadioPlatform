import { Component, OnInit } from '@angular/core';
import {Socket} from 'ngx-socket-io';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private socket: Socket) { }

  ngOnInit() {
    this.socket.connect();
  }

}
