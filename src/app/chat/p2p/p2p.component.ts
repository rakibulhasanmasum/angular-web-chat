import { Component, Input, OnInit, SimpleChange, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
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
export class P2pComponent implements OnInit, AfterViewChecked {
  @Input() message: string = "";
  @Input() receiverName: string = "";
  @ViewChild('scrollMe') private myScrollContainer: ElementRef = new ElementRef('');

  
  public messages$: Observable<Message[]>;
  public messagesCollection$: AngularFirestoreCollection<Message>;
  public historyCollection$: AngularFirestoreCollection<History>;

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
    if (changes.message && changes.message.previousValue !== undefined) {
      this.storeMessage(changes.message.currentValue);
    }
  }

  ngOnInit(): void {
    this.messagesCollection$ = this.afs.collection<Message>(`/chat/dt-guest/room/p2p/pet shop bd-${this.receiverName}`, ref => ref.orderBy('date', 'asc'));
    this.messages$ = this.messagesCollection$.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        this.updateSeenStatus();
        const data = a.payload.doc.data() as Message;
        return { ...data };
      }))
    );
    this.historyCollection$ = this.afs.collection<History>('/chat/dt-guest/history');
    this.scrollToBottom();
  }

  storeMessage(text: string) {
    if (!text) return;
    this.messagesCollection$.add({message: text, date: new Date()} as Message);
    this.historyCollection$.doc('merchant').collection('pet shop bd').doc(this.receiverName).set({msg: text, receiverName: this.receiverName, senderName: "pet shop bd", datetime: new Date(), seenStatus: 1} as History, {merge : true});
    this.historyCollection$.doc('client').collection(this.receiverName).doc('pet shop bd').set({msg: text, receiverName: this.receiverName, senderName: "pet shop bd", datetime: new Date(), seenStatus: 1} as History, {merge : true});
  }

  updateSeenStatus() {
    this.historyCollection$.doc('merchant').collection('pet shop bd').doc(this.receiverName).update({"seenStatus": 1});
    this.historyCollection$.doc('client').collection(this.receiverName).doc('pet shop bd').update({"seenStatus": 1});
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  } 

  scrollToBottom(): void {
      try {
        console.log("scrolled");
        
          let el: any = this.myScrollContainer.nativeElement;
          if (el.parentNode && el.parentNode.parentNode && el.parentNode.parentNode)
            el.parentNode.parentNode.parentNode.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) {
        console.log(err)
      }                 
  }
}