/*
Name: Zamin
Date: 
What: This is the controller ts file to a search job page
Why: This is provided to Jobseeker to search jobs on basic of skill and location
 */

//1. Imports - Angular Framework - Mandatory
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  fromEvent,
  Observable,
  Subscription,
  catchError,
} from 'rxjs';
import { NgSelectComponent } from '@ng-select/ng-select';

//2. Imports - JobCheck Services - Mandatory
import { SearchService } from '../../services/search.service';


//3. Template - Mandatory
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})

//4. Class - Mandatory
//Class to search Jobs. This class represents the component search boxes where jobseeker can search for jobs
export class SearchComponent implements OnInit {
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  buttonName: any = 'show';
  show: boolean = false;
  tick: boolean = false;
  title: string;
  promo: any[] = [];
  jobSeekerDetailsId: any;
  selectedSkill: any;
  selectedLocation: any;
  constructor(private getApi: SearchService, private rout: Router) {
    this.jobSeekerDetailsId = localStorage.getItem("profileID")
    console.log("userId", this.jobSeekerDetailsId)
  }



//This method will call get methods and offline screen
  ngOnInit(): void {
    this.getLocation();
    this.getSearch();
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'connected';

      this.connectionStatus = 'online';

      setTimeout(() => {

        this.connectionStatusMessage = '';

        this.connectionStatus = '';

      }, 2000);
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'No internet connection! ';
      this.connectionStatus = 'offline';

      console.log('Offline...');
    }));

  }


  skill: any
  location: any
  message: string;
  @ViewChild('selectRef') selectRef!: NgSelectComponent;
  @ViewChild('locationRef') locationRef!: NgSelectComponent;

  //This method will search the jobs based on skill and location
  search() {
    this.getApi.getSearchJobs(this.skill, this.location, this.jobSeekerDetailsId).subscribe(res => {
      console.log('data', res)
      this.getApi.storeSearch = res;
      this.getApi.skillSelected = this.skill;
      this.getApi.locationSelected = this.location
      this.rout.navigate(['/dashboard/search-jobs'])
    }, ((error) => {
      this.message = "No jobs found"
    })
    );
 }


 //this method will capture the skill that is selected in ng-select
  onSelectionSkill(event: any) {
    this.skill = event
  }
//this method will capture the location that is selected in ng-select
  onSelectionLocation(event: any) {
    this.location = event 
  }

  //This method will call all the location from master data
  Location1: any = [];
  getLocation() {
    this.getApi.getLocation().subscribe((data) => {
      this.Location1 = data;
    });
  }
  
  //This method will call the api to search jobs
  searchData1: any = [];
  getSearch() {
    this.getApi.getSearchDate().subscribe((data) => {
      this.searchData1 = data;
    });
  }

}
