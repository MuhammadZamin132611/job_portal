import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, Observable, Subscription, catchError } from 'rxjs';
import { CertificateService } from '../../../Services/certificate.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.css'],
  providers: [DatePipe]
})
export class AddCertificateComponent implements OnInit {

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
  namePart: any;
  Fsize: number;
  fileType: any;
  addcertificate: any;
  msg: any;
  selectedFiles: any;
  url: any;
  alerts99: string;
  differenceindays: number;
  difference: number;
  Enddate: any;
  StartDate: any;
  isFormFilled: boolean;
  Certificationname: any;
  IssuedBy: any;
  DOBB: any;
  enterningdate: Date;
  currentdate: Date;
  age: number;
  isPopupVisible1: boolean = false;
  isPopupVisible2: boolean;
  certificateAvail: boolean;
  startDate: string;
  endDate: String;
  isSubmitted: boolean = false;
  profileID: any;
  startYear: any;
  endYear: any;
  DOBB1: any;
  startyear: any='';
  endyear: any='';
  showEndDate: boolean = true;
  yearOfPassoutMessage: string = "Please select  Endyear";
  yearOfPassoutMessage1: string = "Please select  Startyear";
  isSubmitClicked = false;
  isValidEndYear: boolean = true
  isValidStartYear: boolean = true



  constructor(private location1: Location, private fb: FormBuilder, private router: Router, private datePipe: DatePipe, private certificate: CertificateService) { }
  goBack(): void {
    this.location1.back();
  }
  
  AddCertificate: FormGroup;
  ngOnInit(): void {
    // calling the data from GET method
    // this.getCertificate();
    this.AddCertificate = this.fb.group({
      Certificationname: ['', [Validators.required]],
      IssuedBy: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      uploadCertification: ['', [Validators.required]],
      // certificateUpload: ['',[Validators.required]],
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
  ////////date difference////////
  stdate: any;
  sdate(event: any) {

    this.stdate = event.target.value;
    console.log("#####DATE",this.stdate);
  }
  eddate: any;
  edate(event: any) {

    this.eddate = event.target.value;
    console.log(this.eddate);
    this.dateDifference();
  }
  dateDifference() {

    this.StartDate = new Date(this.DOBB)
    this.Enddate = new Date(this.DOBB1)
    this.difference = Math.floor(this.Enddate - this.StartDate)
    console.log("===============>", this.difference)
    this.differenceindays = Math.floor((this.difference / (1000 * 3600 * 24)));
    console.log("===============>", this.differenceindays)
    if (this.differenceindays < 0) {
      this.alerts99 = " End date must be greater than start date"
      return;
    }
    else if (this.differenceindays == 0) {
      this.alerts99 = "End date should not be equal to start date "
      return;
    }
    else {
      this.alerts99 = "";
    }
  }


  togglePopup1() {

    this.isPopupVisible1 = !this.isPopupVisible1;

  }
  togglePopup2() {

    this.isPopupVisible2 = !this.isPopupVisible2;

  }
  checkduration() {
    //console.log("USING BLUE TO CALL THIS METHOD")
    const dateOfBirth = new Date(this.AddCertificate.controls['startDate'].value);
    //console.log("TODSDAJK", dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    if (age < 18) {
      this.AddCertificate.controls['startDate'].setErrors({ invalidAge: true });
    } else {
      this.AddCertificate.controls['startDate'].setErrors(null);
    }
    if (age == null) {
      this.AddCertificate.controls['startDate'].setErrors({ required: true });
    }
  }
  checkduration1() {
    //console.log("USING BLUE TO CALL THIS METHOD")
    const dateOfBirth = new Date(this.AddCertificate.controls['endDate'].value);
    //console.log("TODSDAJK", dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    if (age < 18) {
      this.AddCertificate.controls['endDate'].setErrors({ invalidAge: true });
    } else {
      this.AddCertificate.controls['endDate'].setErrors(null);
    }
    if (age == null) {
      this.AddCertificate.controls['endDate'].setErrors({ required: true });
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
  // difference: any;
  differenceinyears: any;

  dateDidderence() {
    this.startdate = new Date(this.startYear)
    this.enddate = new Date(this.endYear)
    this.difference = Math.floor(this.enddate - this.startdate)
    console.log("=====>", this.difference)
    this.differenceinyears = Math.floor((this.difference / (1000 * 3600 * 24)) / 365);
    console.log("=====>", this.differenceinyears)
  }


  get validate() {

    return this.AddCertificate.controls
  }

  submitted: boolean = false
  validateData() {
    const isFormFilled = false;
    this.submitted = true
    console.log(this.AddCertificate.value)
    if (this.AddCertificate.valid) {
      


    }
    if (this.Certificationname && this.IssuedBy) {
      this.isFormFilled = true;
      // this.uploadcertificate()
    }
  }
  loadMsg = ''
  imageErrMsg = false;
  pdfUrl: any;


 
  formupload = false;
  form: any
  UploadCertificate(ev: any) {
    // this.mimeType = ev.target.files[0].type;

    const formData = new FormData();
    let file = ev.target.files[0]
    console.log("fileee--",file)
    formData.append('file', file, file.name);
    let uid = localStorage.getItem('profileID')
    formData.append('certificationName', this.AddCertificate.get('Certificationname')?.value);
    formData.append('issuedBy', this.AddCertificate.get('IssuedBy')?.value)
    formData.append('issuedDate',this.AddCertificate.get('startDate')?.value)
    formData.append('expirationDate',this.AddCertificate.get('endDate')?.value);
    this.form = formData;
    this.formupload = true

    

  }
  



  showMsgs() {
    this.loadMsg = 'Certificate Uploaded !! '
  }

  filename: any;

  uploadedCertificateData: any;

  getCertificate() {
    let uid = localStorage.getItem('profileID')

    this.certificate.getCertificate(uid).subscribe((res: any) => {
      console.log("Data from backend :", res)

      const lastCertificate = res.pop();
      console.log("Last Certificate :", lastCertificate.certificate);

      this.uploadedCertificateData = lastCertificate.certificate;
      console.log("Certificatet Name :", this.uploadedCertificateData);

    })

    this.certificate.getCertificate(uid).subscribe((dat: any) => {
      this.url = 'https://job-check.s3.ap-south-1.amazonaws.com/' + dat.value

      if (dat.value) {
        this.certificateAvail = true;
      }
      console.log(this.filename = dat.value.slice(14, dat.value.length))
    })

  }
  route() {
    let uid = localStorage.getItem('profileID')
    if (this.formupload) {
      // this.router.navigate(['/dashboard/profile']);
      this.certificate.Uploadcertificate(this.form, uid || '').subscribe((response) => {
          // Handle the response from the server
          console.log('donE', response);
          this.formupload = true
          this.router.navigate(['/dashboard/profile']);

          

        },
        (error) => {
          // Handle any errors that occur during the upload
          console.error('Upload error:', error);

        }
      );
    }
  }

  navigate() {
    window.open(this.url)
  }

  file = true;
  // fileErrmsg = false;

  getCertificateDetails(event: any) {
    for (const element of event.target.files) {
      let Fname = element.name; // Corrected property name from Fname to name
      let type = element.type;
      let size = element.size;
  
      let modifiedDate = element.lastModifiedDate;
  
      console.log('Myyy Name: ' + Fname + "\n" +
        'Type: ' + type + "\n" +
        'Last-Modified-Date: ' + modifiedDate + "\n" +
        'Size: ' + Math.round(size / 1024) + " KB" + "\n" +
        'original size:' + size);
  
      this.namePart = type.split('/');
      this.Fsize = Math.round(size / 1024);
  
      this.fileType = this.namePart[1];
      console.log("fileType ----->>> ", this.fileType)
  
      if (this.Fsize > 625) {
        alert("Certificate size should not exceed 5MB");
        console.log("sizeeee")
        return;
      }
      else if (!(this.fileType === 'jpeg' || this.fileType === 'jpg' || this.fileType === 'png' || this.fileType === 'pdf')) {
        alert("Certificate must be in PDF or JPEG or JPG");
        console.log("fileee")
        return;
      }
      else {
        this.upload();
        this.router.navigate(['dashboard/profile']);
      }
    }
    this.file = true;
  }
  
  upload() {
    // Implement your file upload logic here
  }
  
}
function createReactiveForm() {
  throw new Error('Function not implemented.');
}
