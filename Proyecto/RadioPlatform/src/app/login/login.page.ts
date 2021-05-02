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

  constructor(public afauth: AngularFireAuth) { 

  }

  ngOnInit() {
  }
  public login(user: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afauth.signInWithEmailAndPassword(user, password).then(
        res => {return true},
        err => {return false}
      );
    });
  }

}
