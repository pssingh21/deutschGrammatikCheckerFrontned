import { Component } from '@angular/core';
import { ChatServiceService } from './chat-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  message: string;
  messages: string[] = [];

  title = 'hackathon';

  constructor(private chatService : ChatServiceService){

  }

  ngOnInit(){
    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  sendMessage(){
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
