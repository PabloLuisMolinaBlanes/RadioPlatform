import { Component, Input, OnInit } from '@angular/core';
import  * as rxjs  from 'rxjs';
import * as firebase from 'firebase/app';
import {NavController} from '@ionic/angular'
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
import { AngularFireDatabase } from '../../../node_modules/@angular/fire/database'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  testResult: string;
  @Input() username: string;
  @Input() password: string;
  constructor(public afauth: AngularFireAuth, public router: NavController, public afDatabase: AngularFireDatabase) { 

  }

  ngOnInit() {
    this.testResult = "test to be done";
  }
  public login(user: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afauth.signInWithEmailAndPassword(this.username, this.password).then(
        res => {this.router.navigateForward("/tabs")},
        err => {this.afDatabase.database.ref('callsigns/'+this.username).get().then(u => {
          if (u.val() === null) {
            return false;
          } else {
            this.afauth.signInWithEmailAndPassword(u.val() as unknown as string, this.password).then(
              res => {this.router.navigateForward("/tabs")},
              err => {return false;}
            )
          }
        })}
      );
    });
  }
  register() {
    this.router.navigateForward("/register");
  }
  public testLogin(user: string, password: string) {
      this.afauth.signInWithEmailAndPassword("test@example.com", "test123").then(
        res => {
          this.testResult = "success!";
          this.router.navigateForward("/tabs")
          return true
        },
        err => {
          this.testResult = "failure";
          return false
        }
      );
  }
}
