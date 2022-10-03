import { Component, OnInit } from '@angular/core';
// import { Firestore, doc, docData, collection, getDocs, onSnapshot, query, orderBy, collectionData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

interface Message { id: string; message: string; date: Date; profile: string; type: string; url: string; }

@Component({
  selector: 'app-p2p',
  templateUrl: './p2p.component.html',
  styleUrls: ['./p2p.component.css']
})
export class P2pComponent implements OnInit {
  public readonly messages$: Observable<Message[]>;
  public readonly messagesCollection$: AngularFirestoreCollection<Message>;

  constructor(private readonly afs: AngularFirestore) {
    this.messagesCollection$ = afs.collection<Message>('/chat/dt-guest/room/p2p/pet shop bd-pet-1123');
    this.messages$ = this.messagesCollection$.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Message;
        return { ...data };
      }))
    )
  }

  ngOnInit(): void {
  }
  
}