import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gig',
  templateUrl: './gig.component.html',
  styleUrls: ['./gig.component.css']
})
export class GigComponent implements OnInit {
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status:string;
  buttonName: any='show';
  show:boolean = false;
  tick:boolean = false;
  existUser:string='';
  ngOnDestroy: any;
  constructor(private location: Location) {}
  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {

    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'connected';
      this.connectionStatus = 'online';
      console.log('Online...');
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'No internet connection! ';
      this.connectionStatus = 'offline';

      console.log('Offline...');
    }));
    
  }

}
