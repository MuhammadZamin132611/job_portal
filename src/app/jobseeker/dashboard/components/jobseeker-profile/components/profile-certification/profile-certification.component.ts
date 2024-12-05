import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../../Services/certificate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-certification',
  templateUrl: './profile-certification.component.html',
  styleUrls: ['./profile-certification.component.css']
})
export class ProfileCertificationComponent implements OnInit {
  namePart: any;
  Fsize: number;
  fileType: any;
  file: boolean;
  letter: any;

  constructor(private certificate: CertificateService,private router: Router) { }

  ngOnInit(): void {
    this.getCertificate();

  }
  
  uploadedCertificateData : any;
  url: any;
  certificateAvail: boolean;
  filename: any;
   Allcertificates:any=[];
   count:number=0;
   getCertificate1: any = [];
   getCertificateCount: number = 0;
  getCertificate() {
    let uid = localStorage.getItem('profileID')

    this.certificate.getCertificate(uid).subscribe( (res : any) =>{
      console.log("Data from backend :", res)
      console.log(this.Allcertificates=res)
      this.count = this.Allcertificates.length || 0  
      this.getCertificateCount = this.Allcertificates.length;

    })
    this.certificate.getCertificate(uid).subscribe((dat: any) => {
      this.url = 'https://job-check.s3.ap-south-1.amazonaws.com/' + dat.value

      if (dat.value) {
        this.certificateAvail = true;
      }
      console.log(this.filename = dat.value.slice(14, dat.value.length))
    })

  }
  getCertificateDetails(event: any) {
    for (const element of event.target.files) {
      let Fname = element.Fname;
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
      else if (this.fileType != 'jpeg' || this.fileType != 'jpg' || this.fileType != 'png' || this.fileType != 'pdf') {
        alert("Certificate must me in PDF or JPEG or JPG");
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
    throw new Error('Method not implemented.');
  }
  
}
function createReactiveForm() {
  throw new Error('Function not implemented.');
}


