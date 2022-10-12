import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';

interface History {
  receiverName: string,
  senderName: string,
  msg: string,
  seenStatus: number,
  datetime: Date
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: FormControl = new FormControl('');
  msg: string = "";
  finalMessage: string = "";
  userName: string = "pet shop bd";
  allMessage: any;
  p2pChat: boolean;
  receiverName: string;
  // public readonly messages$: Observable<Message[]>

  constructor(private readonly afs: AngularFirestore) {
    this.p2pChat = false;
    this.receiverName = "";
    this.allMessage = afs
    // .doc('/chat/dt-guest/history/merchant')
    // .collection('/chat/dt-guest/history', ref => ref.where(afs, '==', this.userName))
    .collection(`/chat/dt-guest/history/merchant/pet shop bd`, ref => ref.orderBy('datetime', 'desc'))
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as History;
        return { ...data };
      }))
    )

    this.message.valueChanges.subscribe(obserber => {
      this.msg = obserber;
    })
  }

  ngOnInit(): void {
  }

  sendMessage(event: any) {
    this.finalMessage = this.msg;
    this.message.reset();
  }

  p2p(event: History): void {
    this.p2pChat = true;
    this.receiverName = event.receiverName;
  }

  p2pReset() {
    this.p2pChat = false;
  }
}
