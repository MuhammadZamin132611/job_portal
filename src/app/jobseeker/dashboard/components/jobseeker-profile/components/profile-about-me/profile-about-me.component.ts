import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResumeService } from 'src/app/jobseeker/onboarding/services/resume.service';
import { ProfileBasicDetailsService } from '../../Services/profile-basic-details.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-about-me',
  templateUrl: './profile-about-me.component.html',
  styleUrls: ['./profile-about-me.component.css'],
})
export class ProfileAboutMeComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  jobseekerid: any;
  data: any;
  characterCount: number = 0;
  numLines: number = 4;
  isPopupOfflineStatus = false;
  play:boolean=true;
  pause:boolean=false;
  viewMore:boolean;
  constructor(
    private router: Router,
    private resume: ResumeService,
    private ser: ProfileBasicDetailsService
  ) { }

  resumeAvail = false;
  ngOnInit(): void {
    this.getResume();
    this.getperbio();
    this.getVideoResume();
   
  }


  showFullText:boolean = false;

  toggleText() {
    this.showFullText = !this.showFullText;
  }

  url: any;
  filename: any;
  getResume() {
    let uid = localStorage.getItem('profileID');
    this.resume.getResume(uid).subscribe((dat: any) => {
      this.url = 'https://job-check.s3.ap-south-1.amazonaws.com/' + dat.value;

      if (dat.value) {
        this.resumeAvail = true;
      }
      console.log((this.filename = dat.value.slice(14, dat.value.length)));
    });
  }

  uid: any = localStorage.getItem('profileID');
  resumeDelete() {
    this.resume.delete(this.uid, this.url).subscribe((res: any) => {
      console.log('deleted_Resume', res);
      window.location.reload();
    });
  }

  personalBio: boolean;
  personalBioLength:any;
  getperbio() {
    this.jobseekerid = localStorage.getItem('profileID');
    this.ser.summary(this.jobseekerid).subscribe((res: any) => {
      this.data = res;
      this.personalBioLength = this.data.personalDescription.length
      console.log('====getlength', this.data.personalDescription.length);
      this.characterCount = 1;
      console.log('====getdata', res);
      if (this.data) {
        this.personalBio = true;
      } else {
        this.personalBio = false;
      }
    });
  }
  // Pop Up
  delete: any = "Don't delete your resume; it can lead to great opportunities";
  isPopupVisibleResume: boolean = false;
  toggleUploadResume() {
    this.isPopupVisibleResume = !this.isPopupVisibleResume;
  }

  videoFile: any;
  currentFileUpload: any;
  jobseekerProfile:any;
  // onFileSelected(event:any): void {
  //   this.videoFile = event.target.files[0];
  //   console.log("file",this.videoFile)
  //   //this.selectedFiles=event.target.file;
  //   //this.uploadVideo();
  // }
  isPopupVisibleVideo = false;
  msg:any;
  selectedFiles: any;
  s3bucketurl:string="https://job-check.s3.ap-south-1.amazonaws.com/"
  show: boolean;
  //IsShow=true;

  toggleUploadeVideo() {
    this.isPopupVisibleVideo = !this.isPopupVisibleVideo
  }

  selectFile(event: any) {
    this.show = true;
    

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.selectedFiles = event.target.files;
    console.log("helloooo",this.selectedFiles)
    var mimeType = event.target.files[0].type;
    const fileSizeInMB = event.target.files[0].size / (1024 * 1024);
    console.log("size",fileSizeInMB)
    console.log("type",mimeType)
    if (mimeType.match(/video\/*/) == null) {
      this.msg = "File type is not allowed";
      window.alert("File type is not allowed")
      return;
    }
    if(fileSizeInMB >100){
      window.alert("File size exceeds 100 MB")
      return;

    }
    this.uploadVideo();
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
  }

  uploadVideo() {
    console.log("dgvhjkgfhjk")
    this.jobseekerProfile = localStorage.getItem("profileID");
    this.currentFileUpload = this.selectedFiles.item(0);
    this.ser.pushVideo(this.currentFileUpload, this.jobseekerProfile).subscribe((event: any) => {
      console.log(event, "Video Uploded");
      this.selectedFiles = undefined;
      setTimeout(() => {
        this.getVideoResume();
      }, 2000); 
  
      // if (event.type == 4) {
      //   this.imageName = JSON.stringify(event.body).replace("File uploaded : ", "");
      //   this.imageUri = "https://job-check.s3.ap-south-1.amazonaws.com/" + JSON.parse(this.imageName.value);
      //   localStorage.setItem('imageUri', JSON.stringify(this.imageUri));
      //   this.imageStatus = true;
      // }
    });
    console.log(this.currentFileUpload ,"current file");
  }

  toggleOfflineStatus() {
    this.isPopupOfflineStatus = !this.isPopupOfflineStatus
  }
  Data:any;
  videoName:any;
  videoUpload:boolean=true;
  videoAvail:boolean=false;
  finalName:any;
  videouri:string=''
  getVideoResume(){

    this.jobseekerProfile = localStorage.getItem("profileID");
    this.ser.getVideo(this.jobseekerProfile).subscribe((resp: any) => {
    this.Data = JSON.parse(resp) ;
    this.videoName = this.Data.value;
    this.finalName = this.Data.value.replace(/^[^_]+_/, '');
    this.videouri=this.s3bucketurl+this.videoName
    console.log("kk final warning" ,this.videouri)
    console.log("Video Name", this.finalName)
    if(this.videoName != null){
      this.videoAvail=true;
      this.videoUpload=false;
    }
  },((error)=>{
    console.log(error)
    this.videouri=''
  }));

  }
  openFullscreen() {
    const video = this.videoPlayer.nativeElement;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
    video.play();

    this.play=false;
    this.pause=true;
  }
  pauseVideo(){
    const video = this.videoPlayer.nativeElement;
    video.pause();
    this.play=true;
    this.pause=false;
  }
  
  deleteVideoData(){
    this.jobseekerProfile = localStorage.getItem("profileID");
    this.ser.deleteVideo(this.jobseekerProfile).subscribe((resp:any)=>{
      this.Data=resp;
      this.videoAvail=false;
      this.videoUpload=true;
      this. getVideoResume();
      console.log("Video Resume Deleted" , resp)
      
    });
  }

}
