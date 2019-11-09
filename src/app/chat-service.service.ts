import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  private url = 'https://gentle-anchorage-42975.herokuapp.com/';
  private socket;
  
  constructor() {
    this.socket = io(this.url);
  }

  public sendMessage(message){
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      console.log("her3e", observer);
      this.socket.on('new-message', (message) => {
        console.log("here1");
        observer.next(message);
      });
    });
  }

}
