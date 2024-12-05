import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HomeService } from 'src/app/jobseeker/dashboard/services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-similar-jobs',
  templateUrl: './similar-jobs.component.html',
  styleUrls: ['./similar-jobs.component.css']
})
export class SimilarJobsComponent implements OnInit {

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


  constructor(private http: HomeService, private router: Router, private location1: Location,private api: HomeService) { }

  goBack(): void {
    this.location1.back();
  }
  ngOnInit(): void {
    this.getAreaOfIntrest();
    this.getJobRole();
    this.getAllJobs()

  }


  storeAreaOfIntrest: any = [];

  getAreaOfIntrest() {
    this.id = localStorage.getItem("profileID");
    console.log("Iddddddddddddddddddd", this.id)
    this.http.getAllAreaOfInterest(this.id).subscribe((data: any) => {
      this.storeAreaOfIntrest = data;
      console.log('get area of intrest:', this.storeAreaOfIntrest);
    });
  }

  JobRole: any ;
  getJobRole() {
    this.api.getJobRole().subscribe((data) => {
      this.JobRole1 = data;
      this.JobRole = this.JobRole1.values;
this.searchJobRoles=this.JobRole
      console.log("===========>",this.JobRole )

    });
  }

  JobRoleSearch(e:any) {
    console.log("======>",e.value)
    this.JobRole = [...this.searchJobRoles.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.JobRole.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
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


  Selectedfilter2(e: any) {
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

  shiftfilter(e:any) {
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

  workfromhomefilter(e:any){
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


  Selectedfilter(e: any) {
    this.selectedfilter = e
   // this.experience=false
    this.strokeColor="#252525"
this.count=this.count+1
    if(this.count>1){
      console.log("========>?")
      this.removefilter()
    }
  else{
    switch (this.selectedfilter) {   
      case "1":
        this.experience=true
        this.strokeColor="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp < 1)
        console.log("======>", this.filterJobData)
        break;
      case "2":
        this.experience=true
        this.strokeColor="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp <= 2 && x.workexperienceDto.minExp >= 1)
        console.log("======>", this.filterJobData)
        break;
      case "3":
        this.experience=true
        this.strokeColor="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp <= 4 && x.workexperienceDto.minExp >= 2)
        console.log("======>", this.filterJobData)

        break;
      case "4":
        this.experience=true
        this.strokeColor="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp > 4)
        console.log("======>", this.filterJobData)
        break;
     
    }
  }

  }



  freshnessfilter(e: any) {
    this.selectedfreshness = e
   // this.experience=false
    this.strokeColor2="#252525"
this.count1=this.count1+1
    if(this.count1>1){
      console.log("========>?")
      this.removefilter()
    }
  else{
    switch (this.selectedfreshness) {   
      case "1":
        this.freshness=true
        this.strokeColor2="white"
        this.filterJobData = this.filterJobData
        console.log("======>", this.filterJobData)
        break;
      case "2":
        this.freshness=true
        this.strokeColor2="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays<2)
        console.log("======>", this.filterJobData)
        break;
      case "3":
        this.freshness=true
        this.strokeColor2="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays<4)
        console.log("======>", this.filterJobData)

        break;
      case "4":
        this.freshness=true
        this.strokeColor2="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays<8)
        console.log("======>", this.filterJobData)
        break;
     
    }
  }

  }


 Selectedfilter1(e: any) {

  this.selectedfilter2 = e
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



 jobRole:any;
  jobsForYouCount: number = 0;
  getAllJobs() {
    this.id = localStorage.getItem('profileID');
    this.jobRole=localStorage.getItem('role')
    console.log('iddddddddd', this.id);
    this.http.getSimilarJobs(this.id,this.jobRole).subscribe((data: any) => {
      console.log('data', data);
      this.jobData = data
      this.currentdate = new Date()
      for(let i=0;i<this.jobData.length;i++){
        this.posteddate=  new Date(this.jobData[i].postedDate)       
        this.difference = Math.floor(this.currentdate - this.posteddate)
        this.days = Math.floor((this.difference / (1000 * 3600 * 24)));
        this.jobData[i].numberOfDays=this.days
      }
      console.log("============",this.jobData)
      this.jobsForYouCount = this.jobData.length;
      this.filterJobData = this.jobData;
      console.log('Jobs working:', typeof (this.jobData));
      console.log('Jobs working:', this.jobData);
      console.log('Jobs working:============', this.jobData[1].locations[0].city);
      for (var value of this.jobData[1].locations[0].city) {
        this.location = this.location + value;
      }
      console.log("==========location=======", this.location)
    });
  }


 

  saveJob(value: any) {

    this.Id = localStorage.getItem("profileID");
    this.jobId = localStorage.getItem("JobId");
    this.http.postSaved(this.Id, this.jobId, this.jobData).subscribe((data: any) => {
      console.log("Shoaib+++++++++", data)
      console.log("Job saved")
    })
  }


  removefilter(){
    this.filterJobData = this.jobData;
    if(this.experience==true){
      switch (this.selectedfilter) {
        case "1":
          this.experience=true
          this.strokeColor="white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp < 1)
          console.log("======>", this.filterJobData)
          break;
        case "2":
          this.experience=true
          this.strokeColor="white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp <= 2 && x.workexperienceDto.minExp >= 1)
          console.log("======>", this.filterJobData)
          break;
        case "3":
          this.experience=true
          this.strokeColor="white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp <= 4 && x.workexperienceDto.minExp >= 2)
          console.log("======>", this.filterJobData)
  
          break;
        case "4":
          this.experience=true
          this.strokeColor="white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp > 4)
          console.log("======>", this.filterJobData)
          break;
       
      }
    }
 if(this.freshness==true){
    switch (this.selectedfreshness) {   
      case "1":
        this.freshness=true
        this.strokeColor2="white"
        this.filterJobData = this.filterJobData
        console.log("======>", this.filterJobData)
        break;
      case "2":
        this.freshness=true
        this.strokeColor2="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays<2)
        console.log("======>", this.filterJobData)
        break;
      case "3":
        this.freshness=true
        this.strokeColor2="white"
        this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays<4)
        console.log("======>", this.filterJobData)

        break;
      case "4":
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
    this.strokeColor1="white"
    this.filterJobData = this.filterJobData.filter((x: any) => x.role == this.selectedfilter2)
    console.log("======>", this.filterJobData)
  }



  }
}
