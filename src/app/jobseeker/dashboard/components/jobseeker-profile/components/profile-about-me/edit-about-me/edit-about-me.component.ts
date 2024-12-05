
import { personalBio } from 'src/app/jobseeker/dashboard/models/personalbio.model';
import { ProfileBasicDetailsService } from './../../../Services/profile-basic-details.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-about-me',
  templateUrl: './edit-about-me.component.html',
  styleUrls: ['./edit-about-me.component.css']
})
export class EditAboutMeComponent implements OnInit {
  characterCount: number = 0;
  text: string = '';
  title: any;
  personalDesc:any;
  jobseekerid: string | null;
  perBio : personalBio = new personalBio();
  data: any;
  constructor(private location: Location,private ser: ProfileBasicDetailsService) { }

  goBack():void{
    this.location.back();
  }

  ngOnInit(): void {
    this.getperbio();
  }

    adding(){
      this.jobseekerid=localStorage.getItem('profileID');
      console.log('Adddingggggggggg------',this.jobseekerid);
      this.perBio.personalDesc = this.text;

      this.ser.add(this.jobseekerid, this.perBio).subscribe((res)=>{
        this.personalDesc = res;
        console.log(res);


      })
      console.log("==================>?",this.personalDesc);
    }
    getperbio(){
      this.jobseekerid=localStorage.getItem('profileID');
      console.log("=================get_profileID", this.jobseekerid)
      this.ser.summary(this.jobseekerid).subscribe((res)=>{
        this.data = res
        console.log("==========================get", this.data)
        console.log("==========================getdata", res)
        this.text=this.data.personalDescription
        console.log("text=============>>>>>",this.text);
      })
    }

}
