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
  // public readonly messages$: Observable<Message[]>

  constructor(private readonly afs: AngularFirestore) {
    this.allMessage = afs
    // .doc('/chat/dt-guest/history/merchant')
    // .collection('/chat/dt-guest/history', ref => ref.where(afs, '==', this.userName))
    .collection(`/chat/dt-guest/history/merchant/pet shop bd`, ref => ref.orderBy('datetime'))
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as History;
        console.log(data.receiverName, ' is printed')
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
}
