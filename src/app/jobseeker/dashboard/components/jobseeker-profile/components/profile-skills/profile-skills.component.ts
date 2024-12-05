import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardJobsService } from 'src/app/jobseeker/dashboard/services/dashboard-jobs.service';

@Component({
  selector: 'app-profile-skills',
  templateUrl: './profile-skills.component.html',
  styleUrls: ['./profile-skills.component.css']
})
export class ProfileSkillsComponent implements OnInit {

  skills:any
  profileID:any

  constructor(private dashboardJobsService:DashboardJobsService, private router:Router) { 
    this.profileID=localStorage.getItem('profileID');

  }


  ngOnInit(): void {
    this.GetSkills();

    
  }



  GetSkills(){
    console.log(this.profileID)
    this.dashboardJobsService.Selectedskills(this.profileID).subscribe(data => {
      console.log(data)
      this.skills=data;
      this.skillDifference()
    });

  }


  primary:any[]=[]
  other:any[]=[]

  skillDifference(){

    if(this.skills){
      this.skills.map((el:any)=>{
        if(el.skillType=='PRIMARY' || el.skillType==null){
          this.primary.push(el)
        }else{
          this.other.push(el)
        }
      })
    }
   
  }

  skillfilled=false;
  addSkill(){
      if(this.primary.length>=9){
          this.skillfilled=true;
      }else{
        this.router.navigate(["/dashboard/profile/skills/add-primary-skills"])
      }
  }

otherSkillLimit=false
  addOther()
{

 if(this.other.length>=9){
    this.otherSkillLimit=true;
}else{
  this.router.navigate(["/dashboard/profile/skills/add-other-skills"])
}

}
}
