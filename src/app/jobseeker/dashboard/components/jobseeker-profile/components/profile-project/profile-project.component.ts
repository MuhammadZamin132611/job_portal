import { Component, OnInit } from '@angular/core';
import { EditProjectService } from './services/edit-project.service';

@Component({
  selector: 'app-profile-project',
  templateUrl: './profile-project.component.html',
  styleUrls: ['./profile-project.component.css']
})
export class ProfileProjectComponent implements OnInit {
  jobSeekerDetailsId: any;

  constructor(private editProjectService:EditProjectService) {
    this.jobSeekerDetailsId = localStorage.getItem("profileID")
    console.log("userId", this.jobSeekerDetailsId)
   }

  ngOnInit(): void {
    this.getAllProjectsDetails();
  }


  projectsDetails: any = [];
  countProject:number=0
  getAllProjects:number=0
  getAllProjectsDetails() {
    this.editProjectService.getProjectDetails(this.jobSeekerDetailsId).subscribe((data) => {
      this.projectsDetails = data;
      console.log(data, "------------------>data get ")
      this.countProject = this.projectsDetails.length || 0  
      this.getAllProjects = this.projectsDetails.length;

      // console.log(this.projectsDetails.value, "------------------>projects details ")
    })
  }
}
