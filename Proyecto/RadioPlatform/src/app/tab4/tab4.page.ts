import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
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
user: firebase.User;
socketio: any;
  constructor(private afauth: AngularFireAuth) { }

  ngOnInit() {

    this.socketio = socket.io("https://radioplatforminfrastructure.herokuapp.com/");
    this.socketio.connect();
    this.socketio.on('newmessage', (data, username, blocked) => {
      if (blocked === false) {
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
      }
    });
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
