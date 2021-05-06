import { Component, OnInit } from '@angular/core';
import  * as rxjs  from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  testResult: string;
  constructor(public afauth: AngularFireAuth) { 

  }

  ngOnInit() {
    this.testResult = "test to be done";
  }
  public login(user: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afauth.signInWithEmailAndPassword(user, password).then(
        res => {return true},
        err => {return false}
      );
    });
  }
  public testLogin(user: string, password: string) {
      this.afauth.signInWithEmailAndPassword("test@example.com", "test123").then(
        res => {
          this.testResult = "success!";
          return true
        },
        err => {
          this.testResult = "failure";
          return false
        }
      );
  }
}
