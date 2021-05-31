import { Component, OnInit } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { Antenna } from '../antenna';
import {AlertController} from '@ionic/angular'
import { RadioSet } from '../radioset';
import * as socket from 'socket.io-client';
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
import {AngularFireDatabase} from '../../../node_modules/@angular/fire/database'
@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {
messages: string[] = [];
radiosetsVisible: RadioSet[] = [];
radiosetsTotal: RadioSet[] = [];
antennaeVisible: Antenna[] = [];
antennaeTotal: Antenna[] = [];
socketio: any;
isadmin: boolean = true;
  constructor(private socket: Socket, public auth: AngularFireAuth, public afDatabase: AngularFireDatabase, public alertCtrl: AlertController) { }
  ngOnInit() {
    this.socketio = socket.io("http://localhost:3001");
    this.socketio.connect();
    this.socketio.on('newmessage', (data) => {
      this.messages.push(data);
      });
      this.socketio.on('deletethis', (data) => {
        if (this.messages.findIndex(message => data === message) === -1) {
        } else {
          this.messages[this.messages.findIndex(message => data === message)] = "(This message has been deleted by the moderators)";

          console.log("It should have worked");

        }
      });
      this.afDatabase.database.ref("/equipment").on("child_added", function (childsnapshot) {
        this.radiosetsTotal.push(childsnapshot.val() as unknown as RadioSet);
        this.radiosetsVisible = this.radiosetsTotal;
      }, () => {console.log("error here")}, this);
      this.afDatabase.database.ref("/antennae").on("child_added", function (childsnapshot) {
        this.antennaeTotal.push(childsnapshot.val() as unknown as Antenna);
        this.antennaeVisible = this.antennaeTotal;
      }, () => {console.log("error here")}, this);
      this.afDatabase.database.ref("/antennae").on("child_changed", function (childsnapshot) {
        var child = childsnapshot.val() as unknown as Antenna;
        console.log("detected change");
        console.log(this.antennaeVisible);
        this.antennaeVisible.forEach(ant => {
          if (child.id === ant.id || ant.id === "placeholder") {
            console.log(ant);
            console.log("found antenna");
            ant.name = child.name;
            ant.type = child.type;
            ant.height = child.height;
            ant.brand = child.brand;
            ant.range = child.range;
            ant.price = child.price;
            ant.id = child.id;
          }
        });
        this.antennaeTotal = this.antennaeVisible;
        this.storage.set('antennae', this.antennaeTotal);
      }, () => {console.log("error here")}, this);
      this.afDatabase.database.ref("/antennae").on("child_removed", function (childsnapshot) {
        var child = childsnapshot.val() as unknown as Antenna
        console.log("detected deleted");
        this.antennaeVisible.forEach(ant => {
          if (child.id === ant.id) {
            console.log("found deleted");
            this.antennaeVisible = this.antennaeVisible.filter(antenna => antenna !== ant);
          }
        });
        this.antennaeTotal = this.antennaeVisible;
        this.storage.set('antennae', this.antennaeTotal);
      }, () => {console.log("error here")}, this);
      this.afDatabase.database.ref("/equipment").on("child_changed", function (childsnapshot) {
        var child = childsnapshot.val() as unknown as RadioSet;
        console.log("detected change");
        this.radiosetsVisible.forEach(ant => {
          console.log(ant);
          if (child.id === ant.id || ant.id === "placeholder") {
            console.log("found radioset");
            ant.name = child.name;
            ant.type = child.type;
            ant.brand = child.brand;
            ant.amplitude = child.amplitude;
            ant.price = child.price;
            ant.id = child.id;
          }
        });
        this.radiosetsTotal = this.radiosetsVisible;
        this.storage.set('antennae', this.radiosetsTotal);
      }, () => {console.log("error here")}, this);
      this.afDatabase.database.ref("/equipment").on("child_removed", function (childsnapshot) {
        var child = childsnapshot.val() as unknown as RadioSet
        console.log("detected deleted");
        this.radiosetsVisible.forEach(ant => {
          if (child.id === ant.id) {
            console.log("found deleted radioset");
            this.radiosetsVisible = this.radiosetsVisible.filter(antenna => antenna !== ant);
          }
        });
        this.radiosetsTotal = this.radiosetsVisible;
        this.storage.set('antennae', this.radiosetsTotal);
      }, () => {console.log("error here")}, this);
  }
  async presentBlockDialog(message: string) {

    let alert = this.alertCtrl.create({
      message: 'For how long do you want to block ' + message.substr(0,message.search(":")) + '?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {text:'5 min',
      handler: () => {
        this.socketio.emit('block', message.substr(0,message.search(":")), 30000);
      }
    },
      {text:'10 min',
      handler: () => {
        this.socketio.emit('block', message.substr(0,message.search(":")), 60000);
      }
    },
      {text:'15 min',
      handler: () => {
        this.socketio.emit('block', message.substr(0,message.search(":")), 90000);
      }
      }
    ]
    });
    (await alert).present();
  }
  async presentDeleteConfirmation(message: string) {
    let alert = this.alertCtrl.create({
      message: 'Are you sure you want to delete this message: ' + message + '?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {text:'Delete',
      handler: () => {
        this.socketio.emit('delete', message);
      }
      }
    ]
    });
    (await alert).present();
  }
}
