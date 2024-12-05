/*
Name: Zamin
Date: 23-03-23
What: This is the controller ts file to get search job 
Why: This is provided to Jobseeker to search jobs on basic of skill and location
 */

//1. Imports - Angular Framework - Mandatory
import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  Observable,
  Subscription,
  catchError,
} from 'rxjs';

//2. Imports - JobCheck Services - Mandatory
import { FilterService } from '../../services/filter.service';
import { SearchService } from '../../services/search.service';
import { HomeService } from '../../services/home.service';
import { OnboardingLocationService } from 'src/app/jobseeker/onboarding/services/onboarding-location.service';

//3. Template - Mandatory
@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.css']
})

//4. Class - Mandatory
//Class to Show Searched Jobs. This class shows the jobs that are searched

export class SearchJobsComponent implements OnInit {

  //5. Properties - Mandatory
  isPopupVisible: boolean;
  jobData: any = [];
  profileId: string | null;
  color:boolean
  isPopupVisible1: boolean=false;
  filterSearchData: any;
  isPopupVisible2: boolean=false;
  isPopupVisibleJobRole: boolean=false;
  uncheckJobCity: any=[];
  uncheckJobRole: any=[];
  
  constructor(private getApi: SearchService,private api:HomeService,private FilterService: FilterService,private locationService: OnboardingLocationService) { }
  
  getSearchData: any;
  getSearchCount:any;
  selectedFilter: any;
  strokeColor: string="#252525";
  count: number=0;
  experience: boolean;
  currentDate: any;
  postedDate: any;
  difference: number;
  days: number;
  selectedFreshness: any;
  strokeColor2: string="#252525";
  count1: number=0;
  freshness: boolean=false;
  JobRole: any[];
  searchJobRoles: any;
  errorMsgOfskills: string;
  JobRole1: any;
  selectedFilter2: any;
  strokeColor1: string="#252525";
  jobRoleCondition: boolean=false;
  count2: number=0;
  selectedFilter1: any;
  condition: boolean=false;
  fulltime: boolean=false;
  partTime: boolean=false;
  selectedWorkFromHome: any;
  workCondition: boolean=false;
  selectedShift: any;
  condition1: boolean;
  dayShift: boolean;
  nightShift: boolean;
  masterLocation: any;
  masterLocationCopy: any;
  jobCityPopup: boolean=false;
  selectedLocation: any;
  jobCityCondition: boolean=false;
  count3: number=0;
  errorMsgOfLocation: string;
  strokeColor3: string="#252525";
  salPopup: boolean=false;
  salary:number=0
  salaryRange: any;
  Thousands: boolean=false;
  crore: boolean=false;
  lakhs: boolean=false;
  salaryRangeFixed: string;
  salaryCondition: boolean;
  strokeSalary: string="#252525";
  totalSalary: number;
  salaryCount: number=0;
  all: boolean=false;
  oneDay: boolean=false;
  threeDays: boolean=false;
  week: boolean=false;
  fresher: boolean=false;
  twoyears: boolean=false;
  fouryears: boolean=false;
  fiveyears: boolean=false;
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  buttonName: any = 'show';
  show: boolean = false;
  tick: boolean = false;
  

  //6. This method will call the page for offline status and get searched jobs
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

    this.getJobRole();
    this.getCity()
    this.profileId = localStorage.getItem('profileID');
    this.getSearchData = this.getApi.storeSearch;

    this.currentDate = new Date()
    for(let i=0;i<this.getSearchData.length;i++){
      this.postedDate=  new Date(this.getSearchData[i].postedDate)       
      this.difference = Math.floor(this.currentDate - this.postedDate)
      this.days = Math.floor((this.difference / (1000 * 3600 * 24)));
      this.getSearchData[i].numberOfDays=this.days
    }
  
    this.filterSearchData=this.getSearchData
    this.sk=this.getApi.skillSelected
    this.loc = this.getApi.locationSelected
    if(this.loc === undefined){
      this.slash = ''
    }else{
      this.slash = '/'
    }
    this.getCityName();

  }
  slash:any
  sk:any;
  loc:any;
  location: string;
  location1: string = '';
  nodata = false;

///This method will get the city name
  getCityName() {
    if(this.getSearchCount >= 0){
      this.nodata=true
    }else{
      this.nodata=false
    }
    for (var value of this.getSearchData[1].locations[0].city) {
      this.location1 = this.location1 + value;
    }
  }

   ///This method will check if job is saved or not and based on that it will update message to show to user
  set: number;
  short: any;
  message1=''
  openPopup(id: any, code: any) {
    this.set = id;
    this.short = code;
    this.isPopupVisible = true;
    if(this.short){
      this.message = 'Are you want to unsave the Jobs'
      this.message1 = "Unsaved"
    }else{
      this.message = 'Are you want to save the Jobs'
      this.message1 = "Saved"
    }
  }

  //This method will close the save job popup
  closePopup() {
    this.isPopupVisible = false;
  }

  //method will change the heart to red color when job is saved
  colorHeart = false
  message = ''
  redHeart = () => {
   const jobid  = this.set
   const check  = this.short
    if(check){
      this.api.unsaved(this.profileId , jobid ).subscribe((res)=>{
this.search()
      })
    }else{
      this.api.postSaved(this.profileId , jobid , check).subscribe((res)=>{
        // this.getSearchData.saved = true
        this.search() 
      })
    }
  }
  whiteHeart = () => {
    this.colorHeart = false
  }
  date: any = "";
  colorHeart1: boolean[] = new Array(this.jobData.length).fill(false);


  //This method will get the searched jobs
  search() {
    this.getApi.getSearchJobs(this.sk, this.loc, this.profileId).subscribe(res => {
      this.getSearchData = res
      this.filterSearchData=this.getSearchData
      for (var value of this.jobData[1].locations[0].city) {
        this.location = this.location + value;
      }
    });
  }


  //This method will get Job Role from master data popup
  getJobRole() {
    this.api.getJobRole().subscribe((data) => {
      this.JobRole1 = data;
      this.JobRole = this.JobRole1;
      this.searchJobRoles=this.JobRole
    });
  }

  //This method will search Job Role from master data popup
  JobRoleSearch(e:any) {
    this.JobRole = [...this.searchJobRoles.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.JobRole.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }

   //This method will search location from master data popup
  searchCities(e:any){
    this.masterLocation = [...this.masterLocationCopy.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.masterLocation.length == 0) {
      this.errorMsgOfLocation = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfLocation = '';
    }
  }

    //This method will show all the master data values of Cities
  getCity() {
    this.locationService.getLocation().subscribe(data => {
      this.masterLocation = data;
      this.masterLocationCopy = data;
    })
  }

  
  togglePopup2(){
    this.isPopupVisible1 = !this.isPopupVisible1;
  }

  togglePopup1() {
    this.isPopupVisible2 = !this.isPopupVisible2;
  }
  togglePopupJobRole() {
    this.isPopupVisibleJobRole = !this.isPopupVisibleJobRole;
  }

  togglePopupJobCity() {
    this.jobCityPopup = !this.jobCityPopup;
  }
// This method will apply filter on Jobs for you for work experience
applyExperienceFilter(e: any) {
    this.selectedFilter = e
    this.fresher=false
    this.twoyears=false
    this.fouryears=false
    this.fiveyears=false
    this.strokeColor="#252525"
    this.count=this.count+1
    if(this.count>1){
      this.removefilter()
    }
  
    switch (this.selectedFilter) {   
      case "1":
        this.fresher=true
        this.experience=true
        this.strokeColor="white"
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min < 1)
        break;
      case "2":
        this.twoyears=true
        this.experience=true
        this.strokeColor="white"
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min <= 2 && x.workexperienceDto.min >= 1)
        break;
      case "3":
        this.fouryears=true
        this.experience=true
        this.strokeColor="white"
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min <= 4 && x.workexperienceDto.min >= 2)
        break;
      case "4":
        this.fiveyears=true
        this.experience=true
        this.strokeColor="white"
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min > 4)
        break;
     
    }


  }
  // This method will select and filter the jobs according to freshness (how recently the job is posted) 
  applyFreshnessFilter(e: any) {
    this.selectedFreshness = e
    this.all=false
    this.oneDay=false
    this.threeDays=false
    this.week=false
    this.strokeColor2="#252525"
this.count1=this.count1+1
    if(this.count1>1){
      this.removefilter()
    }
  else{
    switch (this.selectedFreshness) {   
      case "1":
        this.all=true
        this.freshness=true
        this.strokeColor2="white"
        this.filterSearchData=this.filterSearchData
        break;
      case "2":
        this.oneDay=true
        this.freshness=true
        this.strokeColor2="white"
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.numberOfDays<2)
        break;
      case "3":
        this.threeDays=true
        this.freshness=true
        this.strokeColor2="white"
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.numberOfDays<4)
        break;
      case "4":
        this.week=true
        this.freshness=true
        this.strokeColor2="white"
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.numberOfDays<8)
        break;
     
    }
  }

  }
 // This method will select and filter the jobs according to Job role 
 selectJobRoles(e: any) {
    this.selectedFilter2 = e
    for(let i=0;i<this.JobRole.length;i++){
      if(this.JobRole[i]==this.selectedFilter2){
        this.uncheckJobRole[i]=true
      }
    }
    this.count2=this.count2+1
    if(this.count2>1){
      this.removefilter()
    }
    this.strokeColor1="white"
    this.filterSearchData = this.filterSearchData.filter((x: any) => x.role == this.selectedFilter2)
    this.jobRoleCondition=true
  
   }

 // This method will select and filter the employement type whether it is part time or Full Time
 selectEmpType(e: any) {
    this.selectedFilter1=e
    this.condition=!this.condition
  if(this.condition==true){
    this.fulltime=false
    this.partTime=false
    switch(this.selectedFilter1){
    case "Full Time":
      this.fulltime=true
      this.filterSearchData = this.filterSearchData.filter((x: any) => x.empType == this.selectedFilter1)
      break;
    case "Part Time":
      this.partTime=true
      this.filterSearchData = this.filterSearchData.filter((x: any) => x.empType == this.selectedFilter1)
      break;
    }
  } 

  if(this.condition==false){
    this.fulltime=false
    this.partTime=false
    this.removefilter()
  }
  }

//This method will apply filter on job for you on basic of work type i.e work from home or work from office
applyWorkFromHomeFilter(e:any){
    this.selectedWorkFromHome=e
    this.workCondition=!this.workCondition
    if(this.workCondition==true){
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.workFromHome == this.selectedWorkFromHome)
    } 

    if(this.workCondition==false){
      this.removefilter()
    }

  }

//This method will apply filter for working shift of recemmonded jobs
applyShiftFilter(e:any) {
    this.selectedShift=e
    this.condition1=!this.condition1
  if(this.condition1==true){
    this.dayShift=false
    this.nightShift=false
    switch(this.selectedShift){
    case "DAY":
      this.dayShift=true
      this.filterSearchData = this.filterSearchData.filter((x: any) => x.shift == this.selectedShift)
      break;

    case "NIGHT":
      this.nightShift=true
      this.filterSearchData = this.filterSearchData.filter((x: any) => x.shift == this.selectedShift)
      break;
    }
  } 

  
  if(this.condition1==false){
    this.dayShift=false
    this.nightShift=false
    this.removefilter()
  }

  }

  //This method will show salary popup
  salaryPopup() {
    this.salPopup = !this.salPopup;
  }

  //This method will select the Job city from the master data of all cities
  selectJobCity(e:any){
    this.selectedLocation=e
    for(let i=0;i<this.masterLocation.length;i++){
      if(this.selectedLocation==this.masterLocation[i])
      this.uncheckJobCity[i]=true
    }
    this.count3=this.count3+1
    if(this.count3>1){
      this.removefilter()
    }else{
  this.jobCityCondition=true
  this.strokeColor3="white"
  this.filterSearchData = this.filterSearchData.filter((x: any) =>  x.locations[0]?.city == this.selectedLocation)
  }
  }
//  This method will check the salary range of selected salary in thousand,laks and crors ets.
validateSelectedSalary(e:any){
    this.salaryRange=e
    this.Thousands=false
    this.lakhs=false
    this.crore=false

    switch(this.salaryRange){
      case "Thousands":
        this.Thousands=true
        this.salaryRangeFixed="K"
        break;
  
      case "Lakhs":
        this.lakhs=true
        this.salaryRangeFixed="Lk"
        break;

       case "Crore":
        this.crore=true
        this.salaryRangeFixed="Cr"
        break;
      }

  }

  
//Method to apply filter on Jobs for you on basis of salary range
applySalaryFilter(){
    this.salaryCount=this.salaryCount+1
    if(this.salaryCount>1){
      if(this.salaryRange==undefined||this.salaryRange==""){
        return
      }
      this.salaryCondition=true
        this.strokeSalary="white"
      this.removefilter()
    } else{

    switch(this.salaryRange){
      case "Thousands":
        this.salaryCondition=true
        this.strokeSalary="white"
        this.totalSalary=this.salary*1000
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.salarydto.minAnnualCTC >= 1000 && x.salarydto.minAnnualCTC <= this.totalSalary)
        break;
  
      case "Lakhs":
        this.salaryCondition=true
        this.strokeSalary="white"
        this.totalSalary=this.salary*100000
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.salarydto.minAnnualCTC >= 100000 && x.salarydto.minAnnualCTC <= this.totalSalary)
        break;

       case "Crore":
        this.salaryCondition=true
        this.strokeSalary="white"
        this.totalSalary=this.salary*10000000
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.salarydto.minAnnualCTC >= 10000000 && x.salarydto.minAnnualCTC <= this.totalSalary)
        break;
      }
    }
  }
  
  //Method to remove and validate the filters for diffrent sort values
  removefilter(){
    this.filterSearchData=this.getSearchData
    if(this.experience==true){
      switch (this.selectedFilter) {   
        case "1":
          this.fresher=true
          this.experience=true
          this.strokeColor="white"
          this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min < 1)
          break;
        case "2":
          this.twoyears=true
          this.experience=true
          this.strokeColor="white"
          this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min <= 2 && x.workexperienceDto.min >= 1)
          break;
        case "3":
          this.fouryears=true
          this.experience=true
          this.strokeColor="white"
          this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min <= 4 && x.workexperienceDto.min >= 2)
          break;
        case "4":
          this.fiveyears=true
          this.experience=true
          this.strokeColor="white"
          this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min > 4)
          break;
       
      }
    }

    if(this.freshness==true){
      switch (this.selectedFreshness) {   
        case "1":
          this.all=true
          this.freshness=true
          this.strokeColor2="white"
          this.filterSearchData=this.filterSearchData
          break;
        case "2":
          this.oneDay=true
          this.freshness=true
          this.strokeColor2="white"
          this.filterSearchData = this.filterSearchData.filter((x: any) => x.numberOfDays<2)
          break;
        case "3":
          this.threeDays=true
          this.freshness=true
          this.strokeColor2="white"
          this.filterSearchData = this.filterSearchData.filter((x: any) => x.numberOfDays<4)
          break;
        case "4":
          this.week=true
          this.freshness=true
          this.strokeColor2="white"
          this.filterSearchData = this.filterSearchData.filter((x: any) => x.numberOfDays<8)
          break;
       
      }
    }

    if(this.jobRoleCondition==true){
      for(let i=0;i<this.JobRole.length;i++){
        if(this.JobRole[i]==this.selectedFilter2){
          this.uncheckJobRole[i]=true
        }
      }
      this.strokeColor1="white"
      this.filterSearchData = this.filterSearchData.filter((x: any) => x.role == this.selectedFilter2)
    }

    if(this.condition==true){
      switch(this.selectedFilter1){
        case "Full Time":
          this.fulltime=true
          this.filterSearchData = this.filterSearchData.filter((x: any) => x.empType == this.selectedFilter1)
          break;
    
        case "Part Time":
          this.partTime=true
          this.filterSearchData = this.filterSearchData.filter((x: any) => x.empType == this.selectedFilter1)
          break;
        }
    }

    if(this.workCondition==true){
      this.filterSearchData = this.filterSearchData.filter((x: any) => x.workFromHome == this.selectedWorkFromHome)
  } 

  if(this.condition1==true){
    switch(this.selectedShift){
      case "DAY":
        this.dayShift=true
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.shift == this.selectedShift)
        break;
  
      case "NIGHT":
        this.nightShift=true
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.shift == this.selectedShift)
        break;
      }

  }

  if(this.jobCityCondition==true){
    for(let i=0;i<this.masterLocation.length;i++){
      if(this.selectedLocation==this.masterLocation[i])
      this.uncheckJobCity[i]=true
    }
    this.strokeColor3="white"
    this.filterSearchData = this.filterSearchData.filter((x: any) =>  x.locations[0]?.city == this.selectedLocation)
  }

  if(this.salaryCondition==true){
    
        switch(this.salaryRange){
          case "Thousands":
            this.strokeSalary="white"
            this.totalSalary=this.salary*1000
            this.filterSearchData = this.filterSearchData.filter((x: any) => x.salarydto.minAnnualCTC >= 1000 && x.salarydto.minAnnualCTC <= this.totalSalary)
            break;
      
          case "Lakhs":
            this.strokeSalary="white"
            this.totalSalary=this.salary*100000
            this.filterSearchData = this.filterSearchData.filter((x: any) => x.salarydto.minAnnualCTC >= 100000 && x.salarydto.minAnnualCTC <= this.totalSalary)
            break;
    
           case "Crore":
            this.strokeSalary="white"
            this.totalSalary=this.salary*10000000
            this.filterSearchData = this.filterSearchData.filter((x: any) => x.salarydto.minAnnualCTC >= 10000000 && x.salarydto.minAnnualCTC <= this.totalSalary)
            break;
          }
        
      }

  }

    //Method to clear the previously selected data for sorting the jobs on basis of Salary
  salaryPopupRemove(){
    this.Thousands=false
    this.lakhs=false
    this.crore=false
    this.salaryCondition=false
    this.strokeSalary="#252525"
    this.salaryRange=""
    this.salaryCount=0
    this.salaryRangeFixed=""
    this.salary=0
    this.removefilter()
  } 

  //Method to clear the previously selected data for sorting the jobs on basis of City
  removeJobCityFilter(){
    this.uncheckJobCity.length=this.masterLocation.length
    for(let i=0;i<this.masterLocation.length;i++){
      if(this.selectedLocation==this.masterLocation[i])
      this.uncheckJobCity[i]=false
    }
    this.selectedLocation=""
    this.count3=0
    this.jobCityCondition=false
    this.strokeColor3="#252525"
    this.removefilter()
  }

  //Method to clear the previously selected data for sorting the jobs on basis of Job Roles
  removeJobFilter(){
    this.uncheckJobRole.length=this.JobRole.length
    for(let i=0;i<this.JobRole.length;i++){
      if(this.JobRole[i]==this.selectedFilter2){
        this.uncheckJobRole[i]=false
      }
    }
    this.jobRoleCondition=false
    this.strokeColor1="#252525"
    this.selectedFilter2 = ""
    this.count2=0
    this.removefilter()

  }
  //Method to clear the previously selected data for sorting the jobs on basis of Freshness
  removeFreshnessFilter(){
    this.all=false
    this.oneDay=false
    this.threeDays=false
    this.week=false
    this.strokeColor2="#252525"
    this.count1=0
    this.freshness=false
    this.selectedFreshness = ""
    this.removefilter()
  }

   //Method to clear the previously selected data for sorting the jobs on basis of Work Experience
  removeExperienceFilter(){
    this.selectedFilter=""
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
  masterFilter:boolean=false;
  masterFilterPopup(){
    this.masterFilter = !this.masterFilter
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
  getIndustries() {
    this.FilterService.getIndustryMasterData().subscribe((data: any) => {
      this.industryType = data; 
      this.searchIndustry = this.industryType
    });
  }

//This method will capture indsustry selected and filter them
  industrySearch(e:any) {

    this.industryType = [...this.searchIndustry.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.industryType.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }


//This method will apply search job on basic of job role
  JobRoleSearch1(e:any) {
    this.JobRole1 = [...this.searchJobRoles.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.JobRole.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }
  


//This method will get employment type
  employmentType :any=[];
  getEmploymentType(){
    this.FilterService.getEmploymentType().subscribe((data:any) => {
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
      this.removeMasterFilter()
    }
  else{
    switch (this.ExperienceFilter) {   
      case "1":
        this.Fresher=true
        this.experience=true
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min < 1)
        break;
      case "2":
        this.twoYears=true
        this.experience=true
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min <= 2 && x.workexperienceDto.min >= 1)
        break;
      case "3":
        this.fourYears=true
        this.experience=true
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min <= 4 && x.workexperienceDto.min >= 2)
        break;
      case "4":
        this.fiveYears=true
        this.experience=true
        this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min > 4)
        break;
     
    }
  }

  }

//This method will apply filter accoring to Job Role 
  selectedJobRole:any;
  jobRoleCount:number=0;

  jobRoleFilter(e: any) {
    this.selectedJobRole = e
    for(let i=0;i<this.JobRole1.length;i++){
      if(this.JobRole1[i]==this.selectedJobRole){
        this.uncheckJobRole[i]=true
      }
    }
    this.jobRoleCount=this.jobRoleCount+1
    if(this.jobRoleCount>1){
        this.removeMasterFilter()
    }
  this.filterSearchData = this.filterSearchData.filter((x: any) => x.role == this.selectedJobRole)
  this.jobRoleCondition=true
  
   }


//This method will apply filter accoring to location
   seclectedJobCity:any;
   jobcitycount:number=0;
 
   jobCityFilter(e: any) {
     this.seclectedJobCity = e
     for(let i=0;i<this.masterLocation.length;i++){
       if(this.masterLocation[i]==this.seclectedJobCity){
         this.uncheckJobCity[i]=true
       }
     }
     this.jobcitycount=this.jobcitycount+1
     if(this.jobcitycount>1){
       this.removeMasterFilter()
     }
     this.filterSearchData = this.filterSearchData.filter((x: any) => x.locations[0]?.city == this.seclectedJobCity)
     
     this.jobCityCondition=true
   
    }


//This method will apply filter accoring to English Fluency 
   selectedFluency:any;
   jobenglishFluency:number=0;
   jobfluencycondition: boolean=false; 
   uncheckjobfluency: any=[];

   jobEnglishFluency(e: any) {
     this.selectedFluency = e
     for(let i=0;i<this.fluency.length;i++){
       if(this.fluency[i]==this.selectedFluency){
         this.uncheckjobfluency[i]=true
       }
     }
     this.jobenglishFluency=this.jobenglishFluency+1
     if(this.jobenglishFluency>1){
       this.removeMasterFilter()
     }
     this.filterSearchData = this.filterSearchData.filter((x: any) => x.englishFluency == this.selectedFluency)
   
    //  if (this.seclectedFluency == "no English") {
    //   this.filterSearchData = this.filterSearchData.filter((x: any) => x.englishFluency == null);
    // } else {
    //   this.filterSearchData = this.filterSearchData.filter((x: any) => x.englishFluency == this.seclectedFluency);
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
        this.removeMasterFilter()
      }
      this.filterSearchData = this.filterSearchData.filter((x: any) => x.industry == this.seclectedIndustry)
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
         this.removeMasterFilter()
       }
       this.filterSearchData = this.filterSearchData.filter((x: any) => x.empType == this.seclectedEmpType)
       this.emplTpyecondition=true
     
      }
  

//This method will apply filter accoring to shift 
      seclectedShiftType:any;
      shiftcount:number=0;
      shiftcondition: boolean=false; 
      uncheckShift: any=[];
    
      shiftTypeFilter(e: any) {
        this.seclectedShiftType = e
        for(let i=0;i<this.shiftType.length;i++){
          if(this.shiftType[i]==this.seclectedShiftType){
            this.uncheckShift[i]=true
          }
        }
        this.shiftcount=this.shiftcount+1
        if(this.shiftcount>1){
          this.removeMasterFilter()
        }
          this.filterSearchData = this.filterSearchData.filter((x: any) => x.shift == this.seclectedShiftType)
          this.shiftcondition=true
      
       }
  
//This method will remove Filter that are applied 
removeMasterFilter(){
    this.filterSearchData=this.getSearchData
    if(this.experience==true){
      switch (this.ExperienceFilter) {   
        case "1":
          this.Fresher=true
          this.experience=true
          this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min < 1)
          break;
        case "2":
          this.twoYears=true
          this.experience=true
          this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min <= 2 && x.workexperienceDto.min >= 1)
          break;
        case "3":
          this.fourYears=true
          this.experience=true
          this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min <= 4 && x.workexperienceDto.min >= 2)
  
          break;
        case "4":
          this.fiveYears=true
          this.experience=true
          this.filterSearchData = this.filterSearchData.filter((x: any) => x.workexperienceDto.min > 4)
          break;
       
      }
    }

    if(this.jobRoleCondition==true){
      for(let i=0;i<this.JobRole1.length;i++){
        if(this.JobRole1[i]==this.selectedJobRole){
          this.uncheckJobRole[i]=true
        }
      }
      this.filterSearchData = this.filterSearchData.filter((x: any) => x.role == this.selectedJobRole)
    }


    if(this.jobCityCondition==true){
      for(let i=0;i<this.masterLocation.length;i++){
        if(this.masterLocation[i]==this.seclectedJobCity){
          this.uncheckJobCity[i]=true
        }
      }
      this.filterSearchData = this.filterSearchData.filter((x: any) =>  x.locations[0]?.city  == this.seclectedJobCity)
    }


    if(this.jobfluencycondition==true){
      for(let i=0;i<this.fluency.length;i++){
        if(this.fluency[i]==this.selectedFluency){
          this.uncheckjobfluency[i]=true
        }
      }
      this.filterSearchData = this.filterSearchData.filter((x: any) =>  x.englishFluency  == this.selectedFluency)
    }


    if(this.industrycondition==true){
      for(let i=0;i<this.industryType.length;i++){
        if(this.industryType[i]==this.seclectedIndustry){
          this.uncheckindustry[i]=true
        }
      }
      this.filterSearchData = this.filterSearchData.filter((x: any) =>  x.industry  == this.seclectedIndustry)
    }



    if(this.emplTpyecondition==true){
      for(let i=0;i<this.employmentType.length;i++){
        if(this.employmentType[i]==this.seclectedEmpType){
          this.uncheckEmpType[i]=true
        }
      }
      this.filterSearchData = this.filterSearchData.filter((x: any) =>  x.empType == this.seclectedEmpType)
    }


    if(this.shiftcondition==true){
      for(let i=0;i<this.shiftType.length;i++){
        if(this.shiftType[i]==this.seclectedShiftType){
          this.uncheckShift[i]=true
        }
      }
      this.filterSearchData = this.filterSearchData.filter((x: any) =>  x.shift == this.seclectedShiftType)
    }

  }

}
