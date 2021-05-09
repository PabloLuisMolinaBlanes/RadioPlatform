import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth'
import {FirebaseUpdaterAndSetterService} from '../firebase-updater-and-setter.service';
import {DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl, ɵDomSanitizerImpl} from "@angular/platform-browser";
import { AngularFireStorage } from '@angular/fire/storage';
import {User} from '../user'

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  @Input() email: string;
  @Input() password: string;
  @Input() status: string;
  @Input() transmitting: string;
  @Input() callsign: string;
  @Input() country: string;
  @Input() preferredFrequency: string;
  image: File;
  filename: string;
  imageUrl: SafeResourceUrl;
  constructor(private afauth: AngularFireAuth, private sanitizer: ɵDomSanitizerImpl, private firebaseUpdaterAndSetter: FirebaseUpdaterAndSetterService, private firestore: AngularFireStorage) { }

  ngOnInit() {
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
            let thisuser = new User(this.country, this.preferredFrequency, res.email, this.status === 'undefined' ? null : this.status, this.transmitting === 'yes' ? true : false, res.uid, null,null,this.callsign);
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
