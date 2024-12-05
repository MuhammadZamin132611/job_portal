import { Component, OnInit } from '@angular/core';
import { RecruiterActionService } from '../services/recruiter-action.service';

@Component({
  selector: 'app-companyviewed',
  templateUrl: './companyviewed.component.html',
  styleUrls: ['./companyviewed.component.css']
})
export class CompanyviewedComponent implements OnInit {
  activeTab: string = 'tab1';
  toggleTab(tab: string): void {
    this.activeTab = tab;
  }
  
  constructor(private recruiterActionService:RecruiterActionService) {
    this.jobSeekerDetailsId = localStorage.getItem("profileID")
   }
  jobSeekerDetailsId: any;


  ngOnInit(): void {
    this.getcompanyviewed()
  }
  storecompanyviewed:any=[];
  storecompanyviewedCount:number=0;
  getcompanyviewed(){
    this.recruiterActionService.getcompanyviewed(this.jobSeekerDetailsId).subscribe((data: any)=>{
      this.storecompanyviewed = data;
      this.storecompanyviewedCount = this.storecompanyviewed.length
      console.log(data,'jkhgfdsdfghjk');
      console.log('jkhgfdsdfghjk',this.storecompanyviewedCount);
    })
  }
}
