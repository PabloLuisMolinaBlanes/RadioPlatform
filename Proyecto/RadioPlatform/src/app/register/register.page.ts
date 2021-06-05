import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
import {FirebaseUpdaterAndSetterService} from '../firebase-updater-and-setter.service';
import {User} from '../user'
import {NavController} from '@ionic/angular'
import {DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public afauth: AngularFireAuth, public sanitizer: DomSanitizer, public firebaseUpdaterAndSetter: FirebaseUpdaterAndSetterService, public firestore: AngularFireStorage, public router: NavController) { }
@Input() email: string;
@Input() password: string;
@Input() callsign: string;
@Input() country: string;
@Input() preferredFrequency: string;
filename: string;
image: File;
imageUrl: SafeResourceUrl;
  ngOnInit() {
  }
  public register() {
      this.afauth.createUserWithEmailAndPassword(this.email, this.password).then(
        res => {
          this.afauth.signInWithEmailAndPassword(this.email, this.password).then(res => {
              let useruid = res.user.uid;
              let thisuser = new User(this.country, this.preferredFrequency, this.email, "online", false, res.user.uid, null,null, this.callsign);
              if (this.image === undefined) {
                this.firebaseUpdaterAndSetter.setUser(thisuser).then(() => {
                  this.router.navigateRoot("/tabs");
                });
              } else {
                this.firebaseUpdaterAndSetter.setUser(thisuser).then(res => {
                  this.firestore.ref(useruid).put(this.image).then(() => {
                    this.router.navigateRoot("/tabs");
                  });
                })
              }
            
          });
        },
        err => {return false}
      );
  }
  onFileSelected(event) {
    const file: File = event.target.files[0];
    
     if (file) {
      this.filename = file.name;
      this.image = file;
      const url = URL.createObjectURL(file);
      console.log(url);
      const urlSan = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.imageUrl = urlSan;
      console.log(urlSan);
    }
  }
}
