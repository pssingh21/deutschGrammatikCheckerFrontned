import { Component, ElementRef } from '@angular/core';
import { ChatServiceService } from './chat-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  message: string;
  messages: any[] = [];
  // imgSrcArr: string[] = ["STart.png", "HowToPlay.png", "3.png", "2.png", "1.png", "GOFinal.png", "StarFieldSimulation.gif"];
  imgSrc : string;
  title = 'hackathon';
  wrongWord : any[];
  checkGrammar: boolean = false;
  lineCorrect: boolean = false;
  wordCorrect: boolean = false;
  temp: string = '';

  constructor(private chatService : ChatServiceService, private elementRef: ElementRef){

  }

  ngOnInit(){
    // for(let i = 1; i <= 3; i++){
    //   this.imgSrc = "./../assets/images/" + i + ".png";
    // }
    this.chatService.getMessages().subscribe((message: any) => {
      if(message.matches.length == 0){
        this.lineCorrect = true;
      }else{
        this.lineCorrect = false;
      }
      message.matches.forEach(returnVal => {
        this.messages.push(returnVal);
        console.log("this.messages", this.messages);
      });

      // this.messages.push(message);
    });

    this.chatService.getWrongWord().subscribe((word: any) => {
      console.log(word);
      this.wrongWord = word;
      if(word.length == 0){
        this.wordCorrect = true;
      }else{
        var looptill = this.wrongWord.length;
        this.temp = this.message;
        for(let i = 0; i < this.wrongWord.length; i++){
          let replace = this.wrongWord[i].word;
          var re = new RegExp(replace,"g");
          this.temp = this.temp.replace(re, `<mark style="color:#ff0000;">` + this.wrongWord[i].word + `</mark>`);
        }
        console.log("fancy", this.message);
        this.wordCorrect = false;
      }
      // word.forEach(returnVal => {
      //   console.log(returnVal);
      //   this.wrongWord = returnVal;
      // });

      // this.messages.push(message);
    });

    // this.chatService.getSuggestions().subscribe((sug: string) => {
    //   this.suggestions.push(sug);
    // });
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = 'url(./assets/images/windows-1.0.jpg)';
    // console.log(this.elementRef.nativeElement.ownerDocument.body.style);
  }

  next(){
    // this.imgSrc = this.imgSrcArr[++this.index];
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = 'url(./assets/images/'+ this.imgSrc +')';
  }

  sendMessage(){
    this.checkGrammar = true;
    this.chatService.sendMessage(this.message);
    this.messages = [];
    this.temp = '';
  }
  

}
