/*
Name: Vaishnavi Pawar
Date: 15-04-23
What: This is the controller ts file to get all Recommended jobs
Why: This is provided to  Jobseeker to view all Recommended Jobs based on jobseeker profile
 */

//1. Imports - Angular Framework - Mandatory
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  BehaviorSubject,
  fromEvent,
  Observable,
  Subscription,
  catchError,
} from 'rxjs';


//2. Imports - JobCheck Services - Mandatory
import { HomeService } from '../../services/home.service';
import { OnboardingLocationService } from 'src/app/jobseeker/onboarding/services/onboarding-location.service';
import { FilterService } from '../../services/filter.service';

//3. Template - Mandatory
@Component({
  selector: 'app-jobs-for-you',
  templateUrl: './jobs-for-you.component.html',
  styleUrls: ['./jobs-for-you.component.css']
})

//4. Class - Mandatory
//Class to Show all jobs for you
export class JobsForYouComponent implements OnInit {

  //5. Properties - Mandatory
  location: string = '';
  id: any;
  jobData: any;
  filterJobData: any;
  Id: any;
  jobId: any
  selectedfilter: any;
  count: number = 0;
  isPopupVisible1: boolean = false;
  fulltime: boolean;
  parttime: boolean;
  experience: boolean=false;
  stroke: string="#252525";
  strokeColor: string="#252525";
  isPopupVisibleJobrole: boolean = false;
  searchJobRoles: any;
  errorMsgOfskills: string;
  jobrolecondition: boolean=false;
  strokeColor1: string="#252525";
  selectedfilter1: any;
  selectedfilter2: any;
  condition: boolean=false;
  selectedshift: any;
  condition1: boolean=false;
  dayshift: boolean;
  nightshift: boolean;
  selected_Workfromhome: any;
  workcondition: boolean=false;
  currentdate: any;

  posteddate: any;
  difference: number;
  days: number;
  isPopupVisible2: boolean=false;
  selectedfreshness: any;
  count1: number=0;
  freshness: boolean=false;
  JobRole1: any;
  strokeColor2: string="#252525";
  count2: number=0;
  jobcitypopup: boolean=false;
  masterLocation: any;
  masterLocationCopy: any;
  selectedlocation: any;
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  buttonName: any = 'show';
  show: boolean = false;
  tick: boolean = false;  count3: number=0;
  jobcitycondition: boolean=false;
  errorMsgOflocation: string;
  strokeColor3: string="#252525";
  salpopup: boolean=false;
  salary:number=0
  salaryrange: any;
  Thousands: boolean=false;
  crore: boolean=false;
  lakhs: boolean=false;
  salaryrangefixed: string;
  salarycondition: boolean;
  stroksalary: string="#252525";
  totalsalary: number;
  salarycount: number=0;
  uncheckjobcity: any=[];
  uncheckjobrole: any=[];
  uncheckjobrole1: any=[];
  all: boolean=false;
  oneDay: boolean=false;
  threedays: boolean=false;
  week: boolean=false;
  fresher: boolean=false;
  twoyears: boolean=false;
  fouryears: boolean=false;
  fiveyears: boolean=false;
  profileID:any;
  jobsFilteredData: any[] = [];


  visible2: any;
  showhideutility2() {
    this.visible3 = this.visible3 ? false : true;
  }
  visible3: any = false;

  parent(event: any) {
    this.visible3 = event;

  }

  constructor(private http: HomeService,private FilterService: FilterService,private getApi: FilterService, private router: Router, private location1: Location,private api: HomeService,private locationService: OnboardingLocationService) { 
    this.jobsFilteredData = this.FilterService.getFilteredData();
    this.filterJobData = this.jobsFilteredData;
    this.getAllJobs();

  }

  goBack(): void {
    this.location1.back();
  }

    //6. This method will call the page for offline status and get recommended jobs
  ngOnInit(): void {
    this.getAreaOfInterest();
    this.getJobRole();
    this.getCity();
    this.getAllJobs();
    this.getindustries();
    this.getEmploymenttype();

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


  //This method will get all the recommended jobs for jobseeker
  storeAreaOfInterest: any = [];
  getAreaOfInterest() {
    this.id = localStorage.getItem("profileID");
    this.http.getAllAreaOfInterest(this.id).subscribe((data: any) => {
      this.storeAreaOfInterest = data;
    });
  }

  //This method will get all the job role for sorting
  JobRole: any ;
  getJobRole() {
    this.api.getJobRole().subscribe((data) => {
      this.JobRole1 = data;
      this.JobRole = this.JobRole1;
      this.searchJobRoles=this.JobRole
    });
  }

   //This method will show all the master data values of Cities
  getCity() {
    this.locationService.getLocation().subscribe(data => {
      this.masterLocation = data;
      this.masterLocationCopy = data;
    })
  }

  //This method will apply search job on basic of job role
  JobRoleSearch(e:any) {
    this.JobRole = [...this.searchJobRoles.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.JobRole.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }

    //This method will search job city in search box
  searchCities(e:any){
    this.masterLocation = [...this.masterLocationCopy.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.masterLocation.length == 0) {
      this.errorMsgOflocation = 'assets/images/amico.svg';
    } else {
      this.errorMsgOflocation = '';
    }
  }

  togglePopupJobCity() {
    this.jobcitypopup = !this.jobcitypopup;
  }

  togglePopup1() {
    this.isPopupVisible2 = !this.isPopupVisible2;
  }

  togglePopup2() {
    this.isPopupVisible1 = !this.isPopupVisible1;
  }
  togglePopupJobrole() {
    this.isPopupVisibleJobrole = !this.isPopupVisibleJobrole;
  }
  salarypopup() {
    this.salpopup = !this.salpopup;
  }

   // This method will select and filter the employement type whether it is part time or Full Time
   selectEmpType(e: any) {
    this.selectedfilter1=e
    this.condition=!this.condition
  if(this.condition==true){
    this.fulltime=false
    this.parttime=false
    switch(this.selectedfilter1){
    case "Full Time":
      this.fulltime=true
      this.filterJobData = this.filterJobData.filter((x: any) => x.empType == this.selectedfilter1)
      console.log("======>", this.filterJobData)
      break;

    case "Part Time":
      this.parttime=true
      this.filterJobData = this.filterJobData.filter((x: any) => x.empType == this.selectedfilter1)
      console.log("======>", this.filterJobData)
      break;
    }
  } 

  if(this.condition==false){
    this.fulltime=false
    this.parttime=false
    console.log("============>")
    this.removefilter()
  }
  }

  //This method will apply filter for working shift of recommended jobs
applyShiftFilter(e:any) {
    this.selectedshift=e
    this.condition1=!this.condition1
  if(this.condition1==true){
    this.dayshift=false
    this.nightshift=false
    switch(this.selectedshift){
    case "DAY":
      this.dayshift=true
      this.filterJobData = this.filterJobData.filter((x: any) => x.shift == this.selectedshift)
      console.log("======>", this.filterJobData)
      break;

    case "NIGHT":
      this.nightshift=true
      this.filterJobData = this.filterJobData.filter((x: any) => x.shift == this.selectedshift)
      console.log("======>", this.filterJobData)
      break;
    }
  } 

  
  if(this.condition1==false){
    this.dayshift=false
    this.nightshift=false
    console.log("============>")
    this.removefilter()
  }

  }
//This method will apply filter on job for you on basic of work type i.e work from home or work from office
applyWorkFromHomeFilter(e:any){
    this.selected_Workfromhome=e
    this.workcondition=!this.workcondition
    if(this.workcondition==true){
        this.filterJobData = this.filterJobData.filter((x: any) => x.workFromHome == this.selected_Workfromhome)
        console.log("======>", this.filterJobData)
    } 

    if(this.workcondition==false){
      console.log("============>")
      this.removefilter()
    }

  }


 // This method will apply filter on Jobs for you for work experience
 applyExperienceFilter(e: any) {
    this.selectedfilter = e
    this.fresher=false
    this.twoyears=false
    this.fouryears=false
    this.fiveyears=false
    this.strokeColor="#252525"
this.count=this.count+1
    if(this.count>1){
      console.log("========>?")
      this.removefilter()
    }
  else{
    switch (this.selectedfilter) {   
      case "1":
        this.fresher=true
        this.experience=true
        this.strokeColor="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min < 1)
        console.log("======>", this.filterJobData)
        break;
      case "2":
        this.twoyears=true
        this.experience=true
        this.strokeColor="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min <= 2 && x.workexperienceDto.min >= 1)
        console.log("======>", this.filterJobData)
        break;
      case "3":
        this.fouryears=true
        this.experience=true
        this.strokeColor="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min <= 4 && x.workexperienceDto.min >= 2)
        console.log("======>", this.filterJobData)

        break;
      case "4":
        this.fiveyears=true
        this.experience=true
        this.strokeColor="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min > 4)
        console.log("======>", this.filterJobData)
        break;
     
    }
  }

  }



    // This method will select and filter the jobs according to freshness (how recently the job is posted) 
    applyFreshnessFilter(e: any) {
    this.selectedfreshness = e
    this.all=false
    this.oneDay=false
    this.threedays=false
    this.week=false
    this.strokeColor2="#252525"
this.count1=this.count1+1
    if(this.count1>1){
      this.removefilter()
    }
  else{
    switch (this.selectedfreshness) {   
      case "1":
        this.all=true
        this.freshness=true
        this.strokeColor2="white"
        this.filterJobData = this.filterJobData
        break;
      case "2":
        this.oneDay=true
        this.freshness=true
        this.strokeColor2="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays<2)
        break;
      case "3":
        this.threedays=true
        this.freshness=true
        this.strokeColor2="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays<4)
        break;
      case "4":
        this.week=true
        this.freshness=true
        this.strokeColor2="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays<8)
        break;
     
    }
  }

  }


  // This method will select and filter the jobs according to Job role 
  selectJobRoles(e: any) {

  this.selectedfilter2 = e
  for(let i=0;i<this.JobRole.length;i++){
    if(this.JobRole[i]==this.selectedfilter2){
      this.uncheckjobrole[i]=true
    }
  }
  this.count2=this.count2+1
    if(this.count2>1){
      console.log("========>?")
      this.removefilter()
    }
  console.log("==========>",this.selectedfilter)
  this.strokeColor1="white"
  this.filterJobData = this.filterJobData.filter((x: any) => x.role == this.selectedfilter2)
  console.log("======>", this.filterJobData)
  this.jobrolecondition=true

 }

 //This method will select the Job city from the master data of all cities
selectJobCity(e:any){
  this.selectedlocation=e
  for(let i=0;i<this.masterLocation.length;i++){
    if(this.selectedlocation==this.masterLocation[i])
    this.uncheckjobcity[i]=true
  }

  this.count3=this.count3+1
  if(this.count3>1){
    console.log("========>?")
    this.removefilter()
  }
console.log("==========>",this.selectedlocation)
this.jobcitycondition=true
this.strokeColor3="white"
console.log("======>", this.filterJobData)
this.filterJobData = this.filterJobData.filter((x: any) =>  x.locations[0]?.city == this.selectedlocation)
console.log("======>", this.filterJobData)

}

//  This method will check the salary range of selected salary in thousand,laks and crors ets.
validateSelectedSalary(e:any){
  this.salaryrange=e
  this.Thousands=false
  this.lakhs=false
  this.crore=false
  console.log("=====>",this.salaryrange)

  switch(this.salaryrange){
    case "Thousands":
      this.Thousands=true
      this.salaryrangefixed="K"
      console.log("thou==>",this.Thousands)
      break;

    case "Lakhs":
      this.lakhs=true
      this.salaryrangefixed="Lk"
      console.log("lakhs==>",this.lakhs)
      break;

     case "Crore":
      this.crore=true
      this.salaryrangefixed="Cr"
      console.log("crore==>",this.crore)
      break;
    }

}



//Method to apply filter on Jobs for you on basis of salary range
applySalaryFilter(){
  this.salarycount=this.salarycount+1
  if(this.salarycount>1){
    if(this.salaryrange==undefined||this.salaryrange==""){
      return
    }
    this.salarycondition=true
      this.stroksalary="white"
   
    this.removefilter()
  } else{

  switch(this.salaryrange){
    case "Thousands":
      this.salarycondition=true
      this.stroksalary="white"
      this.totalsalary=this.salary*1000
      this.filterJobData = this.filterJobData.filter((x: any) => x.salarydto.minAnnualCTC >= 1000 && x.salarydto.minAnnualCTC <= this.totalsalary)
      
      break;

    case "Lakhs":
      this.salarycondition=true
      this.stroksalary="white"
      this.totalsalary=this.salary*100000
      this.filterJobData = this.filterJobData.filter((x: any) => x.salarydto.minAnnualCTC >= 100000 && x.salarydto.minAnnualCTC <= this.totalsalary)
     
      break;

     case "Crore":
      this.salarycondition=true
      this.stroksalary="white"
      this.totalsalary=this.salary*10000000
      this.filterJobData = this.filterJobData.filter((x: any) => x.salarydto.minAnnualCTC >= 10000000 && x.salarydto.minAnnualCTC <= this.totalsalary)
      break;
    }
  }
}




//This method will call api which gives all Jobs 
  jobsForYouCount: number = 0;
  getAllJobs() {
    this.id = localStorage.getItem('profileID');
    this.http.getRecommendedJobs(this.id).subscribe((data: any) => {
      this.jobData = data
      this.currentdate = new Date()
      for(let i=0;i<this.jobData.length;i++){
        this.posteddate=  new Date(this.jobData[i].postedDate)       
        this.difference = Math.floor(this.currentdate - this.posteddate)
        this.days = Math.floor((this.difference / (1000 * 3600 * 24)));
        this.jobData[i].numberOfDays=this.days
      }
      this.jobsForYouCount = this.jobData.length;
      this.filterJobData = this.jobData;
      this.filterJobData = this.jobsFilteredData;
      this.allJobData = this.filterJobData;
      for (var value of this.jobData[1].location[0]) {
        this.location = this.location + value;
      }
    });
  }


 

  // saveJob(value: any) {
  //   this.Id = localStorage.getItem("profileID");
  //   this.jobId = localStorage.getItem("JobId");
  //   this.http.postSaved(this.Id, this.jobId, this.jobData).subscribe((data: any) => {
  //     console.log(data)
  //   })
  // }

  //Method to remove and validate the filters for diffrent sort values
  removefilter(){
    this.filterJobData = this.jobData;
    if(this.experience==true){
      switch (this.selectedfilter) {
        case "1":
          this.fresher=true
          this.experience=true
          this.strokeColor="white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min < 1)
          console.log("======>", this.filterJobData)
          break;
        case "2":
          this.twoyears=true
          this.experience=true
          this.strokeColor="white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min <= 2 && x.workexperienceDto.min >= 1)
          console.log("======>", this.filterJobData)
          break;
        case "3":
          this.fouryears=true
          this.experience=true
          this.strokeColor="white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min <= 4 && x.workexperienceDto.min >= 2)
          console.log("======>", this.filterJobData)
  
          break;
        case "4":
          this.fiveyears=true
          this.experience=true
          this.strokeColor="white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min > 4)
          console.log("======>", this.filterJobData)
          break;
       
      }
    }
 if(this.freshness==true){
    switch (this.selectedfreshness) {   
      case "1":
        this.all=true
        this.freshness=true
        this.strokeColor2="white"
        this.filterJobData = this.filterJobData
        console.log("======>", this.filterJobData)
        break;
      case "2":
        this.oneDay=true
        this.freshness=true
        this.strokeColor2="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays<2)
        console.log("======>", this.filterJobData)
        break;
      case "3":
        this.threedays=true
        this.freshness=true
        this.strokeColor2="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays<4)
        console.log("======>", this.filterJobData)

        break;
      case "4":
        this.week=true
        this.freshness=true
        this.strokeColor2="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays<8)
        console.log("======>", this.filterJobData)
        break;
     
    }
  }
    if(this.condition==true){
      switch(this.selectedfilter1){
        case "Full Time":
          this.fulltime=true
          this.filterJobData = this.filterJobData.filter((x: any) => x.empType == this.selectedfilter1)
          console.log("======>", this.filterJobData)
          break;
    
        case "Part Time":
          this.parttime=true
          this.filterJobData = this.filterJobData.filter((x: any) => x.empType == this.selectedfilter1)
          console.log("======>", this.filterJobData)
          break;
        }
    }

    if(this.condition1==true){
      switch(this.selectedshift){
      case "DAY":
        this.dayshift=true
        this.filterJobData = this.filterJobData.filter((x: any) => x.shift == this.selectedshift)
        console.log("======>", this.filterJobData)
        break;
  
      case "NIGHT":
        this.nightshift=true
        this.filterJobData = this.filterJobData.filter((x: any) => x.shift == this.selectedshift)
        console.log("======>", this.filterJobData)
        break;
      }
    } 

    if(this.workcondition==true){
      this.filterJobData = this.filterJobData.filter((x: any) => x.workFromHome == this.selected_Workfromhome)
      console.log("======>", this.filterJobData)
  } 
  if(this.jobrolecondition==true){

    for(let i=0;i<this.JobRole.length;i++){
      if(this.JobRole[i]==this.selectedfilter2){
        this.uncheckjobrole[i]=true
      }
    }

    this.strokeColor1="white"
    this.filterJobData = this.filterJobData.filter((x: any) => x.role == this.selectedfilter2)
    console.log("======>", this.filterJobData)
  }
  if(this.jobcitycondition==true){

    for(let i=0;i<this.masterLocation.length;i++){
      if(this.selectedlocation==this.masterLocation[i])
      this.uncheckjobcity[i]=true
    }

    this.strokeColor3="white"
    this.filterJobData = this.filterJobData.filter((x: any) =>  x.locations[0]?.city == this.selectedlocation)
    console.log("======>", this.filterJobData)
  }

  if(this.salarycondition==true){
    
    console.log("===salaryrange==>",this.salaryrange)
        switch(this.salaryrange){
          case "Thousands":
            this.stroksalary="white"
            this.totalsalary=this.salary*1000
            this.filterJobData = this.filterJobData.filter((x: any) => x.salarydto.minAnnualCTC >= 1000 && x.salarydto.minAnnualCTC <= this.totalsalary)
            console.log("=====>====>",this.filterJobData)
          
            break;
      
          case "Lakhs":
            this.stroksalary="white"
            this.totalsalary=this.salary*100000
            this.filterJobData = this.filterJobData.filter((x: any) => x.salarydto.minAnnualCTC >= 100000 && x.salarydto.minAnnualCTC <= this.totalsalary)
            console.log("=====>====>",this.filterJobData)
          
            break;
    
           case "Crore":
            this.stroksalary="white"
            this.totalsalary=this.salary*10000000
            this.filterJobData = this.filterJobData.filter((x: any) => x.salarydto.minAnnualCTC >= 10000000 && x.salarydto.minAnnualCTC <= this.totalsalary)
            console.log("=====>====>",this.filterJobData)
    
       
            break;
          }
        
      }


  }

    //Method to clear the previously selected data for sorting the jobs on basis of Salary
  salarypopupremovie(){
    this.Thousands=false
    this.lakhs=false
    this.crore=false
    this.salarycondition=false
    this.stroksalary="#252525"
    this.salaryrange=""
    this.salarycount=0
    this.salaryrangefixed=""
    this.salary=0
    this.removefilter()
  }

   //Method to clear the previously selected data for sorting the jobs on basis of City
  removiejobcityfilter(){
    this.uncheckjobcity.length=this.masterLocation.length
    for(let i=0;i<this.masterLocation.length;i++){
      if(this.selectedlocation==this.masterLocation[i])
      this.uncheckjobcity[i]=false
    }
    this.selectedlocation=""
    this.count3=0
    this.jobcitycondition=false
    this.strokeColor3="#252525"
    this.removefilter()
  }


  //Method to clear the previously selected data for sorting the jobs on basis of Job Roles
  removejobfilter(){
    this.uncheckjobrole.length=this.JobRole.length
   
    for(let i=0;i<this.JobRole.length;i++){
      if(this.JobRole[i]==this.selectedfilter2){
        this.uncheckjobrole[i]=false
      }
    }
    this.jobrolecondition=false
    this.strokeColor1="#252525"
    this.selectedfilter2 = ""
    this.count2=0
    this.removefilter()
    this.togglePopupJobrole()

  }

    //Method to clear the previously selected data for sorting the jobs on basis of Freshness
  removiefreshnessfilter(){
    this.all=false
    this.oneDay=false
    this.threedays=false
    this.week=false
    this.strokeColor2="#252525"
    this.count1=0
    this.freshness=false
    this.selectedfreshness = ""
    this.removefilter()
  }

    //Method to clear the previously selected data for sorting the jobs on basis of Work Experience
  removeexperiencefilter(){
    this.selectedfilter=""
    this.fresher=false
    this.twoyears=false
    this.fouryears=false
    this.fiveyears=false
    this.experience=false
    this.strokeColor="#252525"
    this.count=0
    this.removefilter()

  }




//This toggle method will show and hide master filter   
  masterfilter:boolean=false;
  masterFilterPopup(){
      this.masterfilter = !this.masterfilter
  }


//This toggle method will show and hide popup values
  activeElement: number = 1;
  activeButton: number = 1;

  toggleVisibility(element: number) {
    this.activeElement = element;
    this.activeButton = element
  }

//These are the field are required for sort function
  experienceLevel = [
    "Fresher",
    "1 - 2 Years",
    "2 - 4 Years",
    "More Then 5 Years"
  ]
  freshness1 = [
    "All",
    "Last 24 Hours",
    "Last 3 days",
    "Last 7 days"
  ]
  fluency = [
    "Advance",
    "Intermediate",
    "Basic",
    "No English"
  ]
  jobType = [
    "Any",
    "Permanent",
    "Temporary",
    "Internship"
  ]
  shiftType = [
   
    { name: 'Any', value: 'DAY',checked: false },
    { name: 'Day shift', value: 'DAY', checked: false },
    { name: 'Night shift', value: 'NIGHT', checked: false },
  ]
   
  //This method will get Industry type
  industryType: any = [];
  searchIndustry:any;
  getindustries() {
    this.getApi.getIndustryMasterData().subscribe((data: any) => {
      this.industryType = data; 
      this.searchIndustry = this.industryType
    });
  }

//This method will capture indsustry selected and filter them
  industrySearch(e:any) {
    console.log("======>",e.value)
    this.industryType = [...this.searchIndustry.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.industryType.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }


//This method will apply search job on basic of job role
  JobRoleSearch1(e:any) {
    console.log("======>",e.value)
    this.JobRole1 = [...this.searchJobRoles.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.JobRole.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }
  


  //This method will get employment type
  employmentType :any=[];
  getEmploymenttype(){
    this.getApi.getEmploymentType().subscribe((data:any) => {
      this.employmentType =data;

    })

  }

   //Given some example department value for now (Need to remove)
  department: any = [
    "Human Resources",
    "Finance",
    'Sales',
    "Marketing",
    "Customer Service",
    "Information Technology",
    "Operations",
    "Research and Development",
    "Supply Chain",
    "Legal",
    "Accounting",
    "Administration",
    "Product Development",
    "Public Relations",
    "Quality Control",
    "Logistics",
    "Procurement",
    "Risk Management",
    "Training and Development",
    "Project Management"
  ];

    //This method will serach  accoring to department 
  searchDepartment:any;
  departmentSearch(e:any) {
    this.searchDepartment = this.department
    console.log("======>",e.value)
    this.department = [...this.searchDepartment.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.department.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }


//This method will apply filter accoring to Experience 
  ExperienceFilter:any;
  Fresher:any;
  fiveYears:any;
  twoYears:any;
  fourYears:any;
  expCount:number=0;

  experienceFilter(e: any) {
    this.ExperienceFilter = e
    this.Fresher=false
    this.twoYears=false
    this.fourYears=false
    this.fiveYears=false

    this.expCount=this.expCount+1

    if(this.expCount>1){
      console.log("========>?")
      this.removeMasterfilter()
    }
  else{
    switch (this.ExperienceFilter) {   
      case "1":
        this.Fresher=true
        this.experience=true
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min < 1)
        console.log("======>", this.filterJobData)
        break;
      case "2":
        this.twoYears=true
        this.experience=true
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min <= 2 && x.workexperienceDto.min >= 1)
        console.log("======>", this.filterJobData)
        break;
      case "3":
        this.fourYears=true
        this.experience=true
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min <= 4 && x.workexperienceDto.min >= 2)
        console.log("======>", this.filterJobData)

        break;
      case "4":
        this.fiveYears=true
        this.experience=true
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min > 4)
        console.log("======>", this.filterJobData)
        break;
     
    }
  }

  }

  //This method will apply filter accoring to Job Role 
  seclectedJobRole:any;
  jobrolecount:number=0;

  jobRoleFilter(e: any) {
    this.seclectedJobRole = e
    for(let i=0;i<this.JobRole1.length;i++){
      if(this.JobRole1[i]==this.seclectedJobRole){
        this.uncheckjobrole1[i]=true
      }
    }
    this.jobrolecount=this.jobrolecount+1
    if(this.jobrolecount>1){
      console.log("========>?")
      this.removeMasterfilter()
    }
    console.log("==========>",this.selectedfilter)
    this.filterJobData = this.filterJobData.filter((x: any) => x.role == this.seclectedJobRole)
    console.log("======>", this.filterJobData)
    this.jobrolecondition=true
  
   }



   // Assume you have a copy of the original data in 'allJobData'
// Make sure to set this variable when you first load or fetch the data.
allJobData: any[] = []; // Replace 'any[]' with the appropriate type of your data.

// Function to clear both filters
clearFilters() {
  this.ExperienceFilter = null;
  this.Fresher = false;
  this.twoYears = false;
  this.fourYears = false;
  this.fiveYears = false;
  this.expCount = 0;

  
  this.uncheckjobrole.length=this.JobRole1.length
   
  for(let i=0;i<this.JobRole1.length;i++){
    if(this.JobRole1[i]==this.seclectedJobRole){
      this.uncheckjobrole1[i]=false
    }
  }
  this.jobrolecondition=false
  this.seclectedJobRole = ""
  this.jobrolecount=0

  // Reset other filter-related variables as needed

  // Restore the original data by copying it back to the filterJobData array
  this.filterJobData = [...this.allJobData];
}

// Call this 'clearFilters' function when you click the clear button.
// For example, you can have a button in your UI with (click) event like this:
// <button (click)="clearFilters()">Clear Filters</button>


//This method will apply filter accoring to location
   seclectedJobCity:any;
   jobcitycount:number=0;
 
   jobCityFilter(e: any) {
     this.seclectedJobCity = e
     for(let i=0;i<this.masterLocation.length;i++){
       if(this.masterLocation[i]==this.seclectedJobCity){
         this.uncheckjobcity[i]=true
       }
     }
     this.jobcitycount=this.jobcitycount+1
     if(this.jobcitycount>1){
       console.log("========>?")
       this.removeMasterfilter()
     }
     console.log("==========>",this.selectedfilter)
     this.filterJobData = this.filterJobData.filter((x: any) => x.locations[0]?.city.slice(0, 1) == this.seclectedJobCity.slice(0, 1))
     console.log("======>", this.filterJobData)
     this.jobcitycondition=true
   
    }


//This method will apply filter accoring to English Fluency 
   seclectedFluency:any;
   jobenglishFluency:number=0;
   jobfluencycondition: boolean=false; 
   uncheckjobfluency: any=[];

   jobEnglishFluency(e: any) {
     this.seclectedFluency = e
     for(let i=0;i<this.fluency.length;i++){
       if(this.fluency[i]==this.seclectedFluency){
         this.uncheckjobfluency[i]=true
       }
     }
     this.jobenglishFluency=this.jobenglishFluency+1
     if(this.jobenglishFluency>1){
       this.removeMasterfilter()
     }
     console.log("==========>",this.selectedfilter)
     this.filterJobData = this.filterJobData.filter((x: any) => x.englishFluency == this.seclectedFluency)
   
    //  if (this.seclectedFluency == "no English") {
    //   this.filterJobData = this.filterJobData.filter((x: any) => x.englishFluency == null);
    // } else {
    //   this.filterJobData = this.filterJobData.filter((x: any) => x.englishFluency == this.seclectedFluency);
    // }
    this.jobfluencycondition=true

    }
 


//This method will apply filter accoring to Industry 
    seclectedIndustry:any;
    industrycount:number=0;
    industrycondition: boolean=false; 
    uncheckindustry: any=[];
  
    industryFilter(e: any) {
      this.seclectedIndustry = e
      for(let i=0;i<this.industryType.length;i++){
        if(this.industryType[i]==this.seclectedIndustry){
          this.uncheckindustry[i]=true
        }
      }
      this.industrycount=this.industrycount+1
      if(this.industrycount>1){
        this.removeMasterfilter()
      }
      this.filterJobData = this.filterJobData.filter((x: any) => x.industry == this.seclectedIndustry)
      this.industrycondition=true
    
     }
 

//This method will apply filter accoring to employement type 
     seclectedEmpType:any;
     empTypecount:number=0;
     emplTpyecondition: boolean=false; 
     uncheckEmpType: any=[];
   
     empTpyeFilter(e: any) {
       this.seclectedEmpType = e
       for(let i=0;i<this.employmentType.length;i++){
         if(this.employmentType[i]==this.seclectedEmpType){
           this.uncheckEmpType[i]=true
         }
       }
       this.empTypecount=this.empTypecount+1
       if(this.empTypecount>1){
         this.removeMasterfilter()
       }
       this.filterJobData = this.filterJobData.filter((x: any) => x.empType == this.seclectedEmpType)
       this.emplTpyecondition=true
     
      }
  

//This method will apply filter accoring to shift 
      seclectedShiftType:any;
      shiftcount:number=0;
      shiftcondition: boolean=false; 
      uncheckshift: any=[];
    
      shiftTypeFilter(e: any) {
        this.seclectedShiftType = e
        for(let i=0;i<this.shiftType.length;i++){
          if(this.shiftType[i]==this.seclectedShiftType){
            this.uncheckshift[i]=true
          }
        }
        this.shiftcount=this.shiftcount+1
        if(this.shiftcount>1){
          console.log("========>?")
          this.removeMasterfilter()
        }
        // console.log("==========>",this.selectedfilter)
        
          this.filterJobData = this.filterJobData.filter((x: any) => x.shift == this.seclectedShiftType)
          console.log("======>", this.filterJobData)
          this.shiftcondition=true
      
       }
  
       


//This method will remove Filter that are applied 
   removeMasterfilter(){
    this.filterJobData=this.jobData
    if(this.experience==true){
      switch (this.ExperienceFilter) {   
        case "1":
          this.Fresher=true
          this.experience=true
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min < 1)
          console.log("======>", this.filterJobData)
          break;
        case "2":
          this.twoYears=true
          this.experience=true
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min <= 2 && x.workexperienceDto.min >= 1)
          console.log("======>", this.filterJobData)
          break;
        case "3":
          this.fourYears=true
          this.experience=true
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min <= 4 && x.workexperienceDto.min >= 2)
          console.log("======>", this.filterJobData)
  
          break;
        case "4":
          this.fiveYears=true
          this.experience=true
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min > 4)
          console.log("======>", this.filterJobData)
          break;
       
      }
    }

    if(this.jobrolecondition==true){
      for(let i=0;i<this.JobRole1.length;i++){
        if(this.JobRole1[i]==this.seclectedJobRole){
          this.uncheckjobrole1[i]=true
        }
      }
      this.filterJobData = this.filterJobData.filter((x: any) => x.role == this.seclectedJobRole)
      console.log("======>", this.filterJobData)
    }


    if(this.jobcitycondition==true){
      for(let i=0;i<this.masterLocation.length;i++){
        if(this.masterLocation[i]==this.seclectedJobCity){
          this.uncheckjobcity[i]=true
        }
      }
      this.filterJobData = this.filterJobData.filter((x: any) =>  x.locations[0]?.city  == this.seclectedJobCity)
      console.log("======>", this.filterJobData)
    }


    if(this.jobfluencycondition==true){
      for(let i=0;i<this.fluency.length;i++){
        if(this.fluency[i]==this.seclectedFluency){
          this.uncheckjobfluency[i]=true
        }
      }
      this.filterJobData = this.filterJobData.filter((x: any) =>  x.englishFluency  == this.seclectedFluency)
      console.log("======>", this.filterJobData)
    }


    if(this.industrycondition==true){
      for(let i=0;i<this.industryType.length;i++){
        if(this.industryType[i]==this.seclectedIndustry){
          this.uncheckindustry[i]=true
        }
      }
      this.filterJobData = this.filterJobData.filter((x: any) =>  x.industry  == this.seclectedIndustry)
      console.log("======>", this.filterJobData)
    }



    if(this.emplTpyecondition==true){
      for(let i=0;i<this.employmentType.length;i++){
        if(this.employmentType[i]==this.seclectedEmpType){
          this.uncheckEmpType[i]=true
        }
      }
      this.filterJobData = this.filterJobData.filter((x: any) =>  x.empType == this.seclectedEmpType)
      console.log("======>", this.filterJobData)
    }


    if(this.shiftcondition==true){
      for(let i=0;i<this.shiftType.length;i++){
        if(this.shiftType[i]==this.seclectedShiftType){
          this.uncheckshift[i]=true
        }
      }
      this.filterJobData = this.filterJobData.filter((x: any) =>  x.shift == this.seclectedShiftType)
      console.log("======>", this.filterJobData)
    }

  }

  //This method will show the save job popup
  isPopupVisible = false;
  pop: boolean = true;
  message11 = ''
  messsage12 = ''
  Jobid: number;
  Check: any;
  control: any;
  rot: any
  openPopup(Jobid: any, saved: any) {
    this.Jobid = Jobid;
    this.Check = saved;
    this.checkSave(saved)
    this.isPopupVisible = true;
  }

    //This method will check if job is saved or not and based on that it will update message to show to user
  checkSave = (con: any) => {
    if (con) {
      this.message11 = 'Unsaved'
      this.messsage12 = 'Do you want to unsave the job'
      console.log("DO you want to unsave the job")
    } else {
      console.log("Do you want to save the job")
      this.message11 = 'Saved'
      this.messsage12 = 'Do you want to Save the job'
    }
  }
 //This method will close the save job popup
  closePopup() {
    this.isPopupVisible = false;
  }
  cardOpen = false;

   //method will change the heart to red color when job is saved
  redHeart = () => {
    this.profileID=localStorage.getItem("profileID");
    if (this.Check) {
      this.api.unsaved(this.profileID, this.Jobid).subscribe({
        next: (res: any) => {
          console.log(res)
          this.getAllJobs();
          //this.getPromotedJob()
        }, error: (error) => {
          console.log(error.error, "Job not Unsaved sucessfully ! Please retry")
        }
      })
    } else {
      this.api.postSaved(this.profileID, this.Jobid, this.Check).subscribe({
        next: (res: any) => {
          console.log(res)
          this.getAllJobs();
         // this.getPromotedJob()
        }, error: (error) => {
          console.log(error.error, "Job not saved sucessfully ! Please retry")
        }
      })
    }
  }
  changeButtonColor(index: any, id: any) {
    this.control = index;
    this.rot = id;
    this.cardOpen = true;
    console.log(this.cardOpen)
  }

  closePopup1() {
    this.cardOpen = false;
    console.log(this.cardOpen, "false")
  }

}
