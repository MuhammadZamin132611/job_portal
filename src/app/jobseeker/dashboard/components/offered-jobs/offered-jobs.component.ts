import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  Observable,
  Subscription,
  catchError,
} from 'rxjs';
@Component({
  selector: 'app-offered-jobs',
  templateUrl: './offered-jobs.component.html',
  styleUrls: ['./offered-jobs.component.css']
})
export class OfferedJobsComponent implements OnInit {
  showFilters:boolean=false;
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status:string;
  buttonName: any='show';
  show:boolean = false;
  tick:boolean = false;
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

  showFilter(){
    this.showFilters = !this.showFilters;
  }

}
