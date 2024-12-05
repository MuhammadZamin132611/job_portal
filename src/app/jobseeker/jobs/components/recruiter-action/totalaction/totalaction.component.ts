import { Component, OnInit } from '@angular/core';
import { RecruiterActionService } from '../services/recruiter-action.service';

@Component({
  selector: 'app-totalaction',
  templateUrl: './totalaction.component.html',
  styleUrls: ['./totalaction.component.css']
})
export class TotalactionComponent implements OnInit {
  jobSeekerDetailsId: any;

  constructor(private recruiterActionService:RecruiterActionService) {
    this.jobSeekerDetailsId = localStorage.getItem("profileID")

   }

  ngOnInit(): void {
    this.getTotalAction()
  }

  storeRecruiterAction:any=[];
  storeRecruiterActionCount:number=0;
  getTotalAction(){
    this.recruiterActionService.getTotalRecruiterAction(this.jobSeekerDetailsId).subscribe((data)=>{
      this.storeRecruiterAction = data;
      this.storeRecruiterActionCount = this.storeRecruiterAction.length
      console.log(data,'jkhgfdsdfghjk');
      console.log('jkhgfdsdfghjk',this.storeRecruiterActionCount);
    })
  }
  

}
