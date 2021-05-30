import { Component, OnInit } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { Antenna } from '../antenna';
import { RadioSet } from '../radioset';
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
import {AngularFireDatabase} from '../../../node_modules/@angular/fire/database'
@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {
messages: String[] = [];
radiosetsVisible: RadioSet[] = [];
radiosetsTotal: RadioSet[] = [];
antennaeVisible: Antenna[] = [];
  constructor(private socket: Socket, public auth: AngularFireAuth, public afDatabase: AngularFireDatabase) { }

  ngOnInit() {
    this.socket.connect(); //temporal
    this.socket.on('newmessage', (data) => {
      this.messages.push(data);
      });

      this.afDatabase.database.ref("/equipment").on("child_added", function (childsnapshot) {
        this.radiosetsTotal.push(childsnapshot.val() as unknown as RadioSet);
        this.radiosetsVisible = this.radiosetsTotal;
      }, () => {console.log("error here")}, this);
      this.afDatabase.database.ref("/antennnae").on("child_added", function (childsnapshot) {
        this.antennaeTotal.push(childsnapshot.val() as unknown as Antenna);
        this.antennaeVisible = this.antennaeTotal;
      }, () => {console.log("error here")}, this);
  }

}
