import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from "../../../../../environments/environment";
import { ActivatedRoute } from '@angular/router';
import { ReportjobService } from '../../services/reportjob.service';
@Component({
  selector: 'app-report-jobs',
  templateUrl: './report-jobs.component.html',
  styleUrls: ['./report-jobs.component.css']
})
export class ReportJobsComponent implements OnInit {
  report: boolean = false;

  constructor(private location1: Location, private router: ActivatedRoute, private reportjob: ReportjobService) { }

  goBack(): void {
    this.location1.back();
  }
  submitJobs() {

    this.report = !this.report;
  }
  requirementId: any;
  profileId: any;
  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      this.requirementId = params.requirementId;
    });
    this.profileId = localStorage.getItem('profileID')
    // this.requestpermission();
  }
  Msg: string = '';
  Input(msg: any) {
    console.log(msg.target.value);
  }
  checkboxes = [
    {
      question: 'Asking for money [mostly refundable].',
      checked: false
    },
    {
      question: 'Offering easy hiring criteria(on the spot offer, no interview).',
      checked: false
    },
    {
      question: 'Looking for confidential Information (Credit Card/OTP/Aadhar/PAN, etc).',
      checked: false
    },
    {
      question: 'Badly written job ads [incorrect grammar]',
      checked: false
    },
    {
      question: 'Luring with salary beyond expectation.',
      checked: false
    },
    {
      question: 'Using the names of known job portals (fake domains like jobservices004@joblook.com).',
      checked: false
    }
  ]
  togglequestion: string[] = [];
  togglecheckbox(question: { question: string, checked: boolean }) {
    // console.log(question.checked,question.question)
    if (question.checked) {
      this.togglequestion.push(question.question)
      this.validreport()
    }
    else {
      this.togglequestion = this.togglequestion.filter(iteam => iteam !== question.question)
      this.validreport()
    }
    console.log(this.togglequestion)


  }



  count = 0
  message = ""
  validreport() {
    // console.log(this.togglequestion.length)
    this.count = this.togglequestion.length
    if (this.count < 1) {
      console.log(this.count, "count console")
      this.message = "choose any given option"
    }
    else {
      this.message = ""
      // this.reportjobpost()
    }
  }

  postfunction() {
    if (this.count >= 1) {
     
      this.reportjobpost()
    }
  }

  // async requestpermision(){
  //   const messaging = getMessaging()
  //   getToken(messaging,{vapidKey:environment.firebase.vapidKey}).then(
  //     (currentToken)=>{
  //       if(currentToken){
  //         console.log("Current token get",currentToken)
  //       }else{
  //         console.log("No current token please grant the Access token")
  //       }
  //     }
  //   ).catch((err)=>{
  //     console.log("Something will happen wrong when getting",err)
  //   })
  // }
  deviceToken: any;
  async requestpermission() {
    const messaging = getMessaging();
    try {
      const currentToken = await getToken(messaging, { vapidKey: environment.firebase.vapidKey });
      if (currentToken) {
        this.deviceToken = currentToken;
        console.log("Current token get", currentToken);
      } else {
        console.log("No current token. Please grant the Access token");
      }
    } catch (err) {
      console.log("Something went wrong when getting", err);
    }
  }

  // reportjobpost(){
  //   console.log(this.requirementId);

  // }
  async reportjobpost() {
    await this.requestpermission();
    console.log(this.requirementId);
    console.log(this.profileId)
    console.log(this.togglequestion)
    console.log(this.deviceToken)
    this.reportjob.postreportjob(this.deviceToken, this.togglequestion, this.profileId, this.requirementId).subscribe((
      data: any
    ) => {
      console.log(data);
      this.submitJobs()
    })

  }
}

