import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { CertificateService } from '../../../Services/certificate.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-certificate',
  templateUrl: './edit-certificate.component.html',
  styleUrls: ['./edit-certificate.component.css'],
  providers: [
    DatePipe
  ]
})
export class EditCertificateComponent implements OnInit {

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  buttonName: any = 'show';
  show: boolean = false;
  tick: boolean = false;
  existUser: string = '';
  DOBB: any;
  DOBB1: any;
  Popup: any = false;
  personalBioForm !: FormGroup;
  EditCertificate: FormGroup;
  showeditpage = false;
  isPopupVisible1 = false;
  isPopupVisible2 = false;
  DurationForm !: FormGroup;
  dataOfBirthn: Date;
  alerts99: string;
  differenceindays: number;
  difference: number;
  Enddate: any;
  StartDate: any;
  Allcertificates: any;
  getImage: any;
  startDate: string;
  endDate: String;
  Submitted: boolean = false;
  profileID: any;
  startYear: any;
  endYear: any;
  showEndDate: boolean = true;

  del: boolean = false;
  Certificationname: any;
  IssuedBy: any;
  isFormFilled: boolean;
  deletePopup() {
    this.del = !this.del;

  }
  constructor(private location1: Location,  private router: Router, private certificate: CertificateService, private datePipe: DatePipe, private fb: FormBuilder,) {
    EditCertificate: FormGroup;
  }

  goBack(): void {
    this.location1.back();
  }

  formData = new FormData()
  ngOnInit(): void {

    this.getCertificate()
    this.EditCertificate = this.fb.group({
      Certificationname: ['', [Validators.required]],
      IssuedBy: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'connected';
      this.connectionStatus = 'online';
      console.log('Online...');
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'No internet connection! ';
      this.connectionStatus = 'offline';

      console.log('Offline...');
    }));
  }


  get validate() {
    return this.EditCertificate.controls
  }

  selectedCert: any
  editcertificate(data: any) {
    this.showeditpage = true;
    if (data) {
      console.log(this.selectedCert = data)
      this.selectedCert.certificate = 'https://job-check.s3.ap-south-1.amazonaws.com/' + this.selectedCert.certificate
      this.startDate =  this.selectedCert.issuedDate.slice(0,10)
      this.endDate =  this.selectedCert.expirationDate.slice(0,10)
      console.log("startdate",this.startDate)
      console.log("enddate",this.endDate)
    }

  }
  dateDifference() {
    this.StartDate = new Date(this.DOBB)
    this.Enddate = new Date(this.DOBB1)
    // this.StartDate = new Date(this.StartDate)
    // this.Enddate = new Date(this.eddate)
    this.difference = Math.floor(this.Enddate - this.StartDate)
    console.log("===============>", this.difference)
    this.differenceindays = Math.floor((this.difference / (1000 * 3600 * 24)));
    console.log("===============>", this.differenceindays)
    if (this.differenceindays < 0) {
      this.alerts99 = " leaving date must grater than joining date"
      return;
    }
    else if (this.differenceindays == 0) {
      this.alerts99 = "leaving date should not equal to joining date "
      return;
    }
    else {
      this.alerts99 = "";
    }
  }


  // togglePopup1() {
  //   this.isPopupVisible1 = !this.isPopupVisible1;
  //   }
  //   togglePopup2() {
  //     this.isPopupVisible2 = !this.isPopupVisible2;
  //     }
  togglePopup1() {

    this.isPopupVisible1 = !this.isPopupVisible1;

  }
  togglePopup2() {

    this.isPopupVisible2 = !this.isPopupVisible2;

  }
  checkduration() {
    const dateOfBirth = new Date(this.EditCertificate.controls['startDate'].value);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    if (age < 18) {
      this.EditCertificate.controls['startDate'].setErrors({ invalidAge: true });
    } else {
      this.EditCertificate.controls['startDate'].setErrors(null);
    }
    if (age == null) {
      this.EditCertificate.controls['startDate'].setErrors({ required: true });
    }
  }
  checkduration1() {
    const dateOfBirth = new Date(this.EditCertificate.controls['endDate'].value);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    if (age < 18) {
      this.EditCertificate.controls['endDate'].setErrors({ invalidAge: true });
    } else {
      this.EditCertificate.controls['endDate'].setErrors(null);
    }
    if (age == null) {
      this.EditCertificate.controls['endDate'].setErrors({ required: true });
    }
  }


  dob(e: any) {
    console.log(e.detail.value);
    this.DOBB = e.detail.value;
    this.startYear = this.datePipe.transform(this.DOBB, "yyyy-MM-dd");
    console.log("the Start year", this.startYear);
    console.log(this.DOBB);
  }
  dob1(e: any) {
    console.log(e.detail.value);
    this.DOBB1 = e.detail.value;
    this.endYear = this.datePipe.transform(this.DOBB1, "yyyy-MM-dd");
    console.log("the end year", this.endYear);
    console.log(this.DOBB1);
    this.dateDifference()

  }

  startdate: any;
  enddate: any;
  differenceinyears: any;

  dateDidderence() {
    this.startdate = new Date(this.startYear)
    this.enddate = new Date(this.endYear)
    this.difference = Math.floor(this.enddate - this.startdate)
    console.log("=====>", this.difference)
    this.differenceinyears = Math.floor((this.difference / (1000 * 3600 * 24)) / 365);
    console.log("=====>", this.differenceinyears)
  }

  submitted: boolean = false
  validateData() {
    const isFormFilled = false;
    this.submitted = true
    console.log(this.EditCertificate.value)
    if (this.EditCertificate.valid) {
      // console.log(this.EditCertificate.value)
      // this.showeditpage = false;
    }
    if (this.Certificationname && this.IssuedBy) {
           this.isFormFilled = true;
         this.updateCertificate()
       }
  }
  // validateData() {
  //   const isFormFilled = false;
  //   this.submitted = true
  //   console.log(this.AddCertificate.value)
  //   if (this.AddCertificate.valid) {
      


  //   }
  //   if (this.Certificationname && this.IssuedBy) {
  //     this.isFormFilled = true;
  //     // this.uploadcertificate()
  //   }
  // }
  
  certificateAvail: boolean;
  filename: any;
  url: any;
  // issuedDate
  // expirationDate
  getCertificate() {
    let uid = localStorage.getItem('profileID')
    this.certificate.getCertificate(uid).subscribe((res: any) => {
      console.log("Data from backend :", res)
      console.log(this.Allcertificates = res)
    
      console.log("print date in console" ,res)
      this.startDate =  this.selectedCert.issuedDate.slice(0,10)
      this.endDate =  this.selectedCert.expirationDate.slice(0,10)
      console.log("startdate",this.startDate)
      console.log("enddate",this.endDate)
      this.router.navigate(['/dashboard/profile']);

    })
    // this.certificate.getCertificate(uid).subscribe((dat: any) => {
    //       this.url = 'https://job-check.s3.ap-south-1.amazonaws.com/' + dat.value
    
    //       if (dat.value) {
    //         this.certificateAvail = true;
    //       }
    //       console.log(this.filename = dat.value.slice(14, dat.value.length))
    //     })
     
      }
 

  // getCertificate() {
  //   let uid = localStorage.getItem('profileID')

  //   this.certificate.getCertificate(uid).subscribe( (res : any) =>{
  //     console.log("Data from backend :", res)
  //     console.log(this.Allcertificates=res)
  //     this.count = this.Allcertificates.length || 0  
  //     this.getCertificateCount = this.Allcertificates.length;

  //   })
  //   this.certificate.getCertificate(uid).subscribe((dat: any) => {
  //     this.url = 'https://job-check.s3.ap-south-1.amazonaws.com/' + dat.value

  //     if (dat.value) {
  //       this.certificateAvail = true;
  //     }
  //     console.log(this.filename = dat.value.slice(14, dat.value.length))
  //   })

  // }
  updateCertificate() {
    let uid = localStorage.getItem('profileID');

    this.formData.append('certificationName', this.EditCertificate.get('Certificationname')?.value);
    this.formData.append('issuedBy', this.EditCertificate.get('IssuedBy')?.value)
    this.formData.append('issuedDate', this.EditCertificate.get('startDate')?.value)
    this.formData.append('expirationDate', this.EditCertificate.get('endDate')?.value);

    console.log(this.formData)
    this.certificate.updateCert(uid || '', this.selectedCert.certificateId, this.formData).subscribe((resp: any) => {
      location.reload();
      console.log("success", this.form)

    })
    return;

  }
 deletecertificate() {
    let uid = localStorage.getItem("profileID");
    // this.IsShow = true;
    this.certificate.deletecertificate(uid, this.selectedCert.certificateId).subscribe((resp: any) => {
      location.reload();
      console.log("resp", resp)

    });
  }

  form: any
  formupload = false
  updt(ev: any) {
  let file = ev.target.files[0]
    this.formData.append('file', file, file.name);
    this.formupload = true;
  }

}
