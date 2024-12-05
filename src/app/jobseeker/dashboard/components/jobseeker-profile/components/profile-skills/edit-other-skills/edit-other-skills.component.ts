import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardJobsService } from 'src/app/jobseeker/dashboard/services/dashboard-jobs.service';

@Component({
  selector: 'app-edit-other-skills',
  templateUrl: './edit-other-skills.component.html',
  styleUrls: ['./edit-other-skills.component.css']
})
export class EditOtherSkillsComponent implements OnInit {
  skills: boolean=false;
  delskill:boolean=false;


  deleteSkills(){
    this.delskill=!this.delskill;

  }
  constructor(private router:Router,private dashboardJobsService:DashboardJobsService) { }
  skillData:any;
  ngOnInit(): void {
   
   this.getSkills();
    }

  allSkills:any;

  other:any=[];

  getSkills(){
    let id =localStorage.getItem('profileID');

    this.dashboardJobsService.Selectedskills(id).subscribe(data => {
      // console.log(data)
      this.allSkills=data;
      this.skillDifference()
    });


  }

  skillDifference(){
    if(this.allSkills){
      this.allSkills.map((el:any)=>{
        if(el.skillType!='PRIMARY' && el.skillType!=null){
          this.other.push(el)
        }
      })
    }
    // console.log('=========================',this.primary)
  }

  
  skillToEdit:any;
  editOtherSkill(skill:any){
    this.skills = !this.skills
    this.skillToEdit=skill;

  }

  
  updateSkill(){
    this.skillToEdit.skillType='OTHER'
    let id = localStorage.getItem('profileID')
    console.log(id,this.skillToEdit)
    this.dashboardJobsService.updateskill(this.skillToEdit,id).subscribe(()=>{
      location.reload()
    })
   
  }

  deleteSkill(){
    let id = localStorage.getItem('profileID')
    this.dashboardJobsService.deleteSkill(id || '',this.skillToEdit.skillId).subscribe(()=>{
      location.reload();
    })
  }


}
