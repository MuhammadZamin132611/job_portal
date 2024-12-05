import { Component, OnInit } from '@angular/core';
import { ProfileImageService } from '../services/profile-image.service';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit {

  constructor(private profileImageService: ProfileImageService) {
    // this.letter = this.profileImageService.letter;
    // this.imageUri = this.profileImageService.imageUri;
    // this.IsShow  = this.profileImageService.IsShow ;
    this.letter = localStorage.getItem('letter') 
    this.imageUri = localStorage.getItem('imageUri') 
    this.IsShow = this.imageUri ? true : false; 
    this.imagePath = this.sbucketName + this.imageUri  
   }

  ngOnInit(): void {
    // setTimeout(()=>{this.getImage();
    //   this.getBasicDetail();


    // },50);
  //  this.getImage();
}
    
  
  letter: any;
  basicDetail: any;
  imageUri: any;
  Data: any
  imagePath:any
  sbucketName = "https://job-check.s3.ap-south-1.amazonaws.com/";
  imageName: any
  hideImage: any
  hideName: any
  Imagedata: any
  IsShow = true;

//  sbucketName = "https://job-check.s3.ap-south-1.amazonaws.com/";
  // getImage() {
  //   let getImage = localStorage.getItem("profileID");
  //   this.profileImageService.getImage(getImage).subscribe((resp: any) => {
  //     this.Data = resp;
  //     this.sbucketName = "https://job-check.s3.ap-south-1.amazonaws.com/";
  //     this.imageName = JSON.parse(this.Data); 
  //     if (this.Data.value === null) {
  //       this.IsShow = true;
  //       let ID = localStorage.getItem('profileID');
  //       this.profileImageService.apiJcProfile(ID).subscribe((resp: any) => {
  //         this.basicDetail = resp;
  //       }
  //       )
  //     } 
  //     this.Imagedata = this.sbucketName + this.imageName.value
  //     this.imageUri = this.sbucketName + this.imageName.value; 
  //     if (typeof this.imageName.value != 'string') { 
  //       this.IsShow = true
  //     } else {
  //       this.IsShow = false
  //     }

  //   },
  //     (err: any) => { 
  //     })
      
  // }
  // getBasicDetail() {
  //   let ID = localStorage.getItem('profileID');
  //   this.profileImageService.apiJcProfile(ID).subscribe((resp: any) => {
  //     this.basicDetail = resp;
  //     this.letter = this.basicDetail.name.substr(0, 1).toUpperCase();
  //   })
  // }

}
