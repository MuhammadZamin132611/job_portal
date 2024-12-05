import { Component, OnInit } from '@angular/core';
import { EducationService } from 'src/app/jobseeker/profile/services/education.service';
import { ProfileEducationService } from '../../Services/profile-education.service';


@Component({
  selector: 'app-profile-education',
  templateUrl: './profile-education.component.html',
  styleUrls: ['./profile-education.component.css']
})
export class ProfileEducationComponent implements OnInit {
  jobSeekerDetailsId: string | null;
  edetails: any;
  educationlength: any;

  constructor(private api:ProfileEducationService ) { }

  ngOnInit(): void {
    this.geteducation() 
  }

  geteducation() {
 
    this.jobSeekerDetailsId=localStorage.getItem("profileID")
    this.api.getEducation(this.jobSeekerDetailsId).subscribe((data: any) => {
   this.edetails=data
   this.educationlength=this.edetails.length
      console.log('dataObj--------------------------', this.edetails)
      for (let i = 0; i <this.educationlength ; i++) {
        if(this.edetails[i].qualification=="Doctorate"||this.edetails[i].qualification=="Post Graduation"||this.edetails[i].qualification=="Graduation"){
          this.edetails[i].educationcondition=true
         }else{
          this.edetails[i].educationcondition=false
         }
         if(this.edetails[i].startDate==null){
          this.edetails[i].startDatecondition=true
         }else{
          this.edetails[i].startDatecondition=false
         }
         
      }
     
      
    })
    
  
    
  }

}

