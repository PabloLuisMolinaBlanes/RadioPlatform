import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../classes/contact';
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth'
import {FirebaseUpdaterAndSetterService} from '../../services/firebase-updater-and-setter.service';
import {DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl, ɵDomSanitizerImpl} from "@angular/platform-browser";
import {ModalController} from '@ionic/angular'
import {Storage} from '@ionic/storage'

@Component({
  selector: 'app-contact-crudpage',
  templateUrl: './contact-crudpage.page.html',
  styleUrls: ['./contact-crudpage.page.scss'],
})
export class ContactCRUDPagePage implements OnInit {
contact: Contact;
@Input() location?: string = null;
@Input() coordinates?: string = null;
@Input() callsign?: string = null;
@Input() frequency: string = null;
@Input() recording?: SafeResourceUrl = null;
@Input() id?: string;
@Input() updated?: string;
filename: string;
audio: File = null;
audioUrl: SafeResourceUrl;
@Input() number?: string;

  constructor(private firebaseUpdaterAndSetter: FirebaseUpdaterAndSetterService, private afauth: AngularFireAuth, private sanitizer: ɵDomSanitizerImpl, private modalController: ModalController, public store: Storage) { }

  ngOnInit() {
    this.firebaseUpdaterAndSetter.testHTML();
    if (this.recording !== null) {
      this.audioUrl = this.recording;
    }
  }
  dismiss() {
    this.modalController.dismiss();
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
        this.audio = renamedFile;
        const url = URL.createObjectURL(renamedFile);
        console.log(url);
        const urlSan = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.audioUrl = urlSan;
        console.log(urlSan);
        console.log(renamedFile);
      }
    });
  });
  }
  submit() {
    if (this.id === undefined) {
      console.log("Warning, id has been detected as undefined!");
        this.id = "placeholder";
        this.contact = new Contact(this.frequency, this.audio, this.location, this.callsign, null, this.id);
        this.contact.number = "placeholder"
        this.firebaseUpdaterAndSetter.setContact(this.contact, this.audio);

    } else {
    this.contact = new Contact(this.frequency, this.audio, this.location, this.callsign, null, this.id, this.updated);
    this.contact.number = this.number;
    this.firebaseUpdaterAndSetter.updateContact(this.contact, this.audio);
    }
  }
}
