import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, fromEvent, Observable, Subscription, catchError } from 'rxjs';

@Component({
  selector: 'app-chatbuddy',
  templateUrl: './chatbuddy.component.html',
  styleUrls: ['./chatbuddy.component.css']
})
export class ChatbuddyComponent implements OnInit {
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status:string;
  buttonName: any;
  show:boolean = false;
  tick:boolean = false;
  existUser:string='';

  constructor() { }

  ngOnInit(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'connected';
 
      this.connectionStatus = 'online';
       
      setTimeout(()=>{
       
        this.connectionStatusMessage = '';
       
        this.connectionStatus = '';
       
     },2000);
     }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'No internet connection! ';
      this.connectionStatus = 'offline';

      console.log('Offline...');
    }));
    
  }

}
