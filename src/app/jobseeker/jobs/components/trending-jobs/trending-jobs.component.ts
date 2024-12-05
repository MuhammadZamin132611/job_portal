/*
Name: Muhammad Zmain
What: This is the controller ts file to Applied Jobs in the Jobseeker module.
Why: This is provided to Jobseeker have to see the all trending jobs and apply the filter
*/

// Imports - Angular Framework - Mandatory
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { fromEvent, Observable, Subscription } from 'rxjs';

// Imports - JobCheck Services - Mandatory
import { HomeService } from '../../../dashboard/services/home.service';
import { OnboardingLocationService } from 'src/app/jobseeker/onboarding/services/onboarding-location.service';
import { FilterService } from '../../../dashboard/services/filter.service';

// Define a component with the following metadata settings
@Component({
  selector: 'app-trending-jobs',
  templateUrl: './trending-jobs.component.html',
  styleUrls: ['./trending-jobs.component.css']
})

// Class to TrendingJobsComponent. This class represents the component with form elements and actions to get all trending jobs client into the system
export class TrendingJobsComponent implements OnInit {

  // Declare a variable type (it can hold values of any type)
  isPopupVisible1: boolean = false;
  id: string | null;
  location1: string = '';
  promo: any[] = [];
  data: any;
  selectedfilter: any;
  strokeColor: string = "#252525";
  count: number = 0;
  experience: boolean;
  filterPromoData: any[];
  currentdate: any;
  posteddate: any;
  difference: number;
  days: number;
  selectedfreshness: any;
  strokeColor2: string = "#252525";
  count1: number = 0;
  freshness: boolean = false;
  isPopupVisible2: boolean = false;
  isPopupVisibleJobrole: boolean;
  JobRole: any[];
  searchJobRoles: any;
  errorMsgOfskills: string;
  JobRole1: any;
  selectedfilter2: any;
  strokeColor1: string = "#252525";
  jobrolecondition: boolean = false;
  count2: number = 0;
  selectedfilter1: any;
  condition: boolean = false;
  fulltime: boolean = false;
  parttime: boolean = false;
  selected_Workfromhome: any;
  workcondition: boolean = false;
  selectedshift: any;
  condition1: boolean;
  dayshift: boolean;
  nightshift: boolean;
  masterLocation: any;
  masterLocationCopy: any;
  jobcitypopup: boolean = false;
  selectedlocation: any;
  jobcitycondition: boolean = false;
  count3: number = 0;
  errorMsgOflocation: string;
  strokeColor3: string = "#252525";
  salpopup: boolean = false;
  salary: number = 0
  salaryrange: any;
  Thousands: boolean = false;
  crore: boolean = false;
  lakhs: boolean = false;
  salaryrangefixed: string;
  salarycondition: boolean;
  stroksalary: string = "#252525";
  totalsalary: number;
  salarycount: number = 0;
  uncheckjobrole: any = [];
  uncheckjobcity: any = [];
  fresher: boolean = false;
  twoyears: boolean = false;
  fouryears: boolean = false;
  fiveyears: boolean = false;
  all: boolean = false;
  oneDay: boolean = false;
  threedays: boolean = false;
  week: boolean = false;
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  buttonName: any = 'show';
  show: boolean = false;
  tick: boolean = false;
  promotedJobsCount: number = 0
  allJobData: any[] = []; // Replace 'any[]' with the appropriate type of your data.
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
    { name: 'Any', value: 'DAY', checked: false },
    { name: 'Day shift', value: 'DAY', checked: false },
    { name: 'Night shift', value: 'NIGHT', checked: false },
  ]

  // A class with nessary injector like HomeService, Location etc.
  constructor(private api: HomeService, private location: Location, private FilterService: FilterService, private locationService: OnboardingLocationService) {
    this.id = localStorage.getItem('profileID');

  }

  // It is a event action method 
  ngOnInit(): void {
    this.getTrendingJob();
    this.getEmploymenttype();
    this.getindustries();
    this.getJobRole();
    this.getCity()
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

  // This method is used to navigate the user back to the previous location in the app history
  goBack(): void {
    this.location.back();
  }

  // This function for get all trending jobs
  getTrendingJob() {
    this.api.getTrendingJobs(this.id).subscribe((data: any) => {
      this.promo = data;
      this.currentdate = new Date()
      for (let i = 0; i < this.promo.length; i++) {
        this.posteddate = new Date(this.promo[i].postedDate)
        this.difference = Math.floor(this.currentdate - this.posteddate)
        this.days = Math.floor((this.difference / (1000 * 3600 * 24)));
        this.promo[i].numberOfDays = this.days
      }
      this.filterPromoData = this.promo
      this.allJobData = this.filterPromoData
      this.promotedJobsCount = this.promo.length;
    });
  }

  // Get job role master data
  getJobRole() {
    this.api.getJobRole().subscribe((data) => {
      this.JobRole1 = data;
      this.JobRole = this.JobRole1;
      this.searchJobRoles = this.JobRole

    });
  }

  // This Funtion for search the job role
  JobRoleSearch(e: any) {
    console.log("======>", e.value)
    this.JobRole = [...this.searchJobRoles.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.JobRole.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }

  // This Funtion for search the job city
  searchCitys(e: any) {
    this.masterLocation = [...this.masterLocationCopy.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.masterLocation.length == 0) {
      this.errorMsgOflocation = 'assets/images/amico.svg';
    } else {
      this.errorMsgOflocation = '';
    }
  }

  // This Function for get all city name
  getCity() {
    this.locationService.getLocation().subscribe(data => {
      this.masterLocation = data;
      console.log("=======------------->", this.masterLocation)
      this.masterLocationCopy = data;
    })
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
  togglePopupJobCity() {
    this.jobcitypopup = !this.jobcitypopup;
  }
  salarypopup() {
    this.salpopup = !this.salpopup;
  }

  // this function for apply the filter
  Selectedfilter(e: any) {
    this.selectedfilter = e
    this.fresher = false
    this.twoyears = false
    this.fouryears = false
    this.fiveyears = false
    this.strokeColor = "#252525"
    this.count = this.count + 1
    if (this.count > 1) {
      console.log("========>?")
      this.removefilter()
    }
    else {
      switch (this.selectedfilter) {
        case "1":
          this.fresher = true
          this.experience = true
          this.strokeColor = "white"
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min < 1)
          console.log("======>", this.filterPromoData)
          break;
        case "2":
          this.twoyears = true
          this.experience = true
          this.strokeColor = "white"
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min <= 2 && x.workexperienceDto.min >= 1)
          console.log("======>", this.filterPromoData)
          break;
        case "3":
          this.fouryears = true
          this.experience = true
          this.strokeColor = "white"
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min <= 4 && x.workexperienceDto.min >= 2)
          console.log("======>", this.filterPromoData)

          break;
        case "4":
          this.fiveyears = true
          this.experience = true
          this.strokeColor = "white"
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min > 4)
          console.log("======>", this.filterPromoData)
          break;

      }
    }

  }


  // This function for apply the sort filter by freshnesh
  freshnessfilter(e: any) {
    this.selectedfreshness = e
    this.all = false
    this.oneDay = false
    this.threedays = false
    this.week = false
    this.strokeColor2 = "#252525"
    this.count1 = this.count1 + 1
    if (this.count1 > 1) {
      console.log("========>?")
      this.removefilter()
    }
    else {
      switch (this.selectedfreshness) {
        case "1":
          this.all = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterPromoData = this.filterPromoData
          console.log("======>", this.filterPromoData)
          break;
        case "2":
          this.oneDay = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.numberOfDays < 2)
          console.log("======>", this.filterPromoData)
          break;
        case "3":
          this.threedays = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.numberOfDays < 4)
          console.log("======>", this.filterPromoData)

          break;
        case "4":
          this.week = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.numberOfDays < 8)
          console.log("======>", this.filterPromoData)
          break;

      }
    }

  }

  // This function for apply the filter by job role
  Selectedfilter1(e: any) {
    this.selectedfilter2 = e
    for (let i = 0; i < this.JobRole.length; i++) {
      if (this.JobRole[i] == this.selectedfilter2) {
        this.uncheckjobrole[i] = true
      }
    }
    this.count2 = this.count2 + 1
    if (this.count2 > 1) {
      console.log("========>?")
      this.removefilter()
    }
    console.log("==========>", this.selectedfilter)
    this.strokeColor1 = "white"
    this.filterPromoData = this.filterPromoData.filter((x: any) => x.role == this.selectedfilter2)
    console.log("======>", this.filterPromoData)
    this.jobrolecondition = true

  }

  // This function for apply the filter sort by full time and part time
  Selectedfilter2(e: any) {
    this.selectedfilter1 = e
    this.condition = !this.condition
    if (this.condition == true) {
      this.fulltime = false
      this.parttime = false
      switch (this.selectedfilter1) {
        case "Full Time":
          this.fulltime = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.empType == this.selectedfilter1)
          console.log("======>", this.filterPromoData)
          break;

        case "Part Time":
          this.parttime = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.empType == this.selectedfilter1)
          console.log("======>", this.filterPromoData)
          break;
      }
    }

    if (this.condition == false) {
      this.fulltime = false
      this.parttime = false
      console.log("============>")
      this.removefilter()
    }
  }

  // This function for apply the sort filter by salary 
  selectedsalary(e: any) {
    this.salaryrange = e
    this.Thousands = false
    this.lakhs = false
    this.crore = false
    console.log("=====>", this.salaryrange)

    switch (this.salaryrange) {
      case "Thousands":
        this.Thousands = true
        this.salaryrangefixed = "K"
        console.log("thou==>", this.Thousands)
        break;

      case "Lakhs":
        this.lakhs = true
        this.salaryrangefixed = "Lk"
        console.log("lakhs==>", this.lakhs)
        break;

      case "Crore":
        this.crore = true
        this.salaryrangefixed = "Cr"
        console.log("crore==>", this.crore)
        break;
    }

  }

// This function for apply the sort filter by salary condition
  salaryfilter() {
    this.salarycount = this.salarycount + 1
    if (this.salarycount > 1) {
      if (this.salaryrange == undefined || this.salaryrange == "") {
        return
      }
      this.salarycondition = true
      this.stroksalary = "white"
      console.log("============>", this.salarycount)
      this.removefilter()
    } else {

      switch (this.salaryrange) {
        case "Thousands":
          this.salarycondition = true
          this.stroksalary = "white"
          this.totalsalary = this.salary * 1000
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.salarydto.minAnnualCTC >= 1000 && x.salarydto.minAnnualCTC <= this.totalsalary)
          console.log("=====>====>", this.filterPromoData)

          break;

        case "Lakhs":
          this.salarycondition = true
          this.stroksalary = "white"
          this.totalsalary = this.salary * 100000
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.salarydto.minAnnualCTC >= 100000 && x.salarydto.minAnnualCTC <= this.totalsalary)
          console.log("=====>====>", this.filterPromoData)

          break;

        case "Crore":
          this.salarycondition = true
          this.stroksalary = "white"
          this.totalsalary = this.salary * 10000000
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.salarydto.minAnnualCTC >= 10000000 && x.salarydto.minAnnualCTC <= this.totalsalary)
          console.log("=====>====>", this.filterPromoData)


          break;
      }
    }
  }

   // This function for apply the sort filter by work experience 
  workfromhomefilter(e: any) {
    this.selected_Workfromhome = e
    this.workcondition = !this.workcondition
    if (this.workcondition == true) {
      this.filterPromoData = this.filterPromoData.filter((x: any) => x.workFromHome == this.selected_Workfromhome)
      console.log("======>", this.filterPromoData)
    }

    if (this.workcondition == false) {
      console.log("============>")
      this.removefilter()
    }

  }

  // This function for apply the sort filter by job city 
  jobcity(e: any) {
    this.selectedlocation = e
    for (let i = 0; i < this.masterLocation.length; i++) {
      if (this.selectedlocation == this.masterLocation[i])
        this.uncheckjobcity[i] = true
    }
    this.count3 = this.count3 + 1
    if (this.count3 > 1) {
      console.log("========>?")
      this.removefilter()
    }
    console.log("==========>", this.selectedlocation)
    this.jobcitycondition = true
    this.strokeColor3 = "white"
    console.log("======>", this.filterPromoData)
    this.filterPromoData = this.filterPromoData.filter((x: any) => x.locations[0]?.city.slice(0, 1) === this.selectedlocation.slice(0, 1))
    console.log("======>", this.filterPromoData)

  }

   // This function for apply the sort filter by job shift 
  shiftfilter(e: any) {
    this.selectedshift = e
    this.condition1 = !this.condition1
    if (this.condition1 == true) {
      this.dayshift = false
      this.nightshift = false
      switch (this.selectedshift) {
        case "DAY":
          this.dayshift = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.shift == this.selectedshift)
          console.log("======>", this.filterPromoData)
          break;

        case "NIGHT":
          this.nightshift = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.shift == this.selectedshift)
          console.log("======>", this.filterPromoData)
          break;
      }
    }


    if (this.condition1 == false) {
      this.dayshift = false
      this.nightshift = false
      console.log("============>")
      this.removefilter()
    }

  }

  //  // This function for clear the sort filter 
  removefilter() {
    this.filterPromoData = this.promo
    if (this.experience == true) {
      switch (this.selectedfilter) {
        case "1":
          this.fresher = true
          this.experience = true
          this.strokeColor = "white"
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min < 1)
          console.log("======>", this.filterPromoData)
          break;
        case "2":
          this.twoyears = true
          this.experience = true
          this.strokeColor = "white"
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min <= 2 && x.workexperienceDto.min >= 1)
          console.log("======>", this.filterPromoData)
          break;
        case "3":
          this.fouryears = true
          this.experience = true
          this.strokeColor = "white"
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min <= 4 && x.workexperienceDto.min >= 2)
          console.log("======>", this.filterPromoData)

          break;
        case "4":
          this.fiveyears = true
          this.experience = true
          this.strokeColor = "white"
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min > 4)
          console.log("======>", this.filterPromoData)
          break;

      }
    }

    if (this.freshness == true) {
      switch (this.selectedfreshness) {
        case "1":
          this.all = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterPromoData = this.filterPromoData
          console.log("======>", this.filterPromoData)
          break;
        case "2":
          this.oneDay = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.numberOfDays < 2)
          console.log("======>", this.filterPromoData)
          break;
        case "3":
          this.threedays = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.numberOfDays < 4)
          console.log("======>", this.filterPromoData)

          break;
        case "4":
          this.week = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.numberOfDays < 8)
          console.log("======>", this.filterPromoData)
          break;

      }
    }

    if (this.jobrolecondition == true) {
      for (let i = 0; i < this.JobRole.length; i++) {
        if (this.JobRole[i] == this.selectedfilter2) {
          this.uncheckjobrole[i] = true
        }
      }
      this.strokeColor1 = "white"
      this.filterPromoData = this.filterPromoData.filter((x: any) => x.role == this.selectedfilter2)
      console.log("======>", this.filterPromoData)
    }

    if (this.condition == true) {
      switch (this.selectedfilter1) {
        case "Full Time":
          this.fulltime = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.empType == this.selectedfilter1)
          console.log("======>", this.filterPromoData)
          break;

        case "Part Time":
          this.parttime = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.empType == this.selectedfilter1)
          console.log("======>", this.filterPromoData)
          break;
      }
    }

    if (this.workcondition == true) {
      this.filterPromoData = this.filterPromoData.filter((x: any) => x.workFromHome == this.selected_Workfromhome)
      console.log("======>", this.filterPromoData)
    }

    if (this.condition1 == true) {
      switch (this.selectedshift) {
        case "DAY":
          this.dayshift = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.shift == this.selectedshift)
          console.log("======>", this.filterPromoData)
          break;

        case "NIGHT":
          this.nightshift = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.shift == this.selectedshift)
          console.log("======>", this.filterPromoData)
          break;
      }

    }

    if (this.jobcitycondition == true) {
      for (let i = 0; i < this.masterLocation.length; i++) {
        if (this.selectedlocation == this.masterLocation[i])
          this.uncheckjobcity[i] = true
      }
      this.strokeColor3 = "white"
      this.filterPromoData = this.filterPromoData.filter((x: any) => x.locations[0]?.city == this.selectedlocation)
      console.log("======>", this.filterPromoData)
    }

    if (this.salarycondition == true) {

      console.log("===salaryrange==>", this.salaryrange)
      switch (this.salaryrange) {
        case "Thousands":
          this.stroksalary = "white"
          this.totalsalary = this.salary * 1000
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.salarydto.minAnnualCTC >= 1000 && x.salarydto.minAnnualCTC <= this.totalsalary)
          console.log("=====>====>", this.filterPromoData)

          break;

        case "Lakhs":
          this.stroksalary = "white"
          this.totalsalary = this.salary * 100000
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.salarydto.minAnnualCTC >= 100000 && x.salarydto.minAnnualCTC <= this.totalsalary)
          console.log("=====>====>", this.filterPromoData)

          break;

        case "Crore":
          this.stroksalary = "white"
          this.totalsalary = this.salary * 10000000
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.salarydto.minAnnualCTC >= 10000000 && x.salarydto.minAnnualCTC <= this.totalsalary)
          console.log("=====>====>", this.filterPromoData)


          break;
      }

    }

  }

  // This function to display the salary type like monthly
  salarypopupremovie() {
    this.Thousands = false
    this.lakhs = false
    this.crore = false
    this.salarycondition = false
    this.stroksalary = "#252525"
    this.salaryrange = ""
    this.salarycount = 0
    this.salaryrangefixed = ""
    this.salary = 0
    this.removefilter()
  }

  // remove the sort filter by job role
  removejobfilter() {
    this.uncheckjobrole.length = this.JobRole.length
    for (let i = 0; i < this.JobRole.length; i++) {
      if (this.JobRole[i] == this.selectedfilter2) {
        this.uncheckjobrole[i] = false
      }
    }
    this.jobrolecondition = false
    this.strokeColor1 = "#252525"
    this.selectedfilter2 = ""
    this.count2 = 0
    this.removefilter()

  }

  // remove the sort filter by job city
  removiejobcityfilter() {
    this.uncheckjobcity.length = this.masterLocation.length
    for (let i = 0; i < this.masterLocation.length; i++) {
      if (this.selectedlocation == this.masterLocation[i])
        this.uncheckjobcity[i] = false
    }
    this.selectedlocation = ""
    this.count3 = 0
    this.jobcitycondition = false
    this.strokeColor3 = "#252525"
    this.removefilter()
  }

  // remove the sort filter by work experience 
  removeexperiencefilter() {
    this.selectedfilter = ""
    this.fresher = false
    this.twoyears = false
    this.fouryears = false
    this.fiveyears = false
    this.experience = false
    this.strokeColor = "#252525"
    this.count = 0
    this.removefilter()
  }

  // remove the sort filter by freshnesh
  removiefreshnessfilter() {
    this.all = false
    this.oneDay = false
    this.threedays = false
    this.week = false
    this.strokeColor2 = "#252525"
    this.count1 = 0
    this.freshness = false
    this.selectedfreshness = ""
    this.removefilter()
  }
  pop: boolean = true;
  isPopupVisible = false;
  message11 = ''
  messsage12 = ''
  Jobid: number;
  Check: any;

  // open the saved jobs popup by with job id
  openPopup(Jobid: any, saved: any) {
    this.Jobid = Jobid;
    this.Check = saved;
    this.checkSave(saved)
    this.isPopupVisible = true;
  }

  // this function check for jobs saved or not
  checkSave = (con: any) => {
    if (con) {
      this.message11 = 'Unsaved'
      this.messsage12 = 'Are you want to unsave the job'
      console.log("Are you want to unsave the job")
    } else {
      console.log("Are you want to save the job")
      this.message11 = 'Saved'
      this.messsage12 = 'Are you want to Save the job'
    }
  }

// close the saved job popup
  closePopup() {
    this.isPopupVisible = false;
  }

// This function check for saved and unsaved
  redHeart = () => {
    if (this.Check) {
      this.api.unsaved(this.id, this.Jobid).subscribe({
        next: (res: any) => {
          console.log(res)
          //this.getAllJobs();
          this.getTrendingJob()
        }, error: (error) => {
          console.log(error.error, "Job not Unsaved sucessfully ! Please retry")
        }
      })
    } else {
      this.api.postSaved(this.id, this.Jobid, this.Check).subscribe({
        next: (res: any) => {
          console.log(res)
          //this.getAllJobs();
          this.getTrendingJob()
        }, error: (error) => {
          console.log(error.error, "Job not saved sucessfully ! Please retry")
        }
      })
    }
  }


  visible2: any;
  showhideutility2() {
    this.visible3 = this.visible3 ? false : true;
  }
  visible3: any = false;

  parent(event: any) {
    this.visible3 = event;

  }







  masterfilter: boolean = false;

  masterFilterPopup() {

    this.masterfilter = !this.masterfilter

  }




  activeElement: number = 1;
  activeButton: number = 1;

  toggleVisibility(element: number) {
    this.activeElement = element;
    this.activeButton = element
  }


  industryType: any = [];
  searchIndustry: any;
  getindustries() {
    this.FilterService.getIndustryMasterData().subscribe((data: any) => {
      this.industryType = data; 
      this.searchIndustry = this.industryType
    });
  }


  industrySearch(e: any) {
    console.log("======>", e.value)
    this.industryType = [...this.searchIndustry.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.industryType.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }



  // this function for seacrh by job role 
  JobRoleSearch1(e: any) {
    console.log("======>", e.value)
    this.JobRole1 = [...this.searchJobRoles.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.JobRole.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }




  employmentType :any=[];
  getEmploymenttype(){
    this.FilterService.getEmploymentType().subscribe((data:any) => {
      this.employmentType =data;
      

    })
  }

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



  // This function for search by deparment type
  searchDepartment: any;
  departmentSearch(e: any) {
    this.searchDepartment = this.department
    console.log("======>", e.value)
    this.department = [...this.searchDepartment.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.department.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }







  ExperienceFilter: any;
  Fresher: any;
  fiveYears: any;
  twoYears: any;
  fourYears: any;
  expCount: number = 0;

  // This function srot by jobs work experience
  experienceFilter(e: any) {
    this.ExperienceFilter = e
    this.Fresher = false
    this.twoYears = false
    this.fourYears = false
    this.fiveYears = false

    this.expCount = this.expCount + 1

    if (this.expCount > 1) {
      console.log("========>?")
      this.removeMasterfilter()
    }
    else {
      switch (this.ExperienceFilter) {
        case "1":
          this.Fresher = true
          this.experience = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min < 1)
          console.log("======>", this.filterPromoData)
          break;
        case "2":
          this.twoYears = true
          this.experience = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min <= 2 && x.workexperienceDto.min >= 1)
          console.log("======>", this.filterPromoData)
          break;
        case "3":
          this.fourYears = true
          this.experience = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min <= 4 && x.workexperienceDto.min >= 2)
          console.log("======>", this.filterPromoData)

          break;
        case "4":
          this.fiveYears = true
          this.experience = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min > 4)
          console.log("======>", this.filterPromoData)
          break;

      }
    }

  }

  seclectedJobRole: any;
  jobrolecount: number = 0;

  // This function srot by jobs job role
  jobRoleFilter(e: any) {
    this.seclectedJobRole = e
    for (let i = 0; i < this.JobRole1.length; i++) {
      if (this.JobRole1[i] == this.seclectedJobRole) {
        this.uncheckjobrole[i] = true
      }
    }
    this.jobrolecount = this.jobrolecount + 1
    if (this.jobrolecount > 1) {
      console.log("========>?")
      this.removeMasterfilter()
    }
    console.log("==========>", this.selectedfilter)
    this.filterPromoData = this.filterPromoData.filter((x: any) => x.role == this.seclectedJobRole)
    console.log("======>", this.filterPromoData)
    this.jobrolecondition = true

  }



  seclectedJobCity: any;
  jobcitycount: number = 0;

  // This function srot by job city
  jobCityFilter(e: any) {
    this.seclectedJobCity = e
    for (let i = 0; i < this.masterLocation.length; i++) {
      if (this.masterLocation[i] == this.seclectedJobCity) {
        this.uncheckjobcity[i] = true
      }
    }
    this.jobcitycount = this.jobcitycount + 1
    if (this.jobcitycount > 1) {
      console.log("========>?")
      this.removeMasterfilter()
    }
    console.log("==========>", this.selectedfilter)
    this.filterPromoData = this.filterPromoData.filter((x: any) => x.locations[0]?.city.slice(0, 1) === this.seclectedJobCity.slice(0, 1))
    console.log("======>", this.filterPromoData)
    this.jobcitycondition = true

  }



  seclectedFluency: any;
  jobenglishFluency: number = 0;
  jobfluencycondition: boolean = false;
  uncheckjobfluency: any = [];

   // This function srot by jobs english fluency
  jobEnglishFluency(e: any) {
    this.seclectedFluency = e
    for (let i = 0; i < this.fluency.length; i++) {
      if (this.fluency[i] == this.seclectedFluency) {
        this.uncheckjobfluency[i] = true
      }
    }
    this.jobenglishFluency = this.jobenglishFluency + 1
    if (this.jobenglishFluency > 1) {
      console.log("========>?")
      this.removeMasterfilter()
    }
    console.log("==========>", this.selectedfilter)
    this.filterPromoData = this.filterPromoData.filter((x: any) => x.englishFluency == this.seclectedFluency)
    console.log("======>", this.filterPromoData)

    //  if (this.seclectedFluency == "no English") {
    //   this.filterPromoData = this.filterPromoData.filter((x: any) => x.englishFluency == null);
    // } else {
    //   this.filterPromoData = this.filterPromoData.filter((x: any) => x.englishFluency == this.seclectedFluency);
    // }
    this.jobfluencycondition = true

  }



  seclectedIndustry: any;
  industrycount: number = 0;
  industrycondition: boolean = false;
  uncheckindustry: any = [];
 // This function srot by jobs in industry
  industryFilter(e: any) {
    this.seclectedIndustry = e
    for (let i = 0; i < this.industryType.length; i++) {
      if (this.industryType[i] == this.seclectedIndustry) {
        this.uncheckindustry[i] = true
      }
    }
    this.industrycount = this.industrycount + 1
    if (this.industrycount > 1) {
      console.log("========>?")
      this.removeMasterfilter()
    }
    console.log("==========>", this.selectedfilter)
    this.filterPromoData = this.filterPromoData.filter((x: any) => x.industry == this.seclectedIndustry)
    console.log("======>", this.filterPromoData)
    this.industrycondition = true

  }



  seclectedEmpType: any;
  empTypecount: number = 0;
  emplTpyecondition: boolean = false;
  uncheckEmpType: any = [];

 // This function srot by employment type
  empTpyeFilter(e: any) {
    this.seclectedEmpType = e
    for (let i = 0; i < this.employmentType.length; i++) {
      if (this.employmentType[i] == this.seclectedEmpType) {
        this.uncheckEmpType[i] = true
      }
    }
    this.empTypecount = this.empTypecount + 1
    if (this.empTypecount > 1) {
      console.log("========>?")
      this.removeMasterfilter()
    }
    console.log("==========>", this.selectedfilter)
    this.filterPromoData = this.filterPromoData.filter((x: any) => x.empType == this.seclectedEmpType)
    console.log("======>", this.filterPromoData)
    this.emplTpyecondition = true

  }



  seclectedShiftType: any;
  shiftcount: number = 0;
  shiftcondition: boolean = false;
  uncheckshift: any = [];

 // This function srot by shift type
  shiftTypeFilter(e: any) {
    this.seclectedShiftType = e
    for (let i = 0; i < this.shiftType.length; i++) {
      if (this.shiftType[i] == this.seclectedShiftType) {
        this.uncheckshift[i] = true
      }
    }
    this.shiftcount = this.shiftcount + 1
    if (this.shiftcount > 1) {
      console.log("========>?")
      this.removeMasterfilter()
    }
    // console.log("==========>",this.selectedfilter)

    this.filterPromoData = this.filterPromoData.filter((x: any) => x.shift == this.seclectedShiftType)
    console.log("======>", this.filterPromoData)
    this.shiftcondition = true

  }

 // This function remove master filter
  removeMasterfilter() {
    this.filterPromoData = this.promo
    if (this.experience == true) {
      switch (this.ExperienceFilter) {
        case "1":
          this.Fresher = true
          this.experience = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min < 1)
          console.log("======>", this.filterPromoData)
          break;
        case "2":
          this.twoYears = true
          this.experience = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min <= 2 && x.workexperienceDto.min >= 1)
          console.log("======>", this.filterPromoData)
          break;
        case "3":
          this.fourYears = true
          this.experience = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min <= 4 && x.workexperienceDto.min >= 2)
          console.log("======>", this.filterPromoData)

          break;
        case "4":
          this.fiveYears = true
          this.experience = true
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.min > 4)
          console.log("======>", this.filterPromoData)
          break;

      }
    }

    if (this.jobrolecondition == true) {
      for (let i = 0; i < this.JobRole1.length; i++) {
        if (this.JobRole1[i] == this.seclectedJobRole) {
          this.uncheckjobrole[i] = true
        }
      }
      this.filterPromoData = this.filterPromoData.filter((x: any) => x.role == this.seclectedJobRole)
      console.log("======>", this.filterPromoData)
    }


    if (this.jobcitycondition == true) {
      for (let i = 0; i < this.masterLocation.length; i++) {
        if (this.masterLocation[i] == this.seclectedJobCity) {
          this.uncheckjobcity[i] = true
        }
      }
      this.filterPromoData = this.filterPromoData.filter((x: any) => x.locations[0]?.city == this.seclectedJobCity)
      console.log("======>", this.filterPromoData)
    }


    if (this.jobfluencycondition == true) {
      for (let i = 0; i < this.fluency.length; i++) {
        if (this.fluency[i] == this.seclectedFluency) {
          this.uncheckjobfluency[i] = true
        }
      }
      this.filterPromoData = this.filterPromoData.filter((x: any) => x.englishFluency == this.seclectedFluency)
      console.log("======>", this.filterPromoData)
    }


    if (this.industrycondition == true) {
      for (let i = 0; i < this.industryType.length; i++) {
        if (this.industryType[i] == this.seclectedIndustry) {
          this.uncheckindustry[i] = true
        }
      }
      this.filterPromoData = this.filterPromoData.filter((x: any) => x.industry == this.seclectedIndustry)
      console.log("======>", this.filterPromoData)
    }



    if (this.emplTpyecondition == true) {
      for (let i = 0; i < this.employmentType.length; i++) {
        if (this.employmentType[i] == this.seclectedEmpType) {
          this.uncheckEmpType[i] = true
        }
      }
      this.filterPromoData = this.filterPromoData.filter((x: any) => x.empType == this.seclectedEmpType)
      console.log("======>", this.filterPromoData)
    }


    if (this.shiftcondition == true) {
      for (let i = 0; i < this.shiftType.length; i++) {
        if (this.shiftType[i] == this.seclectedShiftType) {
          this.uncheckshift[i] = true
        }
      }
      this.filterPromoData = this.filterPromoData.filter((x: any) => x.shift == this.seclectedShiftType)
      console.log("======>", this.filterPromoData)
    }

  }



  // Assume you have a copy of the original data in 'allJobData'
  // Make sure to set this variable when you first load or fetch the data.
  

  // This function Function to clear both filt
  clearFilters() {
    this.ExperienceFilter = null;
    this.Fresher = false;
    this.twoYears = false;
    this.fourYears = false;
    this.fiveYears = false;
    this.expCount = 0;
    this.uncheckjobrole.length = this.JobRole1.length
    for (let i = 0; i < this.JobRole1.length; i++) {
      if (this.JobRole1[i] == this.seclectedJobRole) {
        this.uncheckjobrole[i] = false
      }
    }
    this.jobrolecondition = false
    this.seclectedJobRole = ""
    this.jobrolecount = 0
    this.uncheckjobcity.length = this.masterLocation.length
    for (let i = 0; i < this.masterLocation.length; i++) {
      if (this.masterLocation[i] == this.seclectedJobCity) {
        this.uncheckjobcity[i] = false;
      }
    }
    this.jobcitycondition = false
    this.seclectedJobCity = ""
    this.jobcitycount = 0
    this.uncheckjobfluency.length = this.fluency.length
    for (let i = 0; i < this.fluency.length; i++) {
      if (this.fluency[i] == this.seclectedFluency) {
        this.uncheckjobfluency[i] = false
      }
    }
    this.jobfluencycondition = false
    this.seclectedFluency = ""
    this.jobenglishFluency = 0
    this.uncheckindustry.length = this.industryType.length
    for (let i = 0; i < this.industryType.length; i++) {
      if (this.industryType[i] == this.seclectedIndustry) {
        this.uncheckindustry[i] = false
      }
    }
    this.industrycondition = false
    this.seclectedIndustry = ""
    this.industrycount = 0
    this.uncheckEmpType.length = this.employmentType.length
    for (let i = 0; i < this.employmentType.length; i++) {
      if (this.employmentType[i] == this.seclectedEmpType) {
        this.uncheckEmpType[i] = false
      }
    }
    this.emplTpyecondition = false
    this.seclectedEmpType = ""
    this.empTypecount = 0

    this.uncheckshift.length = this.shiftType.length

    for (let i = 0; i < this.shiftType.length; i++) {
      if (this.shiftType[i] == this.seclectedShiftType) {
        this.uncheckshift[i] = false
      }
    }
    this.shiftcondition = false
    this.seclectedShiftType = ""
    this.shiftcount = 0
    this.filterPromoData = [...this.allJobData];
    console.log("after clear all filter", this.filterPromoData);
    this.FilterService.setFilteredData(this.filterPromoData);
  }
}

