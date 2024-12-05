import { Component, OnInit } from '@angular/core';
import { SavedJobsService as SavedJobsService } from '../../services/jobs';
import {
  BehaviorSubject,
  fromEvent,
  Observable,
  Subscription,
  catchError,
} from 'rxjs';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css']
})
export class SavedJobsComponent implements OnInit {
  jobSeekerDetailsId: any;
  storeSavedJobs: any = [];
  SavedJobsNumber: number=0;
  Savedjob: any[];
  searchSaved:string='';

  show:boolean = false ;
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status:string;
  buttonName: any='show';
  show1:boolean = false;
  tick:boolean = false;

  constructor(private savedJobsService:SavedJobsService) { 
    this.jobSeekerDetailsId = localStorage.getItem("profileID")
    console.log("heeeeee", this.jobSeekerDetailsId)
  }

  ngOnInit(): void {
    this.getAllSavedJobs();
    this. getCountOfSavedJobs();
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


  getCountOfSavedJobs(){
    this.savedJobsService.getSavedJobsCount(this.jobSeekerDetailsId).subscribe((data:any) => {
      this.SavedJobsNumber = data
      console.log('Count of Saved Jobs',this.SavedJobsNumber);
      console.log('Number of Saved Jobs: ',data);
    });
  }


  getAllSavedJobs() {
    this.savedJobsService.getSavedJobs(this.jobSeekerDetailsId).subscribe((data) => {
      this.storeSavedJobs = data;
      console.log(data, "------------------>data get ")
    })
  }


  JobSearch(event: any) {
    this.Savedjob = [...this.storeSavedJobs.filter((user: any) => user.jobTitle.toLowerCase().includes(event.target.value.toLowerCase()))];
    this.storeSavedJobs=this.Savedjob
    console.log("JobSearch Lists",this.Savedjob)
  }

  filterstyle() {
    return {'rotate-180' : this.show };
}

}
