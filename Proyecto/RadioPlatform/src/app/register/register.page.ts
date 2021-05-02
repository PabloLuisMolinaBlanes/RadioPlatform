import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public afauth: AngularFireAuth) { }

  ngOnInit() {
  }
  public register(user: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afauth.createUserWithEmailAndPassword(user, password).then(
        res => {return true},
        err => {return false}
      );
    });
  }

}
