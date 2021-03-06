import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth'
import { AngularFireDatabase } from '../../../../node_modules/@angular/fire/database'
import {FirebaseUpdaterAndSetterService} from '../../services/firebase-updater-and-setter.service';
import {FirebaseObtainerService} from '../../services/firebase-obtainer.service'
import {DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl, ╔ÁDomSanitizerImpl} from "@angular/platform-browser";
import { AngularFireStorage } from '@angular/fire/storage';
import {User} from '../../classes/user'

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  @Input() email: string;
  @Input() password: string = undefined;
  @Input() status: string = null;
  @Input() transmitting: string = null;
  @Input() callsign: string = null;
  @Input() country: string = null;
  @Input() preferredFrequency: string = null;
  @Input() transmittingFrequency: string = null;
  myself: User;
  image: File;
  filename: string;
  imageUrl: SafeResourceUrl;
  constructor(private afauth: AngularFireAuth, private sanitizer: ╔ÁDomSanitizerImpl, private afDatabase: AngularFireDatabase, private firebaseObtainer: FirebaseObtainerService, private firebaseUpdaterAndSetter: FirebaseUpdaterAndSetterService, private firestore: AngularFireStorage) { }

  ngOnInit() {
    this.afauth.currentUser.then((user) => {
      this.firebaseObtainer.listMyself(user.uid).then((result) => {
        const me = result.val() as unknown as User;
        this.email = me.username;
        this.status = me.status === undefined ? null : me.status;
        this.transmitting = me.transmitting ? "true" : "false";
        this.callsign = me.callsign === undefined ? null : me.callsign;
        this.country = me.country === undefined ? null : me.country;
        this.preferredFrequency = me.preferredFrequency === undefined ? null : me.preferredFrequency;
        this.firestore.ref(user.uid).getDownloadURL().toPromise().then(data => {
          const urlSan = this.sanitizer.bypassSecurityTrustResourceUrl(data);
          this.imageUrl = urlSan;
        }).catch(err => {})
      });
    })
  }
  onFileSelected(event) {
    this.afauth.currentUser.then((user) => {
    const file: File = event.target.files[0];
    file.arrayBuffer().then((result) => {
      const blob: BlobPart = new Blob([new Uint8Array(result, 0, file.size)]);
      const blobParts: BlobPart[] = [];
      console.log(file);
      blobParts.push(blob);
      let renamedFile = new File(blobParts, user.uid, 
        {
          'endings': "native",
          'lastModified': file.lastModified,
          'type': file.type
        });
      console.log(renamedFile.name);
      if (renamedFile) {
        this.filename = renamedFile.name;
        this.image = renamedFile;
        const url = URL.createObjectURL(renamedFile);
        console.log(url);
        const urlSan = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.imageUrl = urlSan;
        console.log(urlSan);
        console.log(renamedFile);
      }
    });
  });
  }
  public setUser() {
        this.afauth.currentUser.then(res => {
            if (this.password !== undefined && this.password !== "") {
              res.updatePassword(this.password);
            }
            let thisuser = new User(this.country, this.preferredFrequency, res.email, this.status === 'undefined' ? null : this.status, this.transmitting === 'yes' ? true : false, res.uid, null,null,this.callsign, this.transmittingFrequency === undefined ? null : this.transmittingFrequency);
            if (this.image === undefined) {
              this.firebaseUpdaterAndSetter.updateUser(thisuser);
            } else {
              this.firebaseUpdaterAndSetter.updateUserAndPhoto(thisuser).then(res => {
                this.firestore.ref('').child(this.image.name).put(this.image).then(() => {
                });
              });
            }
          });
        }
    }
