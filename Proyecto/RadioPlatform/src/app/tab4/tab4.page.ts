import { Component, OnInit } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
import firebase from "firebase/app"
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
message: string;
messages: string[] = [];
user: firebase.User;
  constructor(private socket: Socket, private afauth: AngularFireAuth) { }

  ngOnInit() {
    this.socket.connect(); //temporal
    this.socket.on('newmessage', (data) => {
      this.messages.push(data);
      });
    this.afauth.currentUser.then(user => {
      if (user != null) {
        this.socket.connect();
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
    this.socket.emit('send', email === "placeholder" ? "anonymous" + ": " + this.message : email + ": " + this.message);
  }

}
