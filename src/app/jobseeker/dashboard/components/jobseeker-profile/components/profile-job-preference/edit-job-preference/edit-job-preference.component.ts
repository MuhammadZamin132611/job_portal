import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditJobPreferenceService } from '../services/edit-job-preference.service';
import { Location } from '@angular/common';
//import { ConsoleReporter } from 'jasmine';


@Component({
  selector: 'app-edit-job-preference',
  templateUrl: './edit-job-preference.component.html',
  styleUrls: ['./edit-job-preference.component.css']
})
export class EditJobPreferenceComponent implements OnInit {
  showLocation: boolean = false;
  showArea: boolean = false;
  showJobType: boolean = false;
  showEmployeeType: boolean = false;
  showShiftType: boolean = false;
  showSalaryType: boolean = false;
  isDivVisible: boolean = true;
  showjobRole: boolean = false;
  errorMsgOflocation: string = '';
  jobSeekerDetailsId: any;
  errorMsgOfskills: string = '';
  userLocation: locationSelect


  constructor(private router: Router, private http: HttpClient, private getApi: EditJobPreferenceService, private location: Location) {
    this.jobSeekerDetailsId = localStorage.getItem("profileID")


  }

  goBack(): void {
    this.location.back();
  }


  ngOnInit(): void {

    this.getAreaOfInterest();

    this.getNewAOI();

    this.getJobRole();

    this.getNewJobrole();

    this.getLocation();

    this.getNewLocation();

    this.getNewJobpref();

    this.matchLocation();
    
    this.matchArea();
    
    this.matchjobroles();

  }
  //Checked Jobrole
  unmatchJOB: any[] = []
  matchjobroles() {
    //   const unmatchedJobRoles = jobRole.filter(role => !newJobrole.some(job => job.jobRoleName === role));

    // console.log(unmatchedJobRoles);
    this.unmatchJOB = this.JobRole.filter((jobs: any) => !this.newJobrole.some((rol: { jobRoleName: any; }) => rol.jobRoleName === jobs))
    console.log("jobbbb")
    console.log(this.unmatchJOB, "matching jobs++ffdfd");

  
  }

  unmatchLoc: any[] = []
  matchLocation(){

    this.unmatchLoc = this.Location.filter((loc: any) => !this.newLocation2.some((loca: { locName: any; }) => loca.locName === loc))
    console.log(this.unmatchLoc, "matching loc++ffdfd");
   // this.unmatchLoc = this.Location.filter((item:any) => !this.newLocation2.includes(item));
    console.log("locccc")
    console.log("unbatch -----------------",this.unmatchLoc)
  }
  unmatchAOI: any[] = []
  matchArea(){
    console.log("aoiiiiiii")
    this.unmatchAOI = this.AreaOfInterest.filter((aoi: any) => !this.newAOI.includes(aoi))
    // this.unmatchAOI = this.AreaOfInterest.filter((aoi: any) => !this.newAOI.some((area: { areaOfInterest: any; }) => area.areaOfInterest === aoi))
    console.log("aoiiiiiii")
    console.log(this.unmatchAOI, "matching AOIII++ffdfd");

  }

  profileID: any = localStorage.getItem('profileID')
  newJobrole: any
  // newAoi:any;
  newLocation1:any;
  getNewJobrole() {
    this.getApi.getJobRole(this.jobSeekerDetailsId).subscribe((data) => {
      this.newJobrole = data;
      console.log(this.newJobrole, "------------------>JOB ROLE GETTING ")
    })
  }

  newAOI: any
  getNewAOI() {
    this.getApi.getAreaOI(this.jobSeekerDetailsId).subscribe((data) => {
      this.newAOI = data;
      console.log(this.newAOI, "------------------>Get  get area aaaaa ")
    })

  }


  getNewLoc(){
    this.getApi.getLocation().subscribe((data) => {
      this.newLocation1 = data;
      console.log(this.newLocation, "------------------>Location GETTING ")
    })
  }

  pJobRole() {
    this.getApi.postJobRole(this.profileID, this.selecetedJobRoles).subscribe((resp) => {
      console.log("data posted on job role", resp)
      this.getNewJobrole()

    },
      err => {
        console.log(err)
      })
  }

  deleteJobroles(data: any) {
    this.getApi.deleteJobrole(data, this.jobSeekerDetailsId).subscribe((resp) => {
      console.log(resp);
      this.getNewJobrole();
    });
  }

  pAOI() {

    console.log("print objectinarray", this.selecetedAreaOfInterests)
    this.getApi.postAreaofInterest(this.profileID, this.selecetedAreaOfInterests).subscribe((resp) => {
      this.getNewAOI()
      console.log("Posted AOI sdfghjtykulio;poiouikyujtyhrgt", resp);
      //this.getNewAOI()
    })
  }

  deleteAOI(data: any) {
    const encodedItemName = encodeURIComponent(data);
    this.getApi.deleteAreaofinterest(encodedItemName, this.jobSeekerDetailsId).subscribe((resp) => {
      console.log(resp);
      this.getNewAOI();
    },
      err => {
        this.getNewAOI();
        console.log(err, "delete AOI error")
      });
  }




  newLocation: any = []
  newLocation2: any = []
  primary: string;
  secondry: string;
  getNewLocation() {
    this.getApi.editLocation(this.jobSeekerDetailsId).subscribe((data) => {
      this.newLocation = data;
      this.primary = this.newLocation.primaryLocation
      this.secondry = this.newLocation.secondaryLocation
      this.newLocation2= this.newLocation.otherPreferedLocation
      console.log("------------------>dataLocation ",this.newLocation2)
      console.log(data, "------------------>dataLocation ")
      // console.log(this.primary, "------------------>data get primary ")
      // console.log(this.secondry, "------------------>data get secaosdry ")
    })
  }



  pLocation() {
    let localProfiledata: any;
  
    //selecetedLocations
    localProfiledata=this.selecetedLocations;
    console.log("fdghjkhgfdsfghjkl",localProfiledata)
    this.getApi.postLocation(this.profileID, localProfiledata).subscribe(() => {
      console.log('location data posted');
      this.getNewLocation()
    });
    
  }


  editLocation1() {
    this.getApi.putLocation(this.profileID, this.selecetedLocations).subscribe((resp) => {
      console.log("sdfghjkAMIN", resp)
      this.getNewLocation();
    })
  }
  deleteLocations(data: any) {
    console.log(data)
    this.getApi.deleteLocation(data, this.jobSeekerDetailsId).subscribe((resp) => {
      console.log(resp);
      this.getNewLocation();
      // this.getLocation();
    });
  }



  newJobpref: any = []
  getNewJobpref() {
    this.getApi.editJobpref(this.jobSeekerDetailsId).subscribe((data) => {
      this.newJobpref = data;
      console.log(this.newJobpref, "------------------>data get Job Preferfnce ")
      this.storedata();
    })
  }

  jobPreference() {

    this.getApi.postAddjobPref(this.profileID, this.jobPreference1).subscribe((resp) => {
      console.log(resp, "jobPreference postedmdfjfjfj");
      this.getNewJobpref()
    },
      err => {
        console.log(err)
      })
  }




  selJob: any = ''
  getjobSelect(c: any) {
    this.selJob = c.target.value.toUpperCase();
    console.log(this.selJob);
    this.push();
    // this.jobtypevalidation();

  }

  emptyp: any = ''
  getempType(c: any) {
    this.emptyp = c.target.value;
    console.log(this.emptyp);
    this.push();
    // this.employmenttypevalidation();

  }

  regex = /^\w+/;
  selectshift: any = ''
  getPreferredShiftType(c: any) {
    const shift = c.target.value.match(this.regex);
    this.selectshift = shift[0].toUpperCase();
    console.log(this.selectshift);
    this.push();
    // this.preferedtypevalidation();

  }
  salaryT: any = ''
  getsalaryType(c: any) {
    this.salaryT = c.target.value;
    console.log(this.salaryT);
    this.push();
    // this.expectedtypevalidation();

  }
  currentsal: any = 0
  getcurrentSalary() {
    // this.currentsal = this.amount
    console.log(this.currentsal);
    this.push();
    // this.salarytypevalidation();

  }

  jobPreference1: JobPrefference = {
    jobtype: this.selJob,
    employmentType: this.emptyp,
    preferedShift: this.selectshift,
    salaryType: this.salaryT,
    expectedSalary: 0
  };

  push() {
    console.log("Area of interest")
    this.jobPreference1.jobtype = this.selJob
    this.jobPreference1.employmentType = this.emptyp
    this.jobPreference1.preferedShift = this.selectshift
    this.jobPreference1.salaryType = this.salaryT,
      this.jobPreference1.expectedSalary = this.currentsal
    console.log("push button worked", this.jobPreference1);
  }

  storedata = () => {
    if (this.newJobpref) {
      this.selJob = this.newJobpref.jobtype
      this.emptyp = this.newJobpref.employmentType
      this.selectshift = this.newJobpref.preferedShift
      this.salaryT = this.newJobpref.salaryType
      this.currentsal = this.newJobpref.expectedSalary
      console.log(this.selJob, this.emptyp, this.selectshift, this.salaryT, this.currentsal, "StoreData Worked IF")

    } else {
      this.selJob = ""
      this.emptyp = ""
      this.selectshift = ""
      this.salaryT = ""
      this.currentsal = 0
      console.log(this.selJob, this.emptyp, this.selectshift, this.salaryT, this.currentsal, "StoreData Worked ELSE")

    }
  }





















  editjobRole() {
    this.showjobRole = !this.showjobRole;
  }

  editArea() {
    this.showArea = !this.showArea;
  }

  editLocation() {
    this.showLocation = !this.showLocation;
  }

  editJobType() {
    this.showJobType = !this.showJobType;
  }


  editEmployeeType() {
    this.showEmployeeType = !this.showEmployeeType;
  }

  editShiftType() {
    this.showShiftType = !this.showShiftType;
  }

  editSalaryType() {
    this.showSalaryType = !this.showSalaryType;
  }

  isPopupVisiblejobRole = false;
  togglePopupjobRole() {
    this.matchjobroles()
    this.isPopupVisiblejobRole = !this.isPopupVisiblejobRole;

  }
  isPopupVisibleareaofint = false;
  togglePopupareaofint() {
    this.matchArea();
    this.isPopupVisibleareaofint = !this.isPopupVisibleareaofint;

  }
  isPopupVisiblelocation = false;
  togglePopuplocation() {
    this.matchLocation()
    this.isPopupVisiblelocation = !this.isPopupVisiblelocation;
  }
  errorMsgOflocationS: string = ' '


  // Function Written for choose Job role

  JobRole: any = [];
  getJobRole() {
    this.getApi.togetJobRole().subscribe((data) => {
      this.JobRole = data;
      this.matchjobroles()
      this.JobRoleSearch();
    });
  }


  isValidJobRole = true;
  validationJR() {
    console.log("length of Job Role ", this.selecetedJobRoles.length);
    if (this.selecetedJobRoles.length > 0) {
      this.isValidJobRole = false
    } else {
      this.isValidJobRole = true
    }
  }
  //Search Job Role
  searchJobRole: string[] = [...this.unmatchJOB];
  // searchJobRole: string[] = [...this.JobRole];
  queryJobRole: string = '';
  JobRoleSearch() {
    this.searchJobRole = this.unmatchJOB.filter((data: any) => {
      return data.toLowerCase().includes(this.queryJobRole.toLowerCase());
    })
    if (this.searchJobRole.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }
  //get selected  Job Role
  selecetedJobRoles: string[] = []
  OnSelectJobRoles(e: any) {
    if (e.target.checked) {
      this.functforjorole()
      this.selecetedJobRoles.push(e.target.value)
      // this.validationJR();
      console.log("Job Role  ", this.selecetedJobRoles);
    } else {
      const index = this.selecetedJobRoles.indexOf(e.target.value)
      this.selecetedJobRoles.splice(index, 1)
      this.functforjorole()

    }
  }
  //Remove Selected Job Role
  userSelectedJobRoles: any[] = [];
  removeJobRole(e: any) {
    const index = this.selecetedJobRoles.indexOf(e)
    this.selecetedJobRoles.splice(index, 1);
    this.functforjorole()
    this.userSelectedJobRoles.length = this.JobRole.length
    for (let j = 0; j < this.JobRole.length; j++) {
      if (this.JobRole[j] == e) {
        this.userSelectedJobRoles[j] = false
      }

    }

  }


  // Function Written for choose area of Interest

  AreaOfInterest: any = [];
  getAreaOfInterest() {
    this.getApi.togetAreaofInterest().subscribe((data) => {
      this.AreaOfInterest = data;
      this.matchArea();
      this.AreaOfInterestSearch();
    });
  }


  isValidAreaOfInterest = true;
  validationAOI() {
    console.log("length of AreaOfInterest ", this.selecetedAreaOfInterests.length);
    if (this.selecetedAreaOfInterests.length > 0) {
      this.isValidAreaOfInterest = false
    } else {
      this.isValidAreaOfInterest = true
    }
  }
  //Search AreaOfInterest
  searchAreaOfInterest: string[] = [...this.unmatchAOI];
  queryAreaOfInterest: string = '';
  AreaOfInterestSearch() {
    this.searchAreaOfInterest = this.unmatchAOI.filter((data: any) => {
      return data.toLowerCase().includes(this.queryAreaOfInterest.toLowerCase());
    })
    if (this.searchAreaOfInterest.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }
  //get selected  AreaOfInterest
  selecetedAreaOfInterests: string[] = []
  OnSelectAreaOfInterests(e: any) {
    const checked = e.target.value
    const encodedItemName = encodeURIComponent(checked);
    if (e.target.checked) {
      this.selecetedAreaOfInterests.push(encodedItemName)

      console.log("AreaOfInterest  ", this.selecetedAreaOfInterests);
    } else {
      const index = this.selecetedAreaOfInterests.indexOf(encodedItemName)
      this.selecetedAreaOfInterests.splice(index, 1)

    }
  }
  //Remove Selected AreaOfInterest
  userSelectedAreaOfInterests: any[] = [];
  removeAreaOfInterest(e: any) {
    const index = this.selecetedAreaOfInterests.indexOf(e)
    this.selecetedAreaOfInterests.splice(index, 1);
    this.userSelectedAreaOfInterests.length = this.AreaOfInterest.length
    for (let j = 0; j < this.AreaOfInterest.length; j++) {
      if (this.AreaOfInterest[j] == e) {
        this.userSelectedAreaOfInterests[j] = false
      }

    }
  }


  // Function Written for choose Prefered Location

  Location: any = [];
  getLocation() {
    this.getApi.getLocation().subscribe((data) => {
      this.Location = data;
      this.matchLocation();
      this.LocationSearch();
    });
  }

  //validation
  isValidLocation = true;
  validationLoc() {
    console.log("length of Location ", this.selecetedLocations.length);
    if (this.selecetedLocations.length > 0) {
      this.isValidLocation = false
    } else {
      this.isValidLocation = true
    }
  }
  //Search Location
  searchLocation: string[] = [...this.unmatchLoc];
  queryLocation: string = '';
  LocationSearch() {
    this.searchLocation = this.unmatchLoc.filter((data: any) => {
      return data.toLowerCase().includes(this.queryLocation.toLowerCase());
    })
    if (this.searchLocation.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }

  //get selected  Location
  selecetedLocations: string[] = []
  OnSelectLocations(e: any) {
    if (e.target.checked) {
      this.selecetedLocations.push(e.target.value)
      this.validationLoc();
      console.log("validation Location  ", this.selecetedLocations);
    } else {
      const index = this.selecetedLocations.indexOf(e.target.value)
      this.selecetedLocations.splice(index, 1)
      this.validationLoc();
    }
  }
  //Remove Selected Location
  userSelectedLocations: any[] = [];
  removeLocation(e: any) {
    const index = this.selecetedLocations.indexOf(e)
    this.selecetedLocations.splice(index, 1);
    this.userSelectedLocations.length = this.Location.length
    for (let j = 0; j < this.Location.length; j++) {
      if (this.Location[j] == e) {
        this.userSelectedLocations[j] = false
      }
      this.validationLoc();
    }




  }

  isJobrole = false;
  msgjobrole = ""
  functforjorole() {
    const count = this.selecetedJobRoles.length + this.newJobrole.length
    if (count > 0 && count <= 2) {
      console.log(count, "IF ==1")
      this.isJobrole = false
      this.msgjobrole = "You cannot select less than three"
    }
    else if (count >= 3 && count <= 9) {
      this.isJobrole = true
      // this.pJobRole();
      console.log(count, "elseIF ==2")
      this.msgjobrole = ""
    }
    else if (count >= 10) {
      this.isJobrole = false
      console.log(count, "elseIF ==3")
      this.msgjobrole = "You cannot select more than nine"
    }
    else {
      this.isJobrole = false
      console.log(count, "else ==4")
      this.msgjobrole = "please select your job role"
    }
  }

  // postjobrolesave() {
  //   this.functforjorole()
  //   if (this.isJobrole) {
  //     this.pJobRole()
  //   }
  // }

  isAOI = false;
  msgAOI = ""
  functionforAOI() {
    const count = this.selecetedAreaOfInterests.length + this.newAOI.length
    if (count > 0 && count <= 2) {
      this.isAOI = false
      this.msgAOI = "You cannot select less than three";
    }
    else if (count >= 3 && count <= 9) {
      this.isAOI = true
      this.msgAOI = ""
    }
    else if (count >= 10) {
      this.isAOI = false
      this.msgAOI = "You cannot select more than nine"
    }
    else {
      this.isAOI = false
    }
  }



}










interface JobPrefference {
  jobtype: any
  employmentType: string
  preferedShift: string
  salaryType: string
  expectedSalary: any
}



interface locationSelect {
  primaryLocation: string
  pinCode: 0
  secondaryLocation: string
  otherPreferedLocation: [string]
}