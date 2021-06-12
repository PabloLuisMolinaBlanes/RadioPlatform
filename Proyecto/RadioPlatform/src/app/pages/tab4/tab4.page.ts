import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth'
import { AlertController } from '@ionic/angular'
import firebase from "firebase/app"
import * as socket from 'socket.io-client';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
message: string;
messages: string[] = [];
blockedusers: string[] = [];
user: firebase.User;
socketio: any;
  constructor(private afauth: AngularFireAuth, private alertCtrl: AlertController) { }

  ngOnInit() {

    this.socketio = socket.io("https://radioplatforminfrastructure.herokuapp.com/");
    this.socketio.connect();
    this.socketio.on('newmessage', (data, username, blocked) => {
      if (blocked === false && this.blockedusers.findIndex(usernames => username === usernames) === -1) {
        console.log(this.blockedusers);
        this.messages.push(data);
      } else if (blocked === true && this.user.email === username) {
        this.messages.push(data);
      }
      });
      this.socketio.on('deletethis', (data) => {
        if (this.messages.findIndex(message => data === message) === -1) {

        } else {
          this.messages[this.messages.findIndex(message => data === message)] = "(This message has been deleted by the moderators)";
        }
      })
    this.afauth.currentUser.then(user => {
      if (user != null) {
        this.user = user;
        this.socketio.on('addthis', (data) => {
          console.log("detected sending of blocked");
          console.log(this.user.email);
          console.log(data);
          if (data[''+this.user.email] !== undefined) {
            this.blockedusers = data[''+this.user.email];
          }
          console.log(this.blockedusers);
        });
      }
    });
  }
  async presentBlockConfirmation(message: string) {
    let alert = this.alertCtrl.create({
      message: 'Are you sure you want to block this user: ' + message.substr(0, message.search(":")) + '?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Block',
        handler: () => {
          this.socketio.emit('blockthis', this.user.email, message.substr(0, message.search(":")));
          this.blockedusers.push(message.substr(0, message.search(":")));
        }
      }
      ]
    });
    (await alert).present();
  }
  async presentUnBlockConfirmation(message: string) {
    let alert = this.alertCtrl.create({
      message: 'Are you sure you want to unblock this user: ' + message + '?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Unblock',
        handler: () => {
          this.socketio.emit('unblockthis', this.user.email, message);
          console.log()
          this.blockedusers = this.blockedusers.filter(username3 => username3 !== message);
        }
      }
      ]
    });
    (await alert).present();
  }
  send() {
    console.log(this.user);
    let email = "placeholder";
    if (this.user !== undefined) {
      email = this.user.email
    }
    this.socketio.emit('send', email === "placeholder" ? "anonymous" + ": " + this.message : email + ": " + this.message, email);
  }

}
