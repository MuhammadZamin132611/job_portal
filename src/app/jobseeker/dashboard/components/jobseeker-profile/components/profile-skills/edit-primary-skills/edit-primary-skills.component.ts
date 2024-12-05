import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardJobsService } from 'src/app/jobseeker/dashboard/services/dashboard-jobs.service';

@Component({
  selector: 'app-edit-primary-skills',
  templateUrl: './edit-primary-skills.component.html',
  styleUrls: ['./edit-primary-skills.component.css']
})
export class EditPrimarySkillsComponent implements OnInit {
  skills: boolean=false;
  skills1: boolean=false;

  sliderValue = 0;

  
  delskill:boolean=false;



  onSliderChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    this.sliderValue = parseInt(inputElement.value, 10);
}

deleteSkills(){
  this.delskill=!this.delskill;

}

  constructor(private router:Router,private dashboardJobsService:DashboardJobsService) { }
  skillData:any;
  ngOnInit(): void {
   
   this.getSkills();
    }

  allSkills:any;

  primary:any=[];

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
        if(el.skillType=='PRIMARY' || el.skillType==null){
          this.primary.push(el)
        }
      })
    }
    // console.log('=========================',this.primary)
  }

  skillToEdit:any;
  editPrimarySkill(skill:any){
    this.skills1 = !this.skills1
    this.skillToEdit=skill;
    this.ind=skill.rating
    this.instyle=` background: linear-gradient(to right, #00A2E0 0%, #30728C ${this.ind}%, #eeeeee ${this.ind}%, #eeeeee 100%);`

  }

  editPrimarySkill1(){
    this.skills1 = !this.skills1

  }



  updateSkill(){
    
    let id = localStorage.getItem('profileID')
    this.skillToEdit.skillType='PRIMARY'
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

  
ind:any;
instyle='';
prog(ind:any){
  this.ind=ind;
  this.instyle=` background: linear-gradient(to right, #00A2E0 0%, #30728C ${ind}%, #eeeeee ${ind}%, #eeeeee 100%);`
}

}
