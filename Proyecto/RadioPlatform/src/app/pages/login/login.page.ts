import { Component, Input, OnInit } from '@angular/core';
import  * as rxjs  from 'rxjs';
import * as firebase from 'firebase/app';
import {NavController} from '@ionic/angular'
import { AlertController } from '@ionic/angular'
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth'
import { AngularFireDatabase } from '../../../../node_modules/@angular/fire/database'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  testResult: string;
  @Input() username: string;
  @Input() password: string;
  constructor(public afauth: AngularFireAuth, public router: NavController, public afDatabase: AngularFireDatabase, public alertCtrl: AlertController) { 

  }

  ngOnInit() {
    this.testResult = "test to be done";
  }
  public login(user: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afauth.signInWithEmailAndPassword(this.username, this.password).then(
        res => {this.router.navigateForward("/tabs")},
        err => {
          if (this.username.indexOf("@") !== -1) {
            let alert = this.alertCtrl.create({
              message: 'Name or password are incorrect',
              buttons: [{
                text: 'Ok',
                role: 'cancel'
              }
              ]
            }).then(a => {
              a.present();
            });
          } else {
            this.afDatabase.database.ref('callsigns/'+this.username).get().then(u => {
              if (u.val() === null) {
                return false;
              } else {
                this.afauth.signInWithEmailAndPassword(u.val() as unknown as string, this.password).then(
                  res => {this.router.navigateForward("/tabs")},
                  err => {let alert = this.alertCtrl.create({
                    message: 'Name or password are incorrect',
                    buttons: [{
                      text: 'Ok',
                      role: 'cancel'
                    }
                    ]
                  }).then(a => {
                    a.present();
                  });}
                )
              }
            }).catch(err => {
              let alert = this.alertCtrl.create({
                message: 'Name or password are incorrect',
                buttons: [{
                  text: 'Ok',
                  role: 'cancel'
                }
                ]
              }).then(a => {
                a.present();
              });
            })}
          }
      );
    });
  }
  register() {
    this.router.navigateForward("/register");
  }
}
