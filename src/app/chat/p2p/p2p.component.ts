import { Component, Input, OnInit, SimpleChange } from '@angular/core';
// import { Firestore, doc, docData, collection, getDocs, onSnapshot, query, orderBy, collectionData } from '@angular/fire/firestore';
import { map, merge, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

interface Message { id: string; message: string; date: Date; profile: string; type: string; url: string; }
interface History {
  receiverName: string,
  senderName: string,
  msg: string,
  seenStatus: number,
  datetime: Date
}

@Component({
  selector: 'app-p2p',
  templateUrl: './p2p.component.html',
  styleUrls: ['./p2p.component.css']
})
export class P2pComponent implements OnInit {
  @Input() message: string = "";
  
  public readonly messages$: Observable<Message[]>;
  public readonly messagesCollection$: AngularFirestoreCollection<Message>;
  public readonly historyCollection$: AngularFirestoreCollection<History>;

  constructor(private readonly afs: AngularFirestore) {
    this.messagesCollection$ = afs.collection<Message>('/chat/dt-guest/room/p2p/pet shop bd-pet-1123', ref => ref.orderBy('date', 'asc'));
    this.messages$ = this.messagesCollection$.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Message;
        return { ...data };
      }))
    );
    this.historyCollection$ = afs.collection<History>('/chat/dt-guest/history');
  }

  ngOnChanges(changes: any) {
    if (changes.message) {
      this.storeMessage(changes.message.currentValue);
    }
  }

  ngOnInit(): void {
  }

  storeMessage(text: string) {
    if (!text) return;
    this.messagesCollection$.add({message: text, date: new Date()} as Message);
    this.historyCollection$.doc('merchant').collection('pet shop bd').doc('pet-1123').set({msg: text, receiverName: "pet-1124", senderName: "pet shop bd", datetime: new Date(), seenStatus: 1} as History, {merge : true});
    this.historyCollection$.doc('client').collection('pet-1123').doc('pet shop bd').set({msg: text, receiverName: "pet-1124", senderName: "pet shop bd", datetime: new Date(), seenStatus: 1} as History, {merge : true});
  }
}