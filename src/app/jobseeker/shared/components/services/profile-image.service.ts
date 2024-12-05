import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProfileImageService {
jobSeekerProfile = environment.jobSeekerUrl;


  constructor(private http:HttpClient ) { 
    this.getImage1();
    this.getBasicDetail();
    console.log("letter", this.letter);
  }
  letter: any;
  basicDetail: any;
  imageUri: any;
  Data: any
  sbucketName: any
  imageName: any
  hideImage: any
  hideName: any
  Imagedata: any
  IsShow = true;

  getImage1() {
    let getImage = localStorage.getItem("profileID");
    this.getImage(getImage).subscribe((resp: any) => {
      this.Data = resp;
      console.log("data2222222",this.Data)
      this.sbucketName = "https://job-check.s3.ap-south-1.amazonaws.com/";
      this.imageName = JSON.parse(this.Data);
      console.log(this.Data);
      if (this.Data.value === null) {
        this.IsShow = true;
        console.log("blank")
        let ID = localStorage.getItem('profileID');
        this.apiJcProfile(ID).subscribe((resp: any) => {
          this.basicDetail = resp;
        }
        )
      }
      console.log("jjjjjjjj", this.imageName)
      console.log("hello", this.imageName.value, typeof (this.imageName.value))
      console.log("final name", this.sbucketName + this.imageName.value)
      localStorage.setItem("finalName", this.sbucketName + this.imageName.value)
      this.Imagedata = this.sbucketName + this.imageName.value
      this.imageUri = this.sbucketName + this.imageName.value;
      
      console.log(this.imageUri)
      if (typeof this.imageName.value != 'string') {
        console.log('not string')
        this.IsShow = true
        // Removing the item from localStorage
 
      } else {
        this.IsShow = false
        
      }

    },
      (err: any) => {
        console.log(err)
      })
      
  }
  getBasicDetail() {
    console.log("getbasicdetails" );
    let ID = localStorage.getItem('profileID');
    this.apiJcProfile(ID).subscribe((resp: any) => {
      this.basicDetail = resp;
      this.letter = this.basicDetail.name.substr(0, 1).toUpperCase();
      localStorage.setItem('letter', this.letter);

    console.log("getbasicdetails",this.letter);

    })
  }
 

  apiJcProfile(id:any){
    return this.http.get(`https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/jobseekerprofile/${id}/basicDetails`)
  }
  getImage(id: any) {
    return this.http.get(
      this.jobSeekerProfile + `jobseekerprofile/${id}/getimage`, { responseType: 'text' }
    );
  }
}
