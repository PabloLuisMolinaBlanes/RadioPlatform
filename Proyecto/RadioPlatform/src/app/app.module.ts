import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireStorageModule } from "@angular/fire/storage";
import {environment} from '../environments/environment';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {Storage} from '@ionic/storage'
const config: SocketIoConfig = {url: 'http://radioplatforminfrastructure.herokuapp.com/', options: {}};
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { FirebaseUpdaterAndSetterService } from './services/firebase-updater-and-setter.service';
import { FirebaseObtainerService } from './services/firebase-obtainer.service';
import { HttpClientModule } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage-angular'
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, SocketIoModule.forRoot(config), AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule, AngularFireDatabaseModule, AngularFireStorageModule, HttpClientModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, FirebaseUpdaterAndSetterService, FirebaseObtainerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
