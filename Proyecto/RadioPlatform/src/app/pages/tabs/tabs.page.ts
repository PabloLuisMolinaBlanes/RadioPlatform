import { Component } from '@angular/core';
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth'
import {NavController} from '@ionic/angular'
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
email: string = "placeholder";
  constructor(private afauth: AngularFireAuth, public router: NavController) {}
  ngOnInit() {
    this.afauth.currentUser.then( u => {
      if (u === null) {
        this.router.navigateRoot("/login"); 
      }
    })
    this.afauth.authState.subscribe(u => {
      this.email = u.email;
    })
  }
}
