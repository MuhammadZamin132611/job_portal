import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EditProjectService } from '../services/edit-project.service';

@Component({
  selector: 'app-showall-projects',
  templateUrl: './showall-projects.component.html',
  styleUrls: ['./showall-projects.component.css']
})
export class ShowallProjectsComponent implements OnInit {
  jobSeekerDetailsId: any;

  constructor(private location: Location, private editProjectService:EditProjectService) {
    this.jobSeekerDetailsId = localStorage.getItem("profileID")
    console.log("userId", this.jobSeekerDetailsId)
  }
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    this.getSelectedLanguage();
  }


  projectsDetails: any = [];

  getSelectedLanguage() {
    this.editProjectService.getProjectDetails(this.jobSeekerDetailsId).subscribe((data) => {
      this.projectsDetails = data;
      console.log(data, "------------------>data get ")
      // console.log(this.projectsDetails.value, "------------------>projects details ")
    })
  }

}
