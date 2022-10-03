import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: FormControl = new FormControl('');
  msg: string = "";
  finalMessage: string = "";
  constructor() {
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
