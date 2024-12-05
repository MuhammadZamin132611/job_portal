import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  Observable,
  Subscription,
  catchError,
} from 'rxjs';
import { DashboardJobsService } from '../../services/dashboard-jobs.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status:string;
  profileID:any
  buttonName: any='show';
  show:boolean = false;
  tick:boolean = false;
  notificationlist:any ={
    string: '',
    values: []
  };
  constructor(private dashboardJobsService:DashboardJobsService) { }

  ngOnInit(): void {
    this.profileID = localStorage.getItem("profileID")
    this.getallnotification();
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
//get all notification
  getallnotification() {
    this.dashboardJobsService.GetNotification(this.profileID).subscribe((data: any) => {
      this.notificationlist=data;
      console.log("all notification recieved")
    });
  }
}
