/*
Name: Chetan
Date: 25-03-23
What: This is the controller ts file to get Basic details of used
Why: This is provided to Jobseeker to view the sidebar and route to profile
 */

//1. Imports - Angular Framework - Mandatory
import { Component, OnInit } from '@angular/core';

//2. Imports - JobCheck Services - Mandatory
import { LogoutService } from 'src/app/jobseeker/authentication/services/logout.service';
import { ExampleService } from '../../services/example.service';
import { ProfileImagesService } from '../../services/profile-images.service';
import { NotificationsService } from '../../services/notifications.service';

//3. Template - Mandatory
@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})

//4. Class - Mandatory
//Class to Show Sidebar details 
export class SideNavbarComponent implements OnInit {

   //5. Properties - Mandatory
  current: any;
  max: number = 100;
  stroke: number = 15;
  radius: number = 125;
  semicircle: boolean = true;
  isLoading: boolean = true;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = true;
  color: string = '#00A2E0';
  background: string ='#ffffff';            //'#eaeaea';
  duration: number = 800;
  animation: string = 'easeOutCubic';
  animationDelay: number = 0;
  animations: Array<string> = [
    'linearEase',
    'easeInQuad',
    'easeOutQuad',
    'easeInOutQuad',
    'easeInCubic',
    'easeOutCubic',
    'easeInOutCubic',
    'easeInQuart',
    'easeOutQuart',
    'easeInOutQuart',
    'easeInQuint',
    'easeOutQuint',
    'easeInOutQuint',
    'easeInSine',
    'easeOutSine',
    'easeInOutSine',
    'easeInExpo',
    'easeOutExpo',
    'easeInOutExpo',
    'easeInCirc',
    'easeOutCirc',
    'easeInOutCirc',
    'easeInElastic',
    'easeOutElastic',
    'easeInOutElastic',
    'easeInBack',
    'easeOutBack',
    'easeInOutBack',
    'easeInBounce',
    'easeOutBounce',
    'easeInOutBounce',
  ];
  gradient: boolean = true;
  constructor(private auth:LogoutService , private exampleService:ExampleService,private profileImagesService:ProfileImagesService, private notification:NotificationsService) { }

    //6. This method will call the page for offline status and get data
  ngOnInit(): void {
    this.gettingData()
    this.gettingData1()
    this.getImage();
    this.getBasicDetail();
  }


  //This method will get profile photo of user
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
  getImage() {
    let getImage = localStorage.getItem("profileID");
    this.profileImagesService.getImage(getImage).subscribe((resp: any) => {
      this.Data = resp;
      this.isLoading = false;
      this.sbucketName = "https://job-check.s3.ap-south-1.amazonaws.com/";
      this.imageName = JSON.parse(this.Data);
      console.log(this.Data);
      if (this.Data.value === null) {
        this.IsShow = true;
        console.log("blank")
        let ID = localStorage.getItem('profileID');
        this.profileImagesService.apiJcProfile(ID).subscribe((resp: any) => {
          this.basicDetail = resp;
        }
        )
      }
     localStorage.setItem("finalName", this.sbucketName + this.imageName.value)
      this.Imagedata = this.sbucketName + this.imageName.value
      this.imageUri = this.sbucketName + this.imageName.value;
      console.log(this.imageUri)
      if (typeof this.imageName.value != 'string') {
        this.IsShow = true
      } else {
        this.IsShow = false
      }

    },
      (err: any) => {
        console.log(err)
      })
  }

  //This method will get name of user 
  getBasicDetail() {
    let ID = localStorage.getItem('profileID');
    this.profileImagesService.apiJcProfile(ID).subscribe((resp: any) => {
      this.basicDetail = resp;
      this.isLoading = false;
      this.letter = this.basicDetail.name.substr(0, 1).toUpperCase();
    })
  }

  //This method will logout the user from app
  logout(){
    this.auth.siginOut()
  }

  //This method will get basic details of user 
  Data2:any
  gettingData() {
    let ID = localStorage.getItem('profileID');
    console.log(ID)
    this.exampleService.apiJcProfile(ID).subscribe((resp:any) => {
      console.log(resp)
      this.Data2=resp
   })
 }

 deleteToken(){
  let token=localStorage.getItem('Token');
  let ID = localStorage.getItem('profileID');
  this.notification.deleteToken(ID,token).subscribe((resp:any) => {
    console.log(resp)
    this.Data1=resp
    this.logout();
 })
 }

 //This method will get profile completion percentage of user 
 Data1:any;
 gettingData1() {
   this.exampleService.apiJcProfile1().subscribe((resp:any) => {
     console.log(resp)
     this.Data1=resp
  })
}

}
