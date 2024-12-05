/*
Name: Vaishnavi Pawar
Date: 26-03-2023
What: This is the controller ts file to show the main dashboard of JobCheck mobile application.
Why: This is provided to Jobseeker a look at jobs based on their profile match as well as promoted jobs.
 */


//1. Imports - Angular Framework - Mandatory
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, fromEvent, Observable, Subscription, catchError } from 'rxjs';

//2. Imports - Capacitor Plugins - Optional
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

//3. Imports - JobCheck Services - Mandatory
import { LoginEmailService } from 'src/app/jobseeker/authentication/services/login-email.service';
import { HomeService } from '../../services/home.service';
import { ExampleService } from '../../services/example.service';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from 'src/environments/environment';
import { OnboardingLocationService } from 'src/app/jobseeker/onboarding/services/onboarding-location.service';
import { ToastrService } from 'ngx-toastr';
import { DashboardJobsService } from '../../services/dashboard-jobs.service';

//4. Imports - Notification - Optional
import { PushNotifications } from '@capacitor/push-notifications';
import { NotificationsService } from '../../services/notifications.service';


//5. Template - Mandatory
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

//6. Class - Mandatory
//Class to show dashboard to Jobseeker . 
//This class represents the component which will show jobs to Jobseeker to apply, save etc.
export class HomeComponent implements OnInit {

  //7. Properties - Mandatory
  loadAPI!: Promise<any>;
  token: any;
  Id: any;
  id: any;
  jobId: any;
  jobData: any = [];
  jobDatas: any;
  imagesarray: any = [];
  profileID: any;
  data: any;
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  title: any = null;
  message: any = null;
  message1: any = null;
  buttonName: any = 'show';
  show: boolean = false;
  tick: boolean = false;
  existUser: string = '';
  showDiv: boolean;
  showWorkExpPopup: boolean = false;
  showFreshnessVar: boolean = false;
  showJobRolePopup: boolean = false;
  Data: any;
  Basic_Detail_Name: any;
  Basic_Detail_Profilestatus: any;
  masterLocation: any = []; // copy of main location lists
  location: string = '';
  location1: string = '';
  errorMsgOfskills: string = '';
  recommend: any;
  childData: any;
  backButtonListener: any;
  promo: any[] = [];
  loc: string = '';
  showSalaryPopup: boolean = false;
  colorHeart2 = false
  cardOpen = false;
  pop1: boolean = true;
  control: any
  rot: any
  showJobCity: boolean = false
  masterLocationCopy: any = [];
  selectedLocation: any;
  salary: number = 0
  currentDate: any;
  postedDate: any;
  difference: number;
  days: number;
  filterJobData: any;
  selectedFilter: any;
  fresher: boolean = false;
  twoYears: boolean = false;
  fourYears: boolean = false;
  fiveYears: boolean = false;
  strokeColor: string = "#252525";
  count: number = 0;
  experience: boolean = false;
  selectedFreshness: any;
  all: boolean = false;
  oneDay: boolean = false;
  threeDays: boolean = false;
  week: boolean = false;
  count1: number = 0;
  freshness: boolean = false;
  strokeColor2: string = "#252525";
  JobRole1: any;
  selectedFilter2: any;
  count2: number = 0;
  strokeColor1: string = "#252525";
  jobRoleCondition: boolean = false;
  uncheckJobRole: any = [];
  selectedFilter1: any;
  condition: boolean = false;
  partTime: boolean = false;
  fulltime: boolean = false;
  selectedWorkFromHome: any;
  workCondition: boolean = false;
  count3: number = 0;
  jobCityCondition: boolean = false;
  strokeColor3: string = "#252525"
  errorMsgOfLocation: string;
  unCheckJobCity: any = [];
  selectedShift: any;
  condition1: any;
  dayShift: boolean = false;
  nightShift: boolean = false;
  salaryRange: any;
  Thousands: boolean = false;
  crore: boolean = false;
  lakhs: boolean = false;
  salaryRangeFixed: string;
  salaryCondition: boolean;
  strokeSalary: string = "#252525";
  totalSalary: number;
  salaryCount: number = 0;
  isLoading: boolean = true;


  //Method to close the Popup to Save a Job
  closePopup1() {
    this.cardOpen = false;
  }
  salpopup:boolean=false;

  //Method to hide and show the Popup for sorting the salary
  salaryPopup() {
    this.salpopup = !this.salpopup;
  }


  //Method to hide and show all the Cities 
  showPopupJobCity() {
    this.showJobCity = !this.showJobCity;
  }



  //Method to be called when we user want to close the Save Job Popup
  onYesClick() {
    this.closePopup1();
    this.pop = false;
  }

  //Method that will show freshness popup 
  showFreshness() {
    this.showFreshnessVar = !this.showFreshnessVar;
  }

  //Method that will show Experience popup 
  showWorkExp() {
    this.showWorkExpPopup = !this.showWorkExpPopup;
  }

  //Method that will show JobRole popup 
  showJobRole() {
    this.showJobRolePopup = !this.showJobRolePopup;
  }


  visible: boolean = false;
  showHideUtility() {
    this.visible = this.visible ? false : true;
  }

  visible1: boolean;
  showHideUtility1() {
    this.visible1 = this.visible1 ? false : true;
  }

  //This method will show the save job popup
  isPopupVisible = false;
  pop: boolean = true;
  message11 = ''
  message12 = ''
  JobId: number;
  Check: any;
  openPopup(JobId: any, saved: any) {
    this.JobId = JobId;
    this.Check = saved;
    this.checkSave(saved)
    this.isPopupVisible = true;
  }

  ///This method will check if job is saved or not and based on that it will update message to show to user
  checkSave = (con: any) => {
    if (con) {
      this.message11 = 'Unsaved'
      this.message12 = 'Do you want to unsave the job'
    } else {
      this.message11 = 'Saved'
      this.message12 = 'Do you want to Save the job'
    }
  }

  //This method will close the save job popup
  closePopup() {
    this.isPopupVisible = false;
  }


  //method will change the heart to red color when job is saved
  redHeart = () => {
    if (this.Check) {
      this.api.unsaved(this.profileID, this.JobId).subscribe({
        next: (res: any) => {
          this.getAllJobs();
          this.getPromotedJob()
        }, error: (error) => {
          console.log(error.error)
        }
      })
    } else {
      this.api.postSaved(this.profileID, this.JobId, this.Check).subscribe({
        next: (res: any) => {
          this.getAllJobs();
          this.getPromotedJob()
        }, error: (error) => {
          console.log(error.error)
        }
      })
    }
  }

  //
  visible2: any;
  showHideUtility2() {
    this.visible3 = this.visible3 ? false : true;
  }
  visible3: any = false;

  //This method will show Side Nave bar
  parent(event: any) {
    this.visible3 = event;

  }
  constructor(private dashboardJobsService: DashboardJobsService, private http: HttpClient, private pushNotification: NotificationsService, private api: HomeService, private login: LoginEmailService, private exampleService: ExampleService, private router: Router, private toastr: ToastrService, private locationService: OnboardingLocationService) {
    this.initPush();
    this.getId();
    this.getPromotedJob();
    this.getAllJobs();

    this.backButtonListener = App.addListener('backButton', () => {
      if (window.confirm('Do you want to exit App?')) {
        App.exitApp();
      }
    });
  }

  ngOnDestroy() {
    this.backButtonListener.remove();
  }

  ngOnInit(): void {
    //this.showSuccess();
    this.getFeaturesCompanies();
    this.requestPermission();
    // this.listen();
    setTimeout(() => {
      this.getAllJobs();
      this.gettingDetails();
      this.posttoken();
      this.getJobRole();
      this.getCity()


    }, 1000);
    const hasShownDivBefore = localStorage.getItem('hasShownDivBefore');
    if (!hasShownDivBefore) {
      this.visible1 = true;
      localStorage.setItem('hasShownDivBefore', 'true');
    } else {
      this.visible1 = false;
    }

    ///This will chow offline screen when network connection is off of device
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

    }));



  }


  //to get tokens for getting notifications
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          this.token = currentToken;
          console.log("Helloo",this.token)
          localStorage.setItem('Token',this.token)

          sessionStorage.setItem('token', currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }

  notification: string = ''
  showSuccess() {
    this.toastr.success('Welcome to Jobcheck', this.notification);
  }


  //This method will get all the notifications -- ON HOLD
  notificationList: any;
  notificationValue: any;
  getAllNotification() {
    this.dashboardJobsService.GetNotification(this.profileID).subscribe((data: any) => {
      this.notificationList = data;
      this.notificationValue = this.notificationList.values[0]
    });
  }

  //This method will get name and profile status percentage of Jobseeker in thr popup
  gettingDetails() {
    this.exampleService.apiJcProfile(this.profileID).subscribe((resp: any) => {
      this.Basic_Detail_Name = resp.name;
      this.exampleService.apiJcProfile1().subscribe((resp: any) => {
        this.Basic_Detail_Profilestatus = resp.profileStatus
        this.isLoading = false;
      })
    });
  }

  //This method will get the email or phone number to set the profile id
  public async getId() {

    let email = localStorage.getItem('Email');
    let sms = localStorage.getItem('sms');
    let fedd = localStorage.getItem('fedemail');


    if (email) {
      this.login.getExistUser(email).subscribe((data: any) => {
        this.profileID = data.profileId;
        localStorage.setItem('profileID', this.profileID);
      });

    } else if (sms) {
      this.login.getExistUser(sms).subscribe((data: any) => {
        this.profileID = data.profileId;
        localStorage.setItem('profileID', this.profileID);
      });
    }
    else if (fedd) {
      this.login.getExistUser(fedd).subscribe((data: any) => {
        this.profileID = data.profileId;
        localStorage.setItem('profileID', this.profileID);
      });
    }
  }


  //This method will be used for notification - ON HOLD
  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();

    }
  }
  private registerPush() {
    PushNotifications.requestPermissions().then(permission => {
      if (permission.receive === 'granted') {
        PushNotifications.register();
      }
      else {
        // If permission is not granted
      }
    });
    PushNotifications.addListener('registration', (token) => {
      this.token = token.value;
    });
    PushNotifications.addListener('registrationError', (err) => {
    }); PushNotifications.addListener('pushNotificationReceived', (notifications) => {
      this.toastr.success(notifications.title, notifications.body);
    });


  }
  //method will post token for jobseeker for sending notification
  posttoken() {
    this.Id = localStorage.getItem("profileID");
    this.pushNotification.postToken(this.Id, this.token).subscribe((data) => {
      console.log("Tokennnnnnnn")

    })
  }

  //This method will get all the recommended jobs for jobseeker
  jobsForYou: boolean;
  homeJobs: any;
  getAllJobs() {

    this.id = localStorage.getItem('profileID');
    this.api.getRecommendedJobs(this.id).subscribe((data: any) => {
      this.recommend = data;
      this.isLoading = false;
      this.jobData = this.recommend
      this.currentDate = new Date()
      for (let i = 0; i < this.jobData.length; i++) {
        this.postedDate = new Date(this.jobData[i].postedDate)
        this.difference = Math.floor(this.currentDate - this.postedDate)
        this.days = Math.floor((this.difference / (1000 * 3600 * 24)));
        this.jobData[i].numberOfDays = this.days
        this.isLoading = false;
      }
      if (this.jobData) {
        this.jobsForYou = true;
      } else {
        this.jobsForYou = false;
      }
      this.filterJobData = this.jobData.slice(0, 15);
      this.homeJobs = this.jobData.slice(0, 5)
      for (var value of this.jobData[1].location[0]) {
        this.location = this.location + value;
      }
    });
  }

  // advFilter(event: any) {
  //   this.recommend.length = 0;
  //   if (event.target.value == 'Part Time') {
  //     for (let jobData of this.jobDatas) {
  //       console.log(jobData.empType);
  //       if (jobData.empType == 'Part Time') {
  //         this.recommend.push(jobData);
  //       }
  //     }

  //   }
  //   else if (event.target.value == 'Full Time') {
  //     for (let jobData of this.jobDatas) {
  //       if (jobData.empType == 'Full Time') {
  //         this.recommend.push(jobData);
  //       }

  //     }
  //   }
  //   else if (event.target.value == 'Any') {
  //     for (let jobData of this.jobDatas) {
  //       if (jobData.empType == 'Any') {
  //         return this.recommend.push(jobData);
  //       }
  //       else if (jobData.empType == 'Any') {
  //         this.recommend.push(jobData);
  //       }

  //     }
  //   }
  //   else if (event.target.value == 'WFH') {
  //     for (let jobData of this.jobDatas) {
  //       if (jobData.empType == 'WFH') {
  //         this.recommend.push(jobData);
  //       }

  //     }
  //   }

  //   else if (event.target.value == 'Night Shift') {
  //     for (let jobData of this.jobDatas) {
  //       if (jobData.empType == 'Night Shift') {
  //         this.recommend.push(jobData);
  //       }

  //     }
  //   }
  //   else if (event.target.value == 'Day Shift') {
  //     for (let jobData of this.jobDatas) {
  //       if (jobData.empType == 'Day Shift') {
  //         this.recommend.push(jobData);
  //       }
  //     }
  //   }

  //   // else if (event.target.value==)
  // }

  ///This method will give you promoted jobs with length 5
  maxFivePromotedJobsShow: any
  messageError: any
  getPromotedJob() {

    this.id = localStorage.getItem('profileID');
    this.api.getPromotedJobs(this.id).subscribe((data: any) => {

      this.promo = data;
      this.isLoading = false;
      //this.checkCity()
      this.maxFivePromotedJobsShow = this.promo.slice(0, 5);
      for (var value of this.data[1].location[0]) {
        this.location1 = this.location1 + value;
      }
    });
  }

  //Method checks the city which is selected
  checkCity = () => {
    if (this.promo.length > 0) {
      if (this.promo[0].locations.length > 0) {
        this.messageError = this.promo[0].location[0];
      } else {
        this.messageError = 'NA'
      }
    } else {
      this.messageError = 'NA'
    }
  }

  //This method is used to search job role
  searchJobRole: string = '';
  skillJob: any = [];
  jobFilter(e: any) {
    this.promo = [...this.skillJob.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))];

  }


  //This method will get all Featured Company for job profile
  FeaturesCompanies: any
  getFeaturesCompanies() {
    this.FeaturesCompanies = localStorage.getItem('profileID');
    this.api.getFeaturesCompany(this.FeaturesCompanies).subscribe((data: any) => {
      this.FeaturesCompanies = data;
      this.isLoading = false;
    });
  }

  //This method will get all Job roles from master data 
  JobRole: any = ' ';
  getJobRole() {
    this.api.getJobRole().subscribe((data) => {
      this.JobRole1 = data;
      this.JobRole = this.JobRole1;
      this.searchJobRoles = this.JobRole
      this.isLoading = false;
    });
  }


  ///This method will check if the job role is valid or not
  isValidJobRole = true;
  validationJR() {
    if (this.selecetedJobRoles.length > 0) {
      this.isValidJobRole = false
    } else {
      this.isValidJobRole = true
    }
  }
  //This method will search Job Role from master data popup
  searchJobRoles: string[] = [...this.JobRole];
  queryJobRole: string = '';
  JobRoleSearch(e: any) {
    this.JobRole = [...this.searchJobRoles.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.JobRole.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }

  //This method will search job city in search box
  searchCities(e: any) {
    this.masterLocation = [...this.masterLocationCopy.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.masterLocation.length == 0) {
      this.errorMsgOfLocation = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfLocation = '';
    }
  }
  //This method will get selected Job Role
  selecetedJobRoles: string[] = []
  OnSelectJobRoles(e: any) {
    if (e.target.checked) {
      this.selecetedJobRoles.push(e.target.value)
      // this.validationJR();
    } else {
      const index = this.selecetedJobRoles.indexOf(e.target.value)
      this.selecetedJobRoles.splice(index, 1)
      // this.validationJR();
    }
  }

  //This method will remove Selected Job Role
  userSelectedJobRoles: any[] = [];
  removeJobRole(e: any) {
    const index = this.selecetedJobRoles.indexOf(e)
    this.selecetedJobRoles.splice(index, 1);
    this.userSelectedJobRoles.length = this.JobRole.length
    for (let j = 0; j < this.JobRole.length; j++) {
      if (this.JobRole[j] == e) {
        this.userSelectedJobRoles[j] = false
      }
    }
  }

  //This method will show all the master data values of Cities
  getCity() {
    this.locationService.getLocation().subscribe(data => {
      this.masterLocation = data;
      this.masterLocationCopy = data;
    })
  }


  // This method will apply filter on Jobs for you for work experience
  applyExperienceFilter(e: any) {
    this.selectedFilter = e
    this.fresher = false
    this.twoYears = false
    this.fourYears = false
    this.fiveYears = false
    this.strokeColor = "#252525"
    this.count = this.count + 1
    if (this.count > 1) {
      this.removefilter()
    }
    else {
      switch (this.selectedFilter) {
        case "1":
          this.fresher = true
          this.experience = true
          this.strokeColor = "white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min < 1)
          break;
        case "2":
          this.twoYears = true
          this.experience = true
          this.strokeColor = "white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min <= 2 && x.workexperienceDto.min >= 1)

          break;
        case "3":
          this.fourYears = true
          this.experience = true
          this.strokeColor = "white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min <= 4 && x.workexperienceDto.min >= 2)


          break;
        case "4":
          this.fiveYears = true
          this.experience = true
          this.strokeColor = "white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min > 4)

          break;

      }
    }

  }


  // This method will select and filter the jobs according to freshness (how recently the job is posted) 
  applyFreshnessFilter(e: any) {
    this.selectedFreshness = e
    this.all = false
    this.oneDay = false
    this.threeDays = false
    this.week = false
    this.strokeColor2 = "#252525"
    this.count1 = this.count1 + 1
    if (this.count1 > 1) {
      this.removefilter()
    }
    else {
      switch (this.selectedFreshness) {
        case "1":
          this.all = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterJobData = this.filterJobData

          break;
        case "2":
          this.oneDay = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays < 2)

          break;
        case "3":
          this.threeDays = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays < 4)


          break;
        case "4":
          this.week = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays < 8)

          break;

      }
    }

  }

  // This method will select and filter the jobs according to Job role 
  selectJobRoles(e: any) {
    this.selectedFilter2 = e
    for (let i = 0; i < this.JobRole.length; i++) {
      if (this.JobRole[i] == this.selectedFilter2) {
        this.uncheckJobRole[i] = true
      }
    }
    this.count2 = this.count2 + 1
    if (this.count2 > 1) {
      this.removefilter()
    }
    this.strokeColor1 = "white"
    this.filterJobData = this.filterJobData.filter((x: any) => x.role == this.selectedFilter2)
    this.jobRoleCondition = true

  }

  // This method will select and filter the employement type whether it is part time or Full Time
  selectEmpType(e: any) {
    this.selectedFilter1 = e
    this.condition = !this.condition
    if (this.condition == true) {
      this.fulltime = false
      this.partTime = false
      switch (this.selectedFilter1) {
        case "Full Time":
          this.fulltime = true
          this.filterJobData = this.filterJobData.filter((x: any) => x.empType == this.selectedFilter1)
          break;

        case "Part Time":
          this.partTime = true
          this.filterJobData = this.filterJobData.filter((x: any) => x.empType == this.selectedFilter1)
          break;
      }
    }

    if (this.condition == false) {
      this.fulltime = false
      this.partTime = false
      this.removefilter()
    }
  }

  //This method will apply filter on job for you on basic of work type i.e work from home or work from office
  applyWorkFromHomeFilter(e: any) {
    this.selectedWorkFromHome = e
    this.workCondition = !this.workCondition
    if (this.workCondition == true) {
      this.filterJobData = this.filterJobData.filter((x: any) => x.workFromHome == this.selectedWorkFromHome)

    }

    if (this.workCondition == false) {

      this.removefilter()
    }

  }

  //This method will select the Job city from the master data of all cities
  selectJobCity(e: any) {
    this.selectedLocation = e
    for (let i = 0; i < this.masterLocation.length; i++) {
      if (this.selectedLocation == this.masterLocation[i])
        this.unCheckJobCity[i] = true
    }
    this.count3 = this.count3 + 1
    if (this.count3 > 1) {
      this.removefilter()
    }
    this.jobCityCondition = true
    this.strokeColor3 = "white"
    this.filterJobData = this.filterJobData.filter((x: any) => x.location[0] == this.selectedLocation)

  }

  //This method will apply filter for working shift of recemmonded jobs
  applyShiftFilter(e: any) {
    this.selectedShift = e
    this.condition1 = !this.condition1
    if (this.condition1 == true) {
      this.dayShift = false
      this.nightShift = false
      switch (this.selectedShift) {
        case "DAY":
          this.dayShift = true
          this.filterJobData = this.filterJobData.filter((x: any) => x.shift == this.selectedShift)
          break;

        case "NIGHT":
          this.nightShift = true
          this.filterJobData = this.filterJobData.filter((x: any) => x.shift == this.selectedShift)
          break;
      }
    }


    if (this.condition1 == false) {
      this.dayShift = false
      this.nightShift = false
      this.removefilter()
    }

  }

  //  This method will check the salary range of selected salary in thousand,laks and crors ets.
  validateSelectedSalary(e: any) {
    this.salaryRange = e
    this.Thousands = false
    this.lakhs = false
    this.crore = false

    switch (this.salaryRange) {
      case "Thousands":
        this.Thousands = true
        this.salaryRangeFixed = "K"
        break;

      case "Lakhs":
        this.lakhs = true
        this.salaryRangeFixed = "Lk"
        break;

      case "Crore":
        this.crore = true
        this.salaryRangeFixed = "Cr"
        break;
    }

  }

  //Method to apply filter on Jobs for you on basis of salary range
  // applySalaryFilter() {
  //   this.salaryCount = this.salaryCount + 1
  //   if (this.salaryCount > 1) {
  //     if (this.salaryRange == undefined || this.salaryRange == "") {
  //       return
  //     }
  //     this.salaryCondition = true
  //     this.strokeSalary = "white"
  //     this.removefilter()
  //   } else {

  //     switch (this.salaryRange) {
  //       case "Thousands":
  //         this.salaryCondition = true
  //         this.strokeSalary = "white"
  //         this.totalSalary = this.salary * 1000
  //         this.filterJobData = this.filterJobData.filter((x: any) => x.salarydto.minAnnualCTC >= 1000 && x.salarydto.minAnnualCTC <= this.totalSalary)

  //         break;

  //       case "Lakhs":
  //         this.salaryCondition = true
  //         this.strokeSalary = "white"
  //         this.totalSalary = this.salary * 100000
  //         this.filterJobData = this.filterJobData.filter((x: any) => x.salarydto.minAnnualCTC >= 100000 && x.salarydto.minAnnualCTC <= this.totalSalary)


  //         break;

  //       case "Crore":
  //         this.salaryCondition = true
  //         this.strokeSalary = "white"
  //         this.totalSalary = this.salary * 10000000
  //         this.filterJobData = this.filterJobData.filter((x: any) => x.salarydto.minAnnualCTC >= 10000000 && x.salarydto.minAnnualCTC <= this.totalSalary)

  //         break;
  //     }
  //   }
  // }
  salaryfilter(){
    this.salaryCount=this.salaryCount+1
    if(this.salaryCount>1){
      if(this.salaryRange==undefined||this.salaryRange==""){
        return
      }
      this.salaryCondition=true
        this.strokeSalary="white"
      console.log("============>",this.salaryCount)
      this.removefilter()
    } else{
  
    switch(this.salaryRange){
      case "Thousands":
        this.salaryCondition=true
        this.strokeSalary="white"
        this.totalSalary=this.salary*1000
        this.filterJobData = this.filterJobData.filter((x: any) => x.salarydto.minAnnualCTC >= 1000 && x.salarydto.minAnnualCTC <= this.totalSalary)
        console.log("=====>====>",this.filterJobData)
      
        break;
  
      case "Lakhs":
        this.salaryCondition=true
        this.strokeSalary="white"
        this.totalSalary=this.salary*100000
        this.filterJobData = this.filterJobData.filter((x: any) => x.salarydto.minAnnualCTC >= 100000 && x.salarydto.minAnnualCTC <= this.totalSalary)
        console.log("=====>====>",this.filterJobData)
      
        break;
  
       case "Crore":
        this.salaryCondition=true
        this.strokeSalary="white"
        this.totalSalary=this.salary*10000000
        this.filterJobData = this.filterJobData.filter((x: any) => x.salarydto.minAnnualCTC >= 10000000 && x.salarydto.minAnnualCTC <= this.totalSalary)
        console.log("=====>====>",this.filterJobData)
  
   
        break;
      }
    }
  }

  //Method to remove and validate the filters for diffrent sort values
  removefilter() {
    this.filterJobData = this.jobData;
    if (this.experience == true) {
      switch (this.selectedFilter) {
        case "1":
          this.fresher = true
          this.experience = true
          this.strokeColor = "white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min < 1)

          break;
        case "2":
          this.twoYears = true
          this.experience = true
          this.strokeColor = "white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min <= 2 && x.workexperienceDto.min >= 1)

          break;
        case "3":
          this.fourYears = true
          this.experience = true
          this.strokeColor = "white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min <= 4 && x.workexperienceDto.min >= 2)


          break;
        case "4":
          this.fiveYears = true
          this.experience = true
          this.strokeColor = "white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.min > 4)
          break;

      }
    }
    if (this.freshness == true) {
      switch (this.selectedFreshness) {
        case "1":
          this.all = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterJobData = this.filterJobData
          break;
        case "2":
          this.oneDay = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays < 2)
          break;
        case "3":
          this.threeDays = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays < 4)

          break;
        case "4":
          this.week = true
          this.freshness = true
          this.strokeColor2 = "white"
          this.filterJobData = this.filterJobData.filter((x: any) => x.numberOfDays < 8)
          break;

      }
    }

    if (this.jobRoleCondition == true) {
      for (let i = 0; i < this.JobRole.length; i++) {
        if (this.JobRole[i] == this.selectedFilter2) {
          this.uncheckJobRole[i] = true
        }
      }
      this.strokeColor1 = "white"
      this.filterJobData = this.filterJobData.filter((x: any) => x.role == this.selectedFilter2)
    }

    if (this.condition == true) {
      switch (this.selectedFilter1) {
        case "Full Time":
          this.fulltime = true
          this.filterJobData = this.filterJobData.filter((x: any) => x.empType == this.selectedFilter1)
          break;

        case "Part Time":
          this.partTime = true
          this.filterJobData = this.filterJobData.filter((x: any) => x.empType == this.selectedFilter1)
          break;
      }
    }
    if (this.workCondition == true) {
      this.filterJobData = this.filterJobData.filter((x: any) => x.workFromHome == this.selectedWorkFromHome)
    }

    if (this.condition1 == true) {
      switch (this.selectedShift) {
        case "DAY":
          this.dayShift = true
          this.filterJobData = this.filterJobData.filter((x: any) => x.shift == this.selectedShift)
          break;

        case "NIGHT":
          this.nightShift = true
          this.filterJobData = this.filterJobData.filter((x: any) => x.shift == this.selectedShift)
          break;
      }
    }
    if (this.jobCityCondition == true) {

      for (let i = 0; i < this.masterLocation.length; i++) {
        if (this.selectedLocation == this.masterLocation[i])
          this.unCheckJobCity[i] = true
      }

      this.strokeColor3 = "white"
      this.filterJobData = this.filterJobData.filter((x: any) => x.location[0] == this.selectedLocation)
    }
  }


  //Method to clear the previously selected data for sorting the jobs on basis of Freshness
  clearFreshness() {
    this.all = false
    this.oneDay = false
    this.threeDays = false
    this.week = false
    this.strokeColor2 = "#252525"
    this.count1 = 0
    this.freshness = false
    this.selectedFreshness = ""
    this.removefilter()
  }

  //Method to clear the previously selected data for sorting the jobs on basis of Work Experience
  clearExperience() {
    this.selectedFilter = ""
    this.fresher = false
    this.twoYears = false
    this.fourYears = false
    this.fiveYears = false
    this.experience = false
    this.strokeColor = "#252525"
    this.count = 0
    this.removefilter()

  }

  //Method to clear the previously selected data for sorting the jobs on basis of Job Roles
  clearJobRole() {
    this.uncheckJobRole.length = this.JobRole.length
    for (let i = 0; i < this.JobRole.length; i++) {
      if (this.JobRole[i] == this.selectedFilter2) {
        this.uncheckJobRole[i] = false
      }
    }
    this.jobRoleCondition = false
    this.strokeColor1 = "#252525"
    this.selectedFilter2 = ""
    this.count2 = 0
    this.removefilter()

  }

  //Method to clear the previously selected data for sorting the jobs on basis of City
  clearJobCity() {
    this.unCheckJobCity.length = this.masterLocation.length
    for (let i = 0; i < this.masterLocation.length; i++) {
      if (this.selectedLocation == this.masterLocation[i])
        this.unCheckJobCity[i] = false
    }
    this.selectedLocation = ""
    this.count3 = 0
    this.jobCityCondition = false
    this.strokeColor3 = "#252525"
    this.removefilter()
  }

  //Method to clear the previously selected data for sorting the jobs on basis of Salary
  salarypopupremovie() {
    this.Thousands = false
    this.lakhs = false
    this.crore = false
    this.salaryCondition = false
    this.strokeSalary = "#252525"
    this.salaryRange = ""
    this.salaryCount = 0
    this.salaryRangeFixed = ""
    this.salary = 0
    this.removefilter()
  }
}
