/*
Name: Muhammad Zmain
What: This is the controller ts file to Applied Jobs in the Jobseeker module.
Why: This is provided to Jobseeker have to see the user all applied jobs in applied jobs component
*/

// 1. Imports - Angular Framework - Mandatory
import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// 2. Imports - to share jobs application
import { Share } from '@capacitor/share';

// 3. Imports - Applied jobs Services - Mandatory
import { DashboardJobsService } from 'src/app/jobseeker/dashboard/services/dashboard-jobs.service';
import { ProfileJobPreferenceService } from 'src/app/jobseeker/dashboard/components/jobseeker-profile/Services/profile-job-preference.service';
import { HomeService } from 'src/app/jobseeker/dashboard/services/home.service';


// Define a component with the following metadata settings
@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css']
})

// 10. Module Variables - Optional
//None

// 11. Module Methods - Optional
//None

// 12. Class - Mandatory
//Class to JobsComponemet. This class represents the component with form elements and actions to add a new client into the system
export class JobDescriptionComponent implements OnInit {

  // Declare a variable type (it can hold values of any type)
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  buttonName: any = 'show';
  show: boolean = false;
  tick: boolean = false;
  isApplied: boolean = false;
  existUser: string = '';
  id: string | null;
  id1: any = 'profileId';
  jobdetails: any;
  jobData: any;
  recommend: any;
  location: string = '';
  promo: any;
  loc: any = [];
  locat: any;
  jobRole: any;
  underline1: boolean = true;
  underline2: boolean = false;
  underline3: boolean = false;
  underline4: boolean = false;
  value: number;
  semiCir: number = 40;
  semiCir1: number = 60;
  semiCir2: number = 80;
  semicircle = "rotate(" + (45 + (this.semiCir * 1.8)) + "deg)"
  semicircle1: any;
  semicircle2: any;
  profilevalue: any;
  requirementId: any;
  height: any;
  Ids: any;
  ApplicantCountstatus: any;
  isPopupVisible: boolean;
  isEasyApply = false
  profileID: any;
  message11 = ''
  messsage12 = ''
  Jobid: number;
  Check: any;
  QuestionLength: number = 0;
  sharingInProgress = false;
  message: any;
  jobProfileSkills: string[] = []; // Replace with your actual job profile skills
  jobId: any;
  skills: any;
  jobSeekerProfileSkills: any = []; // Replace with the job seeker's actual skills
  getAllAreaofIntersets: any;
  url1: string = '';
  jobProfileLocations: string[] = []; // Replace with your actual job profile locations
  jobProfileInterests: string[] = []; // Replace with your actual job profile interests
  jobSeekerInterests: string[] = []; // Replace with the job seeker's actual interests
  getAllLocation: any = [];
  jobSeekerLocations: string[] = [];
  primaryL: any;
  secondryL: any;
  otherL: any = [];
  data: any;

  // A class with nessary injector like DashboardJobsService, ProfileJobPreferenceService etc.
  constructor(private job: DashboardJobsService, private jobPreference: ProfileJobPreferenceService, private dashboardJobsService: DashboardJobsService,
    private api: HomeService, private router: ActivatedRoute, private location1: Location, private route: Router) { }

  //. It is a event method to action
  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      this.requirementId = params.requirementId;
    });
    // this.getproJobs();
    this.getForSkills();
    this.ApplicantCount();
    this.allareaofInterest();
    this.getLocation();
    this.requirementDetails();
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
    this.router.queryParams.subscribe((res: any) => {
      this.jobId = res.requirementId;
    });
  }

  // This method is used to navigate the user back to the previous location in the app history
  goBack(): void {
    this.location1.back();
  }

  // Declare a ViewChild with the selector
  @ViewChild('myDiv', { static: true }) myDiv: ElementRef;
  ngAfterViewInit() {
    this.height = this.myDiv.nativeElement.offsetHeight;
  }

  // easy apply open the popup
  easyApply() {
    this.isEasyApply = !this.isEasyApply;
  }

  //Function written to display the number of total applicants applied for that particular jobs
  ApplicantCount() {
    this.Ids = this.requirementId
    this.dashboardJobsService.getApplicantCount(this.Ids).subscribe((data: any) => {
      console.warn("data", data);
      this.ApplicantCountstatus = data;
      console.log('Applied Jobs Worlking:', data);

    });
  }
  // Functional Methods
  // The below method is used to open the popup with jobid to save that jobs
  openSavedJobsPopup(Jobid: any, saved: any) {
    this.Jobid = Jobid;
    this.Check = saved;
    this.checkSave(saved)
    this.isPopupVisible = true;
  }

  // This function close saved jobs popup
  closeSavedJobsPopup() {
    this.isPopupVisible = false;
  }

  // Functional Methods
  // The below method is used to display the message saved and unsaved job
  checkSave = (con: any) => {
    if (con) {
      this.message11 = 'Unsaved'
      this.messsage12 = 'Are you want to unsave the job'
    } else {
      this.message11 = 'Saved'
      this.messsage12 = 'Are you want to Save the job'
    }
  }

  // Define a function named 'redHeart'
  redHeart = () => {
    this.profileID = localStorage.getItem('profileID');
    // Check if 'this.Check' is true
    if (this.Check) {
      // If 'this.Check' is true, call the 'unsaved' method on the 'home' service
      this.api.unsaved(this.profileID, this.Jobid).subscribe({
        next: (res: any) => {
          // Handle the successful response from the 'unsaved' method
          // Call several other methods to update data
          this.requirementDetails()
        }, error: (error: any) => {
          // Handle errors and log a message
        }
      })
    } else {
      // If 'this.Check' is false, call the 'postSaved' method on the 'home' service
      this.api.postSaved(this.profileID, this.Jobid, this.Check).subscribe({
        next: (res: any) => {
          // Handle the successful response from the 'postSaved' method
          // Call several other methods to update data
          this.requirementDetails()
        }, error: (error: any) => {
          // Handle errors and log a message
        }
      })
    }
  }

  // Define a method named 'goDown1'
  goDown1() {
    // Get a reference to the 'Job_Details' element by its ID
    const Job_Details = document.getElementById('Job_Details');
    // Check if the 'Job_Details' element exists
    if (Job_Details) {
      // Set flags to indicate which underline should be active (assumed for navigation UI)
      this.underline1 = true; // Indicates the first underline is active
      this.underline2 = false; // Indicates the second underline is inactive
      this.underline3 = false; // Indicates the third underline is inactive
      this.underline4 = false; // Indicates the fourth underline is inactive

      // Scroll the 'Job_Details' element into view smoothly
      Job_Details.scrollIntoView({
        behavior: 'smooth', // Apply smooth scrolling animation
        block: 'start',     // Scroll to the top of the 'Job_Details' element
      });
    }
  }

  // Define a method named 'goDown2'
  goDown2() {
    // Get a reference to the 'Job_Insights' element by its ID
    const Job_Insights = document.getElementById('Job_Insights');

    // Check if the 'Job_Insights' element exists
    if (Job_Insights) {
      // Set flags to indicate which underline should be active (assumed for navigation UI)
      this.underline1 = false; // Indicates the first underline is inactive
      this.underline2 = true;  // Indicates the second underline is active
      this.underline3 = false; // Indicates the third underline is inactive
      this.underline4 = false; // Indicates the fourth underline is inactive
      // Scroll the 'Job_Insights' element into view smoothly
      Job_Insights.scrollIntoView({
        behavior: 'smooth', // Apply smooth scrolling animation
        block: 'start',     // Scroll to the top of the 'Job_Insights' element
      });
    }
  }

  // Define a method named 'goDown3'
  goDown3() {
    // Get a reference to the 'About_Company' element by its ID
    const About_Company = document.getElementById('About_Company');
    // Check if the 'About_Company' element exists
    if (About_Company) {
      // Set flags to indicate which underline should be active (assumed for navigation UI)
      this.underline1 = false; // Indicates the first underline is inactive
      this.underline2 = false; // Indicates the second underline is inactive
      this.underline3 = true;  // Indicates the third underline is active
      this.underline4 = false; // Indicates the fourth underline is inactive
      // Scroll the 'About_Company' element into view smoothly
      About_Company.scrollIntoView({
        behavior: 'smooth', // Apply smooth scrolling animation
        block: 'start',     // Scroll to the top of the 'About_Company' element
      });
    }
  }

  // Define a method named 'goDown4'
  goDown4() {
    // Get a reference to the 'Salary_Insights' element by its ID
    const Salary_Insights = document.getElementById('Salary_Insights');
    // Check if the 'Salary_Insights' element exists
    if (Salary_Insights) {
      // Set flags to indicate which underline should be active (assumed for navigation UI)
      this.underline1 = false; // Indicates the first underline is inactive
      this.underline2 = false; // Indicates the second underline is inactive
      this.underline3 = false; // Indicates the third underline is inactive
      this.underline4 = true;  // Indicates the fourth underline is active
      // Scroll the 'Salary_Insights' element into view smoothly
      Salary_Insights.scrollIntoView({
        behavior: 'smooth', // Apply smooth scrolling animation
        block: 'start',     // Scroll to the top of the 'Salary_Insights' element
      });
    }
  }

  // Define a method named 'requirementDetails'
  requirementDetails() {
    // Get the 'profileID' from local storage
    this.id = localStorage.getItem('profileID');
    // Use the 'job' service to fetch requirement details using 'id' and 'requirementId'
    this.job.getReqDetails(this.id, this.requirementId).subscribe((data: any) => {
      // Store the fetched requirement details in 'jobdetails'
      this.jobdetails = data;
      // Extract and store specific details from 'jobdetails'
      this.jobRole = this.jobdetails.role;
      this.value = this.jobdetails.matchingPercentage;
      // Use the 'api' service to fetch similar jobs based on 'id' and 'jobRole'
      this.api.getSimilarJobs(this.id, this.jobRole).subscribe((data: any) => {
        // Store the fetched similar jobs data in 'jobData'
        this.jobData = data;
        // Store 'jobData' in 'recommend' (assuming it represents recommended jobs)
        this.recommend = this.jobData;
        // Iterate through the 'location' data in 'data[1]' (assuming it's an array)
        for (var value of this.data[1].location[0]) {
          // Concatenate 'value' to 'location1'
          this.location1 = this.location1 + value;
        }
      });
    });
  }

  // Define a method named 'jobrole'
  jobrole() {
    // Store the value of 'this.jobRole' in the 'role' key of local storage
    localStorage.setItem("role", this.jobRole);
  }



  // This function is get all promoted jobs
  getPromotedJob() {
    this.api.getPromotedJobs(this.requirementId).subscribe((data: any) => {
      this.promo = data;
      this.jobProfileSkills = this.promo.musthavekeywords;
      this.jobProfileInterests = this.promo.industry;
      this.jobProfileLocations = this.promo.locations;
      if (this.promo.locations.length > 0) {
        this.message = this.promo.locations;
      } else {
        this.message = 'NA';
      }
      this.calculateSkillMatchPercentage();
    });
  }

  // Define an Input property named 'progressValue' with a default value of 100
  @Input() progressValue: number = 100;

  // Define a method named 'getRotation'
  getRotation(): string {
    // Calculate the rotation angle based on the 'progressValue'
    const rotationAngle = (180 * this.progressValue) / 100;
    // Return a string with a CSS 'rotate' transformation based on the calculated angle
    return `rotate(${rotationAngle}deg)`;
  }

  // This function to get jobs based on skill
  getForSkills() {
    this.id = localStorage.getItem('profileID');
    this.dashboardJobsService.Selectedskills(this.id).subscribe((data) => {
      this.skills = data;
      this.jobSeekerProfileSkills = this.skills.map((x: any) =>
        x.skillName);
    });
  }

  // Define a method named 'getSkillClass'
  getSkillClass(skill: string): string {
    // Check if 'skill' is included in 'jobProfileSkills' array
    return this.jobProfileSkills.includes(skill)
      ? 'text-green-600' // If 'skill' is included, return 'text-green-600' (a CSS class for green text)
      : 'text-red-600';  // If 'skill' is not included, return 'text-red-600' (a CSS class for red text)
  }

  // Define a method named 'calculateSkillMatchPercentage'
  calculateSkillMatchPercentage(): number {
    // Get the total number of skills in the job seeker's profile
    const totalSkills = this.jobSeekerProfileSkills.length;
    // Initialize a variable to count the number of matching skills
    let matchingSkills = 0;
    // Iterate through each skill in the job seeker's profile
    for (const skill of this.jobSeekerProfileSkills) {
      // Check if the skill is included in the job profile's skills
      if (this.jobProfileSkills.includes(skill)) {
        // If the skill is found in both profiles, increment the matchingSkills count
        matchingSkills++;
      }
    }
    // Calculate the skill match percentage as a ratio of matching skills to total skills
    const skillMatchPercentage = (matchingSkills / totalSkills) * 100;
    // Calculate the rotation angle for a semicircle representation based on the skill match percentage
    this.semicircle1 = "rotate(" + (45 + (skillMatchPercentage * 1.8)) + "deg)";
    // Return the calculated skill match percentage as a number
    return skillMatchPercentage;
  }

  // Define a method named 'allareaofInterest'
  allareaofInterest() {
    // Get the 'profileID' from local storage
    this.id = localStorage.getItem('profileID');
    // Use the 'areaOfInterest' method from the 'jobPreference' service to fetch job seeker's area of interest
    this.jobPreference.areaOfInterest(this.id).subscribe((resp) => {
      // Store the response data in 'getAllAreaofIntersets'
      this.getAllAreaofIntersets = resp;
      // Extract the 'areaOfInterestName' property from the response
      this.jobSeekerInterests = this.getAllAreaofIntersets.areaOfInterestName;
      // Map the response data to create an array of 'areaOfInterestName'
      this.jobSeekerInterests = this.getAllAreaofIntersets.map((y: any) =>
        y.areaOfInterestName
      );
    });
  }

  // Define a method named 'getInterestClass'
  getInterestClass(interest: string): string {
    // Check if 'interest' is included in 'jobProfileInterests' array
    return this.jobProfileInterests.includes(interest)
      ? 'text-green-600' // If 'interest' is included, return 'text-green-600' (a CSS class for green text)
      : 'text-red-600';  // If 'interest' is not included, return 'text-red-600' (a CSS class for red text)
  }

  // This function writen by to calculate intrest of mathing percentage
  calculateInterestMatchPercentage(): number {
    const totalInterest = this.jobSeekerInterests.length;
    let matchingInterest = 0;
    for (const interest of this.jobSeekerInterests) {
      if (this.jobProfileInterests.includes(interest)) {
        matchingInterest++;
      }
    }
    const totalLocation = this.jobSeekerLocations.length;
    let matchingLocation = 0;
    for (const location of this.jobSeekerLocations) {
      if (this.jobProfileLocations.includes(location)) {
        matchingLocation++;
      }
    }
    const interestMatchPercentage = ((matchingInterest + matchingLocation) / (totalInterest + totalLocation)) * 100;
    this.semicircle2 = "rotate(" + (45 + (interestMatchPercentage * 1.8)) + "deg)"
    return interestMatchPercentage;
  }

  //  This function writen by to get user all prefered location
  getLocation() {
    this.id = localStorage.getItem('profileID');
    this.jobPreference.prefLocation(this.id).subscribe((resp) => {
      this.getAllLocation = resp;
      this.primaryL = this.getAllLocation.primaryLocation;
      this.secondryL = this.getAllLocation.secondaryLocation;
      this.otherL = this.getAllLocation.otherPreferedLocation;
      this.jobSeekerLocations.push(this.primaryL);
      this.jobSeekerLocations.push(this.secondryL);
      this.jobSeekerLocations.push(...this.otherL);
    });
  }
  // Define a method named 'getPrimaryLocationClass'
  getPrimaryLocationClass(location: string): string {
    // Check if 'location' is included in 'jobProfileLocations' array
    return this.jobProfileLocations.includes(location)
      ? 'text-green-600' // If 'interest' is included, return 'text-green-600' (a CSS class for green text)
      : 'text-red-600';  // If 'interest' is not included, return 'text-red-600' (a CSS class for red text)
  }

  // Share a job profile by opening a sharing dialog with a predefined title, text, and URL.
  shareJob() {
    // Define the URL to share, including the 'requirementId' parameter.
    const shareUrl = 'https://jobseeker-apk.dev.jobcheck.in/dashboard/job-profile?requirementId=' + this.requirementId;
    // Use the 'Share.share' method to open a sharing dialog.
    Share.share({
      title: 'See cool stuff',             // Title of the shared content.
      text: 'Really awesome thing you need to see right meow', // Text description of the shared content.
      url: shareUrl,                      // URL to share, including the specific job profile with 'requirementId'.
      dialogTitle: 'Share with buddies',   // Title of the sharing dialog.
    });
  }

  // Fetch and populate promoted jobs data for a user's job profile.
  // getproJobs() {
  //   // Retrieve the user's profile ID from local storage.
  //   this.id = localStorage.getItem("profileID");
  //   // Call the 'getPromotedJobs2' API method with the user's profile ID and requirement ID.
  //   this.api.getPromotedJobs2(this.id, this.requirementId).subscribe((data: any) => {
  //     // Assign the fetched data to the 'promo' variable.
  //     this.promo = data;
  //     // Populate the 'jobProfileSkills', 'jobProfileInterests', and 'jobProfileLocations' arrays with data from 'promo'.
  //     this.jobProfileSkills = this.promo.musthavekeywords;
  //     this.jobProfileInterests = this.promo.industry;
  //     this.jobProfileLocations = this.promo.locations;
  //     // Set the 'message' variable based on the length of 'jobProfileLocations'.
  //     if (this.promo.locations.length > 0) {
  //       this.message = this.promo.locations;
  //     } else {
  //       this.message = 'NA';
  //     }
  //     // Calculate skill match percentage and interest match percentage.
  //     this.calculateSkillMatchPercentage();
  //     this.calculateInterestMatchPercentage();
  //   });
  // }

  //Apply for a job and navigate to the '/jobs' route upon completion.

  apply() {
    // Retrieve the user's profile ID from local storage.
    this.id = localStorage.getItem("profileID");
    // Call the 'myApply' API method with the user's profile ID, job ID, and 'promo' data.
    this.api.applyJob(this.id, this.jobId, this.promo).subscribe((res: any) => {
      this.isApplied = true;
    });
    // Navigate to the '/jobs' route, likely after the job application is complete.
    // this.route.navigate(['/jobs']);
  }

  // Define a method named 'CheckApply'
  CheckApply = () => {
    // Check if the 'QuestionLength' is equal to 0
    if (this.QuestionLength == 0) {
      // If there are no questions (length is zero), execute the 'easyApply' function
      this.apply();
    } else {
      // If there are questions, navigate to the 'questionaries' route with 'requirementId' as a query parameter
      this.route.navigate(['/dashboard/questionaries'], { queryParams: { requirementId: this.requirementId } });
    }
  }
}
