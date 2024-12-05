import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { HomeService } from '../../services/home.service';
import { OnboardingLocationService } from 'src/app/jobseeker/onboarding/services/onboarding-location.service';


@Component({
  selector: 'app-side-navbar-filter',
  templateUrl: './side-navbar-filter.component.html',
  styleUrls: ['./side-navbar-filter.component.css']
})
export class SideNavbarFilterComponent implements OnInit {

  @Input() visible3: any = false;
  @Output() childData = new EventEmitter<any>();

  visible33: any = false;
  errorMsgOflocation: string;


  closeOpen() {
    this.visible3 = !this.visible3;
    this.childData.emit(this.visible33);
  }


  isVisible: boolean = false;
  activeElement: number = 1;
  activeButton: number = 1;

  // toggleVisibility() {
  //   this.isVisible = !this.isVisible;
  // }


  toggleVisibility(element: number) {
    this.activeElement = element;
    this.activeButton = element
  }

  id: string | null;

  constructor(private FilterService: FilterService,private api: HomeService,locationService:OnboardingLocationService) { 
    this.id = localStorage.getItem('profileID');
  }

  ngOnInit(): void {

    this.getCity();
    this.getJobRole();
    this.getindustries();
    this.getEmploymenttype();
    this.getPromotedJob();
    this.getJobsForYou();
  }

  experienceLevel = [
    "Fresher",
    "1 - 2 Years",
    "2 - 4 Years",
    "More Then 5 Years"
  ]
  freshness = [
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
  // employmentType = [
  //   "Any",
  //   "Full Time",
  //   "Part Time",


  // ]
  shiftType = [
   
    { name: 'Any', value: 'DAY',checked: false },
    { name: 'Day shift', value: 'DAY', checked: false },
    { name: 'Night shift', value: 'NIGHT', checked: false },
  ]



  // Location = [
  //   "Mumbai",
  //   "Delhi",
  //   "Kolkata",
  //   "Bangalore",
  //   "Chennai",
  //   "Hyderabad",
  //   "Ahmedabad",
  //   "Pune",
  //   "Surat",
  //   "Jaipur",
  //   "Lucknow",
  //   "Kanpur",
  //   "Nagpur",
  //   "Visakhapatnam",
  //   "Bhopal",
  //   "Patna",
  //   "Ludhiana",
  //   "Agra",
  //   "Nashik",
  //   "Vadodara",
  //   "Kolkata",
  //   "Bangalore",
  //   "Chennai",
  //   "Hyderabad",
  //   "Ahmedabad",
  //   "Pune",
  //   "Surat",
  //   "Jaipur",
  //   "Lucknow",
  //   "Kanpur",
  //   "Nagpur",
  //   "Visakhapatnam",
  //   "Bhopal",
  //   "Patna",
  //   "Ludhiana",
  //   "Agra",
  //   "Nashik",
  //   "Vadodara",

  // ];
  
  jobCities: any = [];
  // getLocation() {
  //   this.FilterService.getLocation().subscribe((data) => {
  //     this.jobCities = data;
  //     this.masterLocationCopy = this.jobCities
      // this.LocationSearch();
  //   });
  // }
  masterLocationCopy: any = [];
  masterLocation: any = [];
  getCity() {
    this.FilterService.getLocation().subscribe(data => {
      this.masterLocation = data;
      this.masterLocationCopy = data;
    })
  }



  searchCitys(e:any){
    this.masterLocation = [...this.masterLocationCopy.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.jobCities.length == 0) {
      this.errorMsgOflocation = 'assets/images/amico.svg';
    } else {
      this.errorMsgOflocation = '';
    }
  }


  // jobRoles: any = [
  //   "Software Developer",
  //   "Project Manager",
  //   "Marketing Manager",
  //   "Data Analyst",
  //   "Sales Representative",
  //   "Human Resources Manager",
  //   "Accountant",
  //   "Graphic Designer",
  //   "Content Writer",
  //   "Customer Service Representativ",
  //   "Financial Analyst",
  //   "Operations Manager",
  //   "Web Developer",
  //   "Product Manager",
  //   'Business Analyst',
  //   "UX/UI Designer",
  //   "Network Administrator",
  //   "Legal Assistant",
  //   "Healthcare Provider",
  //   "Teacher"
  // ];

  jobRoles: any = [];
  getJobRole() {
    this.FilterService.togetJobRole().subscribe((data) => {
      this.jobRoles = data;
      // this.JobRoleSearch();
      this.searchJobRoles = this.jobRoles;
    });
  }

  searchJobRoles: any;

  JobRoleSearch1(e:any) {
    console.log("======>",e.value)
    this.jobRoles = [...this.searchJobRoles.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.jobRoles.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }
  

  // industryies: any = [
  //   "Technology",
  //   "Healthcare",
  //   "Finance",
  //   "Retail",
  //   "Manufacturing",
  //   "Energy",
  //   "Hospitality",
  //   "Construction",
  //   "Education",
  //   "Agriculture",
  //   "Transportation",
  //   "Media",
  //   "Real Estate",
  //   "Legal",
  //   "Consulting",
  //   "Nonprofit",
  //   "Government",
  //   "Aerospace",
  //   "Telecommunications",
  //   "Insurance"
  // ];

  industryType: any = [];
  searchIndustry:any;

  getindustries() {
    this.FilterService.getIndustryMasterData().subscribe((data: any) => {
      this.industryType = data;
      this.searchIndustry = this.industryType
    });
  }

  industrySearch(e:any) {
    console.log("======>",e.value)
    this.industryType = [...this.searchIndustry.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    if (this.industryType.length == 0) {
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


  searchDepartment:any;
  errorMsgOfskills: string;
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



  promotedJobsCount:number=0
  location1: string = '';
  promo: any[] = [];
  data: any; 
  filterPromoData: any[];
  currentdate: any;
  posteddate: any;
  difference: number;
  days: number;

  getPromotedJob() {

    this.api.getPromotedJobs(this.id).subscribe((data: any) => {
      this.promo = data;
      this.currentdate = new Date()
      for(let i=0;i<this.promo.length;i++){
        this.posteddate=  new Date(this.promo[i].postedDate)       
        this.difference = Math.floor(this.currentdate - this.posteddate)
        this.days = Math.floor((this.difference / (1000 * 3600 * 24)));
        this.promo[i].numberOfDays=this.days
      }
      this.filterPromoData=this.promo
      this.promotedJobsCount = this.promo.length;
      console.log("promoted jobs are working", this.promo)
      console.log("$$$$$$$$$$$$$$", this.data[1].locations[0].city)

      for (var value of this.data[1].locations[0].city) {
        this.location1 = this.location1 + value;
      }
      console.log("promoted location=======>>>>", this.location1)
    });
  }

  recommend: any;
  jobData: any = [];
  filterJobData: any;
  homeJobs: any;
  location: string = '';

  getJobsForYou() {

    this.id = localStorage.getItem('profileID');
    this.api.getRecommendedJobs(this.id).subscribe((data: any) => {
      this.recommend = data;
      this.jobData = this.recommend
      this.currentdate = new Date()
      for(let i=0;i<this.jobData.length;i++){
        this.posteddate=  new Date(this.jobData[i].postedDate)       
        this.difference = Math.floor(this.currentdate - this.posteddate)
        this.days = Math.floor((this.difference / (1000 * 3600 * 24)));
        this.jobData[i].numberOfDays=this.days
      }
      console.log("===========>jobs for you",this.jobData)
      this.filterJobData = this.jobData;
      this.allJobData = this.filterJobData;
      this.FilterService.setFilteredData(this.filterJobData);
      this.homeJobs = this.jobData.slice(0, 5)
      for (var value of this.jobData[1].locations[0].city) {
        this.location = this.location + value;
      }
    });
  }




  ExperienceFilter:any;
  Fresher:any;
  fiveYears:any;
  twoYears:any;
  fourYears:any;
  expCount:number=0;
  experience: boolean;

  experienceFilter(e: any) {
    this.ExperienceFilter = e
    this.Fresher=false
    this.twoYears=false
    this.fourYears=false
    this.fiveYears=false

    this.expCount=this.expCount+1

    if(this.expCount>1){
      console.log("========>?")
      this.removeMasterfilter();
      this.removeMasterfilter1();
    }
  else{
    switch (this.ExperienceFilter) {   
      case "1":
        this.Fresher=true
        this.experience=true
        this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.minExp < 1)
        console.log("======>", this.filterPromoData)
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp < 1)
        console.log("======> Jobs for you", this.filterJobData)
        this.FilterService.setFilteredData(this.filterJobData);
        break;
      case "2":
        this.twoYears=true
        this.experience=true
        this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.minExp <= 2 && x.workexperienceDto.minExp >= 1)
        console.log("======>", this.filterPromoData)
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp <= 2 && x.workexperienceDto.minExp >= 1)
        console.log("======> Jobs for you", this.filterJobData);
        this.FilterService.setFilteredData(this.filterJobData);
        break;
      case "3":
        this.fourYears=true
        this.experience=true
        this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.minExp <= 4 && x.workexperienceDto.minExp >= 2)
        console.log("======>", this.filterPromoData)
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp <= 4 && x.workexperienceDto.minExp >= 2)
        console.log("======> Jobs for you", this.filterJobData);
        this.FilterService.setFilteredData(this.filterJobData);
        break;
      case "4":
        this.fiveYears=true
        this.experience=true
        this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.minExp > 4)
        console.log("======>", this.filterPromoData)
        this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp > 4)
        console.log("======> Jobs for you", this.filterJobData);
        this.FilterService.setFilteredData(this.filterJobData);
        break;
     
    }
  }

  }

  seclectedJobRole:any;
  jobrolecount:number=0;
  jobrolecondition: boolean=false;
  uncheckjobrole: any=[];
  uncheckjobcity: any=[];


  jobRoleFilter(e: any) {
    this.seclectedJobRole = e
    for(let i=0;i<this.jobRoles.length;i++){
      if(this.jobRoles[i]==this.seclectedJobRole){
        this.uncheckjobrole[i]=true
      }
    }
    this.jobrolecount=this.jobrolecount+1
    if(this.jobrolecount>1){
      console.log("========>?")
      this.removeMasterfilter()
      this.removeMasterfilter1()
    }
    this.filterPromoData = this.filterPromoData.filter((x: any) => x.role == this.seclectedJobRole)
    console.log("======>", this.filterPromoData)
    this.filterJobData = this.filterJobData.filter((x: any) => x.role == this.seclectedJobRole)
    console.log("======> Jobs for you", this.filterJobData);
    this.FilterService.setFilteredData(this.filterJobData);
    this.jobrolecondition=true
  
   }
   selectedLocation: any;
   count3:number=0;
   jobCityCondition: boolean = false;
   unCheckJobCity: any = [];
   selectJobCity(e: any) {
    this.selectedLocation = e
    for (let i = 0; i < this.masterLocation.length; i++) {
      if (this.selectedLocation == this.masterLocation[i])
        this.unCheckJobCity[i] = true
    }
    this.count3 = this.count3 + 1
    // if (this.count3 > 1) {
    //   this.removefilter()
    // }
    // this.jobCityCondition = true
    // this.strokeColor3 = "white"
    // this.filterJobData = this.filterJobData.filter((x: any) => x.location[0] == this.selectedLocation)

  }

   seclectedJobCity:any;
   jobcitycount:number=0;
   jobcitycondition: boolean=false;

   jobCityFilter(e: any) {
     this.seclectedJobCity = e
     for(let i=0;i<this.jobCities.length;i++){
       if(this.jobCities[i]==this.seclectedJobCity){
         this.uncheckjobcity[i]=true
       }
     }
     this.jobcitycount=this.jobcitycount+1
     if(this.jobcitycount>1){
       console.log("========>?")
       this.removeMasterfilter()
       this.removeMasterfilter1()
     }
    //  this.filterPromoData = this.filterPromoData.filter((x: any) => x.locations[0]?.city.slice(0, 1) == this.seclectedJobCity.slice(0, 1))
     this.filterPromoData = this.filterPromoData.filter((x: any) => x.locations == this.seclectedJobCity)
     console.log("======>", this.filterPromoData)
    //  this.filterJobData = this.filterJobData.filter((x: any) => x.locations[0]?.city.slice(0, 1) == this.seclectedJobCity.slice(0, 1))
     this.filterJobData = this.filterJobData.filter((x: any) => x.locations == this.seclectedJobCity)
     console.log("======> Jobs for you", this.filterJobData);
     this.FilterService.setFilteredData(this.filterJobData);
     this.jobcitycondition=true
   
    }



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
       console.log("========>?")
       this.removeMasterfilter();
       this.removeMasterfilter1();
     }
     this.filterPromoData = this.filterPromoData.filter((x: any) => x.englishFluency == this.seclectedFluency)
     console.log("======>", this.filterPromoData)
     this.filterJobData = this.filterJobData.filter((x: any) => x.englishFluency == this.seclectedFluency)
     console.log("======> Jobs for you", this.filterJobData);
     this.FilterService.setFilteredData(this.filterJobData);
   
    //  if (this.seclectedFluency == "no English") {
    //   this.filterPromoData = this.filterPromoData.filter((x: any) => x.englishFluency == null);
    // } else {
    //   this.filterPromoData = this.filterPromoData.filter((x: any) => x.englishFluency == this.seclectedFluency);
    // }
    this.jobfluencycondition=true

    }
 


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
        console.log("========>?")
        this.removeMasterfilter();
        this.removeMasterfilter1();
      }
      this.filterPromoData = this.filterPromoData.filter((x: any) => x.industry == this.seclectedIndustry)
      console.log("======>", this.filterPromoData)
      this.filterJobData = this.filterJobData.filter((x: any) => x.industry == this.seclectedIndustry)
      console.log("======> Jobs for you", this.filterJobData);
      this.FilterService.setFilteredData(this.filterJobData);
      this.industrycondition=true
    
     }
 


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
         console.log("========>?")
         this.removeMasterfilter();
         this.removeMasterfilter1();
       }
       this.filterPromoData = this.filterPromoData.filter((x: any) => x.empType == this.seclectedEmpType)
       console.log("======>", this.filterPromoData)
       this.filterJobData = this.filterJobData.filter((x: any) => x.empType == this.seclectedEmpType)
       console.log("======> Jobs for you", this.filterJobData);
       this.FilterService.setFilteredData(this.filterJobData);
       this.emplTpyecondition=true
     
      }
  


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
          this.removeMasterfilter1();
          this.removeMasterfilter();
        }
        
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.shift == this.seclectedShiftType)
          console.log("======>", this.filterPromoData)
          this.filterJobData = this.filterJobData.filter((x: any) => x.shift == this.seclectedShiftType)
          console.log("======> Jobs for you", this.filterJobData);
          this.FilterService.setFilteredData(this.filterJobData);
          this.shiftcondition=true
      
       }
  
       



       
       removeMasterfilter(){
        this.filterPromoData=this.promo;
        this.filterJobData = this.jobData;
        if(this.experience==true){
          switch (this.ExperienceFilter) {   
            case "1":
              this.Fresher=true
              this.experience=true
              this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.minExp < 1)
              console.log("======>", this.filterPromoData)
              break;
            case "2":
              this.twoYears=true
              this.experience=true
              this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.minExp <= 2 && x.workexperienceDto.minExp >= 1)
              console.log("======>", this.filterPromoData)
              break;
            case "3":
              this.fourYears=true
              this.experience=true
              this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.minExp <= 4 && x.workexperienceDto.minExp >= 2)
              console.log("======>", this.filterPromoData)    
              break;
            case "4":
              this.fiveYears=true
              this.experience=true
              this.filterPromoData = this.filterPromoData.filter((x: any) => x.workexperienceDto.minExp > 4)
              console.log("======>", this.filterPromoData)
              break;
           
          }
        }
    
        if(this.jobrolecondition==true){
          for(let i=0;i<this.jobRoles.length;i++){
            if(this.jobRoles[i]==this.seclectedJobRole){
              this.uncheckjobrole[i]=true
            }
          }
          this.filterPromoData = this.filterPromoData.filter((x: any) => x.role == this.seclectedJobRole)
          console.log("======>", this.filterPromoData)
        }
    
    
        if(this.jobcitycondition==true){
          for(let i=0;i<this.jobCities.length;i++){
            if(this.jobCities[i]==this.seclectedJobCity){
              this.uncheckjobcity[i]=true
            }
          }
          this.filterPromoData = this.filterPromoData.filter((x: any) =>  x.locations[0]?.city  == this.seclectedJobCity)
          console.log("======>", this.filterPromoData)
        }
    
    
        if(this.jobfluencycondition==true){
          for(let i=0;i<this.fluency.length;i++){
            if(this.fluency[i]==this.seclectedFluency){
              this.uncheckjobfluency[i]=true
            }
          }
          this.filterPromoData = this.filterPromoData.filter((x: any) =>  x.englishFluency  == this.seclectedFluency)
          console.log("======>", this.filterPromoData)
        }
    
    
        if(this.industrycondition==true){
          for(let i=0;i<this.industryType.length;i++){
            if(this.industryType[i]==this.seclectedIndustry){
              this.uncheckindustry[i]=true
            }
          }
          this.filterPromoData = this.filterPromoData.filter((x: any) =>  x.industry  == this.seclectedIndustry)
          console.log("======>", this.filterPromoData)
        }
    
    
    
        if(this.emplTpyecondition==true){
          for(let i=0;i<this.employmentType.length;i++){
            if(this.employmentType[i]==this.seclectedEmpType){
              this.uncheckEmpType[i]=true
            }
          }
          this.filterPromoData = this.filterPromoData.filter((x: any) =>  x.empType == this.seclectedEmpType)
          console.log("======>", this.filterPromoData)
        }
    
    
        if(this.shiftcondition==true){
          for(let i=0;i<this.shiftType.length;i++){
            if(this.shiftType[i]==this.seclectedShiftType){
              this.uncheckshift[i]=true
            }
          }
          this.filterPromoData = this.filterPromoData.filter((x: any) =>  x.shift == this.seclectedShiftType)
          console.log("======>", this.filterPromoData)
        }
    
      }


      removeMasterfilter1(){
        this.filterJobData=this.jobData
        if(this.experience==true){
          switch (this.ExperienceFilter) {   
            case "1":
              this.Fresher=true
              this.experience=true
              this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp < 1)
              console.log("======> Jobs for you", this.filterJobData);
              this.FilterService.setFilteredData(this.filterJobData);
              break;
            case "2":
              this.twoYears=true
              this.experience=true
              this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp <= 2 && x.workexperienceDto.minExp >= 1)
              console.log("======> Jobs for you", this.filterJobData);
              this.FilterService.setFilteredData(this.filterJobData);
              break;
            case "3":
              this.fourYears=true
              this.experience=true
              this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp <= 4 && x.workexperienceDto.minExp >= 2)
              console.log("======> Jobs for you", this.filterJobData);
              this.FilterService.setFilteredData(this.filterJobData);
      
              break;
            case "4":
              this.fiveYears=true
              this.experience=true
              this.filterJobData = this.filterJobData.filter((x: any) => x.workexperienceDto.minExp > 4)
              console.log("======> Jobs for you", this.filterJobData);
              this.FilterService.setFilteredData(this.filterJobData);
              break;
           
          }
        }
    
        if(this.jobrolecondition==true){
          for(let i=0;i<this.jobRoles.length;i++){
            if(this.jobRoles[i]==this.seclectedJobRole){
              this.uncheckjobrole[i]=true
            }
          }
          this.filterJobData = this.filterJobData.filter((x: any) => x.role == this.seclectedJobRole)
          console.log("======> Jobs for you", this.filterJobData);
          this.FilterService.setFilteredData(this.filterJobData);
        }
    
    
        if(this.jobcitycondition==true){
          for(let i=0;i<this.jobCities.length;i++){
            if(this.jobCities[i]==this.seclectedJobCity){
              this.uncheckjobcity[i]=true
            }
          }
          this.filterJobData = this.filterJobData.filter((x: any) =>  x.locations[0]?.city  == this.seclectedJobCity)
          console.log("======> Jobs for you", this.filterJobData);
          this.FilterService.setFilteredData(this.filterJobData);
        }
    
    
        if(this.jobfluencycondition==true){
          for(let i=0;i<this.fluency.length;i++){
            if(this.fluency[i]==this.seclectedFluency){
              this.uncheckjobfluency[i]=true
            }
          }
          this.filterJobData = this.filterJobData.filter((x: any) =>  x.englishFluency  == this.seclectedFluency)
          console.log("======> Jobs for you", this.filterJobData);
          this.FilterService.setFilteredData(this.filterJobData);
        }
    
    
        if(this.industrycondition==true){
          for(let i=0;i<this.industryType.length;i++){
            if(this.industryType[i]==this.seclectedIndustry){
              this.uncheckindustry[i]=true
            }
          }
          this.filterJobData = this.filterJobData.filter((x: any) =>  x.industry  == this.seclectedIndustry)
          console.log("======> Jobs for you", this.filterJobData);
          this.FilterService.setFilteredData(this.filterJobData);
        }
    
    
    
        if(this.emplTpyecondition==true){
          for(let i=0;i<this.employmentType.length;i++){
            if(this.employmentType[i]==this.seclectedEmpType){
              this.uncheckEmpType[i]=true
            }
          }
          this.filterJobData = this.filterJobData.filter((x: any) =>  x.empType == this.seclectedEmpType)
          console.log("======> Jobs for you", this.filterJobData);
          this.FilterService.setFilteredData(this.filterJobData);
        }
    
    
        if(this.shiftcondition==true){
          for(let i=0;i<this.shiftType.length;i++){
            if(this.shiftType[i]==this.seclectedShiftType){
              this.uncheckshift[i]=true
            }
          }
          this.filterJobData = this.filterJobData.filter((x: any) =>  x.shift == this.seclectedShiftType)
          console.log("======> Jobs for you", this.filterJobData);
          this.FilterService.setFilteredData(this.filterJobData);
        }
    
      }


      
   // Assume you have a copy of the original data in 'allJobData'
// Make sure to set this variable when you first load or fetch the data.
allJobData: any[] = []; // Replace 'any[]' with the appropriate type of your data.

// Function to clear both filt
clearFilters() {
  this.ExperienceFilter = null;
  this.Fresher = false;
  this.twoYears = false;
  this.fourYears = false;
  this.fiveYears = false;
  this.expCount = 0;

  this.uncheckjobrole.length=this.jobRoles.length
   
  for(let i=0;i<this.jobRoles.length;i++){
    if(this.jobRoles[i]==this.seclectedJobRole){
      this.uncheckjobrole[i]=false
    }
  }
  this.jobrolecondition=false
  this.seclectedJobRole = ""
  this.jobrolecount=0



  this.uncheckjobcity.length=this.jobCities.length
   
  for(let i=0;i<this.jobCities.length;i++){
    if(this.jobCities[i]==this.seclectedJobCity){
      this.uncheckjobcity[i]= false;
    }
  }
  this.jobcitycondition=false
  this.seclectedJobCity = ""
  this.jobcitycount=0



  this.uncheckjobfluency.length=this.fluency.length
   
  for(let i=0;i<this.fluency.length;i++){
    if(this.fluency[i]==this.seclectedFluency){
      this.uncheckjobfluency[i]=false
    }
  }
  this.jobfluencycondition=false
  this.seclectedFluency = ""
  this.jobenglishFluency=0



  
  this.uncheckindustry.length=this.industryType.length
   
  for(let i=0;i<this.industryType.length;i++){
    if(this.industryType[i]==this.seclectedIndustry){
      this.uncheckindustry[i]=false
    }
  }
  this.industrycondition=false
  this.seclectedIndustry = ""
  this.industrycount=0



  
  this.uncheckEmpType.length=this.employmentType.length
   
  for(let i=0;i<this.employmentType.length;i++){
    if(this.employmentType[i]==this.seclectedEmpType){
      this.uncheckEmpType[i]=false
    }
  }
  this.emplTpyecondition=false
  this.seclectedEmpType = ""
  this.empTypecount=0




  this.uncheckshift.length=this.shiftType.length
   
  for(let i=0;i<this.shiftType.length;i++){
    if(this.shiftType[i]==this.seclectedShiftType){
      this.uncheckshift[i]=false
    }
  }
  this.shiftcondition=false
  this.seclectedShiftType = ""
  this.shiftcount=0


  // Reset other filter-related variables as needed

  // Restore the original data by copying it back to the filterJobData array
  this.filterJobData = [...this.allJobData];
  console.log("after clear all filter",this.filterJobData);
  this.FilterService.setFilteredData(this.filterJobData);
  
}


}
