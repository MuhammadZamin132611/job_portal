import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { JobExperienceService } from '../../../Services/job-experience.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-show-all-experience',
  templateUrl: './show-all-experience.component.html',
  styleUrls: ['./show-all-experience.component.css']
})
export class ShowAllExperienceComponent implements OnInit {
 

  text: string = '';
  showEditPage:boolean=false;
  hideData:boolean=true;
  DOBB: any;
  DOBB1: any;
  Popup: any = false;
  personalBioForm !: FormGroup;
  isPopupVisiblejobRole = false;
  isPopupVisibleIndustry = false;
  isPopupVisibleLocation = false;
  // constructor(private ExprienceServices:ExperienceService) { }
  jobSeekerDetailsId:any;
  workExperienceId:any;
  workExperienceById!: FormGroup;

  constructor(private service:JobExperienceService, private location1: Location,
    private formbuilder: FormBuilder,) { 
    this.jobSeekerDetailsId = localStorage.getItem('profileID')
    this.workExperienceId = localStorage.getItem('workExperienceId')
  }
  goBack(): void {
    this.location1.back();
  }

  ngOnInit(): void {
    this.getWorkExperience();
    this.Exprience();
    this.onEditclicked();

    
    this.workExperienceById = this.formbuilder.group({
        companyName: new FormControl(''),
        jobRole: new FormControl(''),
        department: new FormControl(''),
        industryType: new FormControl(''),
        startDate: new FormControl(''),
        endDate: new FormControl(''),
        noticePeriod: new FormControl(''),
      });


  }
 

  workExperience: any = [];
  workExperienceCount: number = 0;

  getWorkExperience() {
    this.service.getWorkExperience(this.jobSeekerDetailsId).subscribe((data: any) => {
      this.workExperience = data;
      this.workExperienceCount = this.workExperience.length;
      console.log('the count of workExperience',this.workExperienceCount);
      console.log(this.workExperience, 'Work Experience');
    });
  }

  getId(value:any){
    console.log("----------->",value);
    localStorage.setItem('workExperienceId' , value);
  }


  

  onEditclicked(){
    // get the work experience based on the id
   
    //populate the form with the product details
      

    
  }


  isPopupVisible1 = false;
  isPopupVisible2 = false;
  DurationForm !: FormGroup;
  dataOfBirthn: Date;
  JobRole:any=[
    "Accounting & Taxation",
    "Administration",
    "Administration & Staff",
    "Advertising & Creative",
    "Advisory",
    "After Sales Service & Repair",
    "Airline Services",
    "Animation",
    "Arbitration",
    "Architecture & Interior Design",
    "Artists",
    "Assessment",
    "Assets & Wealth Manager",
    "Audit & Control",
    "Aviation & Aerospace - Other",
    "Aviation Engineering",
    "Back Office",
    "Banking Operation",
    "BD",
    "Beauty & Personal Care",
    "BFSI Investment & Trading - Other",
    "Business",
    "Business Intelligence & Analytics",
    "Business Process Quality",
    "Category Management & Operations",
    "Collections",
    "Community Health & Safety",
    "Compensation & Benefits",
    "Construction",
    "Construction Engineering",
    "Content Management",
    "Content, Editorial & Journalism - Other",
    "Corporate Affairs",
    "Corporate Communication",
    "Corporate Training",
    "Costume",
    "Crime",
    "CSR & Sustainability",
    "Data Science & Machine Learning",
    "Data warehousing",
    "DBA",
    "DevOps",
    "Digital Marketing",
    "Direction",
    "Doctor",
    "Downstream",
    "ECA Teacher",
    "Editing",
    "Effects",
    "Employee Relations",
    "Energy & Mining - Other",
    "Engineering",
    "Engineering & Manufacturing",
    "Enterprise & B2B Sales",
    "Environment Health and Safety - Other",
    "Events & Banquet",
    "F&B Production",
    "F&B Service",
    "Facility Management",
    "Fashion & Accessories",
    "Finance",
    "Finance & Accounting - Other",
    "Flight & Airport Operations",
    "Food, Beverage & Hospitality - Other",
    "Fraud",
  ]
  industries:any=[
  
    "BFSI",
    "BPM",
    "Consumer",
    "Education",
    "Entertainment & Telecom",
    "Healthcare & Life Sciences",
    "Infrastructure",
    "IT Services",
    "Manufacturing & Production",
    "Media",
    "Miscellaneous",
    "Professional Services",
    "Retail & Hospitality",
    "Technology",
    "Transport & Real Estate"
  
]
location:any=[
  "Adurai",
"Agartala",
"Agra",
"Ahmedabad",
"Ahmednagar",
"Aizawl",
"Ajmer",
"Akola",
"Aligarh",
"Allahabad or Prayagraj",
"Alwar",
"Ambala",
"Amravati",
"Amritsar",
"Anand",
"Anantapur",
"Anantnag",
"Andaman & Nicobar Islands",
"ANDHRA PRADESH",
"Asansol",
"Aurangabad",
"Balasore",
"Ballia",
"Baramati",
"Baramulla",
"Bareilly",
"Barpeta",
"Belgaum",
"Bellary",
"Berhampur",
"Bhagalpur",
"Bharatpur",
"Bharuch",
"Bhatinda",
"Bhavnagar",
"Bhilaigarh",
"Bhilwara",
"Bhiwani",
"Bhopal",
"Bhubaneswar",
"Bhuj",
"Bidar",
"Bijapur",
"Bikaner",
"Bilaspur",
"Bokaro Steel City",
"Bulandshahr",
"Burdwan",
"Chamba",
"Chandrapur",
"Chennai",
"Chhapra",
"Chhindwara",
"Chittaurgarh",
"Chittoor",
"Cochin or Kochi or Ernakulam",
"Coimbatore",
"Cuddalore",
"Cuttack",
"Dadra & Nagar Haveli",
"Dalhousie",
"Daman",
"Daman & Diu",
"Darjeeling",
"Davanagere",
"Dehradun",
"Deoria",
"Dhanbad",
"Dharwad",
"Dhubri",
"Dhule or Dhulia",
"Dibrugarh",
"Dispur",
"Durg",
"Durgapur",
"Erode",
"Faizabad",
]
 
  togglePopupjobRole(){
    this.isPopupVisiblejobRole=!this.isPopupVisiblejobRole;
  }

  togglePopupIndustry(){
    this.isPopupVisibleIndustry=!this.isPopupVisibleIndustry;
  }

  togglePopupLocation(){
    this.isPopupVisibleLocation=!this.isPopupVisibleLocation;
  }

  editWorkExp(){
    this.showEditPage=!this.showEditPage
    this.hideData=!this.hideData
  }
  totalExprience:any;
  Exprience(){
    // this.ExprienceServices.getExperience().subscribe((data)=>{
    //   this.totalExprience = data;
    // })
  }
  submit(id:any)
  {
    
  }
  dob(e:any) {
    console.log(e.detail.value);
    this.DOBB=e.detail.value;
    console.log(this.DOBB); 
}
dob1(e:any) {
  console.log(e.detail.value);
  this.DOBB1=e.detail.value;
  console.log(this.DOBB1); 
}

togglePopup1() {
  
  this.isPopupVisible1 = !this.isPopupVisible1;
  
  }
  togglePopup2() {
  
    this.isPopupVisible2 = !this.isPopupVisible2;
    
    }
  checkduration() {
    //console.log("USING BLUE TO CALL THIS METHOD")
    const dateOfBirth = new Date(this.DurationForm.controls['dateOfBirth'].value);
    //console.log("TODSDAJK", dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    if (age < 18) {
      this.DurationForm.controls['dateOfBirth'].setErrors({ invalidAge: true });
    } else {
      this.DurationForm.controls['dateOfBirth'].setErrors(null);
    }
    if (age == null) {
      this.DurationForm.controls['dob'].setErrors({ required: true });
    }
  }
  checkduration1() {
    //console.log("USING BLUE TO CALL THIS METHOD")
    const dateOfBirth = new Date(this.DurationForm.controls['dateOfBirth'].value);
    //console.log("TODSDAJK", dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    if (age < 18) {
      this.DurationForm.controls['dateOfBirth'].setErrors({ invalidAge: true });
    } else {
      this.DurationForm.controls['dateOfBirth'].setErrors(null);
    }
    if (age == null) {
      this.DurationForm.controls['dob1'].setErrors({ required: true });
    }
  }





}
