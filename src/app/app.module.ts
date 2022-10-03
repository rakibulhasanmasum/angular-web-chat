import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { P2pComponent } from './chat/p2p/p2p.component';
// import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
// import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat'

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    P2pComponent
  ],
  imports: [
    BrowserModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
