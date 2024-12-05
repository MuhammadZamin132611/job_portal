import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AddJobPreferenceService } from '../services/add-job-preference.service';

@Component({
  selector: 'app-add-job-preference',
  templateUrl: './add-job-preference.component.html',
  styleUrls: ['./add-job-preference.component.css']
})
export class AddJobPreferenceComponent implements OnInit {
  showArea: boolean = false;
  addJobPrefference: JobPrefference;
  errorMsgOfskills: string = '';

  locationtoSelect: locationSelect
  isPopupVisiblejobRole = false;
  togglePopupjobRole() {
    this.isPopupVisiblejobRole = !this.isPopupVisiblejobRole;
    this.functionJobrole();
    this.matchjobroles()
  }
  isPopupVisibleareaofint = false;
  togglePopupareaofint() {
    this.isPopupVisibleareaofint = !this.isPopupVisibleareaofint;
  }
  isPopupVisiblelocation = false;
  togglePopuplocation() {
    this.isPopupVisiblelocation = !this.isPopupVisiblelocation;
  }
  isSubmitClicked = false;
  errorMsgOflocationS: string = ' '
  currency: any;

  editArea() {
    this.showArea = !this.showArea;
  }
  // Popup: any = false;
  // pincodes: string;
  // SvgHideS: boolean = false

  jobSeekerDetailsId: any;


  form: FormGroup;
  constructor(private router: Router, private http: HttpClient, private getApi: AddJobPreferenceService, private fb: FormBuilder, private location: Location) {
    this.addJobPrefference = {} as JobPrefference
    this.locationtoSelect = {} as locationSelect
    this.jobSeekerDetailsId = localStorage.getItem("profileID")

    this.form = this.fb.group({
      jobSelect: [''],
      employeType: [''],
      preferredShiftType: [''],
      salaryType: [''],
      currentSalary: ['']

    });
  }

  goBack(): void {
    this.location.back();
  }

  selJob: any = ''
  getjobSelect(c: any) {
    this.selJob = c.toUpperCase();
    console.log(this.selJob);
    this.jobtypevalidation();

  }

  emptyp: any = ''
  getempType(c: any) {
    this.emptyp = c;
    console.log(this.emptyp);
    this.employmenttypevalidation();

  }

  regex = /^\w+/;
  selectshift: any = ''
  getPreferredShiftType(c: any) {
    const shift = c.match(this.regex);
    this.selectshift = shift[0].toUpperCase();
    console.log(this.selectshift);
    this.preferedtypevalidation();

  }
  salaryT: any = ''
  getsalaryType(c: any) {
    this.salaryT = c.toUpperCase();
    console.log(this.salaryT);
    this.expectedtypevalidation();

  }
  currentsal: any = 0

  getcurrentSalary() {
    this.currentsal = this.amount
    console.log(this.currentsal);
    this.salarytypevalidation();

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
  jobPreference() {
    this.push();
    this.getApi.postAddjobPref(this.profileID, this.jobPreference1).subscribe((resp) => {
      console.log(resp, "jobPreference postedmdfjfjfj");

    },
      err => {
        console.log(err)
      })
  }

  ngOnInit(): void {

    let getCheckedRadio = null;
    this.SALARY_TYPE.forEach((o) => {
      if (o.checked) getCheckedRadio = o.value;
    });
    let getCheckedRadio1 = null;
    this.PREFFERED_SHIFT_TYPE.forEach((o) => {
      if (o.checked) getCheckedRadio1 = o.value;
    });
    let getCheckedRadio2 = null;
    this.JOBS_SELECT_TYPE.forEach((o) => {
      if (o.checked) getCheckedRadio2 = o.value;
    });
    let getCheckedRadio3 = null;
    this.EMPLOYEE_TYPE.forEach((o) => {
      if (o.checked) getCheckedRadio3 = o.value;
    });

    // this.changeToCurrency('text');
    this.getAreaOfInterest();
    this.getJobRole();
    this.getLocation();
    this.getNewAOI();
    this.getNewLocation();
    this.getNewJobrole();
    this.getNewJobpref();




    this.isFormValid();

  }


  AlladdJobs = new FormGroup({
    jobSelect: new FormControl('', [Validators.required]),
    employeType: new FormControl('', [Validators.required]),
    PreferredShiftType: new FormControl('', [Validators.required]),
    ExceptedSalary: new FormControl('', [Validators.required]),
    SalaryType: new FormControl('', [Validators.required]),
    // currentSalary: new FormControl('', [Validators.required]),
    currentSalary: new FormControl(''),


  })


  get validator() {
    return this.AlladdJobs.controls
  }

  profileID: any = localStorage.getItem('profileID')

  formSubmit1() {
    this.isSubmitClicked = true;
    console.log("form data", this.AlladdJobs)
    if (this.AlladdJobs.valid) {
      // this.getApi.postAreaofInterest(this.profileID,this.selecetedAreaOfInterests).subscribe((resp)=>{
      this.getApi.postJobRole(this.profileID, this.selecetedJobRoles).subscribe((resp) => {
        console.log(resp, "job role posted");
        this.AOI();
        this.pJobRole();


      },
        err => {
          console.log(err)
        })
      // this.router.navigate(['/profile'])
    }
    else (
      console.log('form is invalid')
    )
  }


  AOI() {
    this.getApi.postAreaofInterest(this.profileID, this.selecetedAreaOfInterests).subscribe((resp) => {
      console.log(resp);
      this.Locations();
    },
      err => {
        console.log(err)
      })
  }
  pJobRole() {
    this.getApi.postJobRole(this.profileID, this.selecetedJobRoles).subscribe((resp) => {
      console.log("data posted on job role", resp)

      // this.Locations();
    },
      err => {
        console.log(err)
      })
  }
  newJobrole: any = []
  getNewJobrole() {
    this.getApi.getJobRole(this.jobSeekerDetailsId).subscribe((data) => {
      this.newJobrole = data;
      console.log(this.newJobrole, "------------------>JOB ROLE GETTING ")
    })
  }

  //  isJobtype = false;
  //   isEmploymenttype = false;
  //   isPreferedtype = false;
  //   isExpectedtype = false;
  //   isSalarytype = false;
  //   selectedJobType: any
  //   selectedEmploymentType: any
  //   selectedSalaryType: any
  //   selectedPreffeShift: any
  //   selectedSalary: any




  newJobpref: any = []
  getNewJobpref() {
    this.getApi.getJobpref(this.jobSeekerDetailsId).subscribe((data) => {
      this.newJobpref = data;
      this.typemploy()
      // this.check();
      // this.checkValidation();
      console.log(this.newJobpref, "------------------>JOB REFERENCE GETTING ")
    })
  }
  amount: number | null | undefined
  typemploy() {
    if (this.newJobpref) {
      this.amount = this.newJobpref.expectedSalary
      this.selectedJobType = this.JOBS_SELECT_TYPE.find((jobType: { name: string; }) => jobType.name.toUpperCase() === this.newJobpref.jobtype.toUpperCase());
      console.log("selected job type", this.selectedJobType);
      if (this.selectedJobType) {
        this.ischeck1 = false
        // Set the checked property of the matched job type to true
        this.selectedJobType.checked = true;
      } else {
        this.ischeck1 = true
        this.selectedJobType.checked = false
        console.log("selected job type2 check this one", this.selectedJobType);

      }
      console.log("selected job type2", this.selectedJobType);
      console.log("this.JOBS_SELECT_TYPE", this.JOBS_SELECT_TYPE);
      this.selectedEmploymentType = this.EMPLOYEE_TYPE.find(empType => empType.name.toUpperCase() === this.newJobpref.employmentType.toUpperCase());
      if (this.selectedEmploymentType) {
        this.ischeck2 = false
        this.selectedEmploymentType.checked = true
      }
      else {
        this.ischeck2 = true
        this.selectedJobType.checked = false

      }
      console.log("selected job type2", this.selectedJobType);
      console.log("this.JOBS_SELECT_TYPE", this.JOBS_SELECT_TYPE);

      this.selectedSalaryType = this.SALARY_TYPE.find(sal => sal.name.toUpperCase() === this.newJobpref.salaryType.toUpperCase());
      if (this.selectedSalaryType) {
        this.ischeck3 = false
        this.selectedSalaryType.checked = true
      }
      else {
        this.ischeck3 = true
        this.selectedJobType.checked = false
      }

      this.selectedPreffeShift = this.PREFFERED_SHIFT_TYPE.find(pshift => pshift.name.toUpperCase().includes(this.newJobpref.preferedShift.toUpperCase()));
      if (this.selectedPreffeShift) {
        this.ischeck4 = false
        this.selectedPreffeShift.checked = true
      }
      else {
        this.ischeck4 = true
        this.selectedJobType.checked = false
      }
    } else {
      this.ischeck1 = false
      this.ischeck2 = false
      this.ischeck3 = false
      this.ischeck4 = false
      this.amount
      console.log("selected job type2", this.selectedJobType);
      console.log("this.JOBS_SELECT_TYPE", this.JOBS_SELECT_TYPE);
    }

  }

  ischeck1 = false
  ischeck2 = false
  ischeck3 = false
  ischeck4 = false

  //Checked Jobrole
  unmatchJOB: any[] = []
  matchjobroles() {
    //   const unmatchedJobRoles = jobRole.filter(role => !newJobrole.some(job => job.jobRoleName === role));

    // console.log(unmatchedJobRoles);
    this.unmatchJOB = this.JobRole.filter((jobs: any) => !this.newJobrole.some((rol: { jobRoleName: any; }) => rol.jobRoleName === jobs))
    // console.log(this.unmatchJOB, "matching jobs++ffdfd");

  }
  Locations() {
    this.locationtoSelect.primaryLocation = this.selecetedLocations[0]
    this.locationtoSelect.secondaryLocation = this.selecetedLocations[1]
    let otherLoc = [...this.selecetedLocations]
    this.locationtoSelect.otherPreferedLocation = otherLoc.slice(0, 2)
    this.getApi.postLocation(this.profileID, this.locationtoSelect).subscribe((resp) => {
      console.log(resp);
      // this.JobPref();
    },
      err => {
        console.log(err)
      })
  }
  // JobPref(){
  //   this.addJobPrefference.jobType = this.AlladdJobs.value.jobSelect
  //   this.addJobPrefference.employeeType = this.AlladdJobs.value.employeType
  //   this.addJobPrefference.prefferedShift = this.AlladdJobs.value.PreferredShiftType
  //   this.addJobPrefference.salaryType = this.AlladdJobs.value.SalaryType  == 'Monthly' ? 0 : 1;
  //   this.addJobPrefference.exceptedSallary = this.AlladdJobs.value.ExceptedSalary
  //   console.log("this.addJobPrefference",this.addJobPrefference)
  //   this.getApi.postAddjobPref(this.profileID,this.addJobPrefference).subscribe((resp)=>{
  //     console.log(resp)
  //   },
  //   err=>{
  //     console.log(err)
  //   })
  // }

  // isJobtype = false;
  // isEmploymenttype = false;
  // isPreferedtype = false;
  // isExpectedtype = false;
  // isSalarytype = false;
  selectedJobType: any
  selectedEmploymentType: any
  selectedSalaryType: any
  selectedPreffeShift: any
  selectedSalary: any


  checkValidation = () => {
    if (this.selectedJobType.checked) {
      this.jobtypevalidation();
    }
    if (this.selectedEmploymentType.checked) {
      this.employmenttypevalidation()
    }
    if (this.selectedSalaryType.checked) {
      this.expectedtypevalidation()
    }
    if (this.selectedPreffeShift.checked) {
      this.preferedtypevalidation()
    }
    if (this.selectedSalary) {
      this.salarytypevalidation
    }
  }

  // check = () => {
  //   this.selectedJobType = this.JOBS_SELECT_TYPE.find((jobType: { name: string; }) => jobType.name.toUpperCase() === this.newJobpref.jobtype.toUpperCase());
  //   console.log("selected job type", this.selectedJobType);
  //   if (this.selectedJobType) {
  //     // Set the checked property of the matched job type to true
  //     this.selectedJobType.checked = true;
  //   }
  //   console.log("selected job type2", this.selectedJobType);
  //   console.log("this.JOBS_SELECT_TYPE", this.JOBS_SELECT_TYPE);

  //   this.selectedEmploymentType = this.EMPLOYEE_TYPE.find(empType => empType.name.toUpperCase() === this.newJobpref.employmentType.toUpperCase());
  //   if (this.selectedEmploymentType) {
  //     this.selectedEmploymentType.checked = true
  //   }
  //   console.log("selected job type2", this.selectedJobType);
  //   console.log("this.JOBS_SELECT_TYPE", this.JOBS_SELECT_TYPE);

  //   this.selectedSalaryType = this.SALARY_TYPE.find(sal => sal.name.toUpperCase() === this.newJobpref.salaryType.toUpperCase());
  //   if (this.selectedSalaryType) {
  //     this.selectedSalaryType.checked = true
  //   }

  //   this.selectedPreffeShift = this.PREFFERED_SHIFT_TYPE.find(pshift => pshift.name.toUpperCase().includes(this.newJobpref.preferedShift.toUpperCase()));
  //   if (this.selectedPreffeShift) {
  //     this.selectedPreffeShift.checked = true
  //   }
  //   console.log("selectedPreffeShift", this.selectedPreffeShift);
  //   console.log("this.this.PREFFERED_SHIFT_TYPE", this.PREFFERED_SHIFT_TYPE);
  //   this.amount = this.newJobpref.expectedSalary
  //   if (this.amount >= 1000) {
  //     this.selectedSalary = true;
  //   }
  // }

  JOBS_SELECT_TYPE = [
    { name: 'Permanent', value: 'Permanent', checked: false },
    { name: 'Temporary', value: 'Temporary', checked: false },
    { name: 'Internship', value: 'Internship', checked: false },
    { name: 'Any', value: 'Any', checked: false },
  ];


  EMPLOYEE_TYPE = [
    { name: 'Full Time', value: 'Full Time', checked: false },
    { name: 'Part Time', value: 'Part Time', checked: false },
    { name: 'Other', value: 'Other', checked: false },

  ];

  PREFFERED_SHIFT_TYPE = [
    { name: 'Day Shift', value: 'Day Shift', checked: false },
    { name: 'Night Shift', value: 'Night Shift', checked: false },
    { name: 'Any', value: 'Any', checked: false },

  ];
  SALARY_TYPE = [
    { name: 'Monthly', value: 'Monthly', checked: false },
    { name: 'Yearly', value: 'Yearly', checked: false },
  ];

  newAOI: any = []
  getNewAOI() {
    this.getApi.editAreaOI(this.jobSeekerDetailsId).subscribe((data) => {
      this.newAOI = data;
      // console.log(data, "------------------>datasdfgh get ")
    })
  }
  newLocation: any = []
  primary: string;
  secondry: string;
  getNewLocation() {
    this.getApi.editLocation(this.jobSeekerDetailsId).subscribe((data) => {
      this.newLocation = data;
      this.primary = this.newLocation.primaryLocation
      this.secondry = this.newLocation.secondaryLocation
      console.log(data, "------------------>dataLocation ")
      console.log(this.primary, "------------------>data get primary ")
      console.log(this.secondry, "------------------>data get secaosdry ")
    })
  }
  // Function Written for choose Job role
  JobRole: any = []
  getJobRole() {
    this.getApi.togetJobRole().subscribe((data) => {
      this.JobRole = data;
      this.matchjobroles();
      this.JobRoleSearch();
      // console.log(this.JobRole, "Job role from master data")
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
  selecetedJobRoles: any[] = []
  OnSelectJobRoles(e: any) {
    if (e.target.checked) {
      this.selecetedJobRoles.push(e.target.value)
      this.validationJR();
      // console.log("Job Role  ", this.selecetedJobRoles);
    } else {
      const index = this.selecetedJobRoles.indexOf(e.target.value)
      this.selecetedJobRoles.splice(index, 1)
      this.validationJR();
    }
  }
  //Remove Selected Job Role
  userSelectedJobRoles: any[] = [];
  removeJobRole(e: any) {
    const index = this.selecetedJobRoles.indexOf(e)
    this.selecetedJobRoles.splice(index, 1);
    this.userSelectedJobRoles.length = this.JobRole.length
    for (let j = 0; j < this.JobRole.length; j++) {
      if (this.JobRole[j] == e) {
        this.userSelectedJobRoles[j] = false
      }
      this.validationJR();
    }
    this.functionJobrole();

  }
  // Function Written for choose area of Interest
  AreaOfInterest: any = ' ';
  getAreaOfInterest() {
    this.getApi.togetAreaofInterest().subscribe((data) => {
      this.AreaOfInterest = data;
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
  searchAreaOfInterest: string[] = [...this.AreaOfInterest];
  queryAreaOfInterest: string = '';
  AreaOfInterestSearch() {
    this.searchAreaOfInterest = this.AreaOfInterest.filter((data: any) => {
      return data.toLowerCase().includes(this.queryAreaOfInterest.toLowerCase());
    });
    if (this.searchJobRole.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }
  //get selected  AreaOfInterest
  selecetedAreaOfInterests: string[] = []
  OnSelectAreaOfInterests(e: any) {
    if (e.target.checked) {
      this.selecetedAreaOfInterests.push(e.target.value)
      this.validationAOI();
      // console.log("AreaOfInterest  ", this.selecetedAreaOfInterests);
    } else {
      const index = this.selecetedAreaOfInterests.indexOf(e.target.value)
      this.selecetedAreaOfInterests.splice(index, 1)
      this.validationAOI();
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
      this.validationAOI();
    }
  }
  // Function Written for choose Prefered Location
  Location: any = ' ';
  getLocation() {
    this.getApi.getLocation().subscribe((data) => {
      this.Location = data;
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
  searchLocation: string[] = [...this.Location];
  queryLocation: string = '';
  LocationSearch() {
    this.searchLocation = this.Location.filter((data: any) => {
      return data.toLowerCase().includes(this.queryLocation.toLowerCase());
    });
    if (this.searchJobRole.length == 0) {
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
    for (let j = 0; j < this.AreaOfInterest.length; j++) {
      if (this.Location[j] == e) {
        this.userSelectedLocations[j] = false
      }
      this.validationLoc();
    }
  }

  // NEW VALIDATION FOR PAGE

  isJobrole = false;
  isJobtype = false;
  isEmploymenttype = false;
  isPreferedtype = false;
  isExpectedtype = false;
  isSalarytype = false;

  message = ""
  functionJobrole() {
    const count = this.selecetedJobRoles.length + this.newJobrole.length
    if (count > 0) {

      if (count >= 10) {

        this.isJobrole = true
        this.message = "You cannot select more than nine";
      }
      else {

        this.isJobrole = false
      }
    }
    else {

      this.isJobrole = true;
      this.message = "please select your job role"
    }
    this.isFormValid();
  }


  jobtypevalidation() {
    if (this.newJobpref) {
      this.selJob = this.newJobpref.jobtype
    }

    console.log(this.selJob, "depart")
    console.log(this.ischeck1, "depart258745")
    this.isJobtype = this.getApi.validationADD(this.selJob, this.ischeck1)
    console.log(this.isJobtype, "this.isJobtype")
    this.isFormValid();
  }
  employmenttypevalidation() {
    if (this.newJobpref) {
      this.emptyp = this.newJobpref.employmentType
    }
    this.isEmploymenttype = this.getApi.validationADD(this.emptyp, this.ischeck2)
    console.log(this.isEmploymenttype, "this.isEmploymenttype")
    this.isFormValid();
  }
  preferedtypevalidation() {
    if (this.newJobpref) {
      this.selectshift = this.newJobpref.preferedShift
    }
    this.isPreferedtype = this.getApi.validationADD(this.selectshift, this.ischeck3);
    console.log(this.isPreferedtype, "fthis.isPreferedtypee")
    this.isFormValid();
  }
  expectedtypevalidation() {
    if (this.newJobpref) {
      this.salaryT = this.newJobpref.salaryType
    }
    this.isExpectedtype = this.getApi.validationADD(this.salaryT, this.ischeck4)
    console.log(this.isExpectedtype, "this.isExpectedtype")
    this.isFormValid();
  }
  amountrupeessmessage = ""
  salarytypevalidation() {
    // this.isSalarytype = this.getApi.validationADD(this.currentsal)
    if (this.amount) {
      if (this.currentsal >= 1000 || this.amount >= 1000) {
        // this.isJobrole = false;
        console.log(this.currentsal, "IF condition")
        if (this.currentsal >= 1000000000 || this.amount >= 1000000000) {
          console.log(this.selecetedJobRoles.length, "Inner IF Condition")
          this.isSalarytype = true
          this.amountrupeessmessage = "You cannot select more than 10 Cr.";
          this.isFormValid();
        }
        else {
          console.log(this.currentsal, "Inner Else Condition")
          this.isSalarytype = false
          this.isFormValid();

        }
      }
      else {
        console.log(this.currentsal, "Outer Else Condition")
        this.isSalarytype = true;
        this.amountrupeessmessage = "Amount more than 1000"
        this.isFormValid();
      }

    } else {
      this.amountrupeessmessage = "Amount more than 1000"
    }
  }
  mainFunctionforpost() {
    this.functionJobrole();
    this.jobtypevalidation();
    this.employmenttypevalidation();
    this.preferedtypevalidation();
    this.expectedtypevalidation();
    this.salarytypevalidation();
    if (this.variableValid) {
      this.pJobRole();

      this.jobPreference();
      this.router.navigate(['/dashboard/profile'])
    }



  }

  saveButton = true

  variableValid = false
  isFormValid() {

    if (!this.isJobrole &&
      !this.isJobtype &&
      !this.isEmploymenttype &&
      !this.isPreferedtype &&
      !this.isExpectedtype &&
      !this.isSalarytype) {

      this.variableValid = true
      console.log(this.variableValid, "from true value")

    }
    else {
      console.log(this.variableValid, "from else value")

      this.variableValid = false

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
  primaryLocation: any
  pinCode: any
  secondaryLocation: any
  otherPreferedLocation: any[]
}


