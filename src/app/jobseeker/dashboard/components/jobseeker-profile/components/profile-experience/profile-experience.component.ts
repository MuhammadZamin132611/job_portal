import { Component, OnInit } from '@angular/core';
import { JobExperienceService } from '../../Services/job-experience.service';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.css']
})
export class ProfileExperienceComponent implements OnInit {

  jobSeekerDetailsId: any;

  constructor(private service: JobExperienceService) {
    this.jobSeekerDetailsId = localStorage.getItem('profileID')
  }

  ngOnInit(): void {
    this.getWorkExperience();
  }

  workExperience: any = [];
  workExperienceCount: number = 0;
  letter: any;
  getWorkExperience() {
    this.service.getWorkExperience(this.jobSeekerDetailsId).subscribe((data: any) => {
      this.workExperience = data;
      this.workExperienceCount = this.workExperience.length;
      console.log('the count of workExperience', this.workExperienceCount);
      console.log(this.workExperience, 'Work Experience');
      for(let i=0;i<this.workExperienceCount;i++){
        this.workExperience[i].condition=this.workExperience[i].companyName.substr(0, 1).toUpperCase();
        console.warn(this.workExperience[i].condition);
      }
    });
  }


}
