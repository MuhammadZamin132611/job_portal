import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileJobPreferenceService } from '../../Services/profile-job-preference.service';

@Component({
  selector: 'app-profile-job-preference',
  templateUrl: './profile-job-preference.component.html',
  styleUrls: ['./profile-job-preference.component.css']
})
export class ProfileJobPreferenceComponent implements OnInit {
  jobSeekerDetailsId: any;
  constructor(private router: Router, private jobPreference: ProfileJobPreferenceService) {
    this.jobSeekerDetailsId = localStorage.getItem("profileID")
    console.log("heeeeee", this.jobSeekerDetailsId)
  }

  ngOnInit(): void {

    this.getLocation();
    this.allareaofInterest();
  }

  getAllLocation: any = [];
  primaryL:any;
  secondryL:any;
  getLocation() {
    this.jobPreference.prefLocation(this.jobSeekerDetailsId).subscribe((resp) => {
      this.getAllLocation = resp;
      this.primaryL = this.getAllLocation.primaryLocation
      this.secondryL = this.getAllLocation.secondaryLocation
      console.log("dddsdsfdfssdfd", resp)
      console.log("dbvcfxc=======>>", this.getAllLocation)
    })
  }

  getAllAreaofIntersets: any = [];
  allareaofInterest() {
    this.jobPreference.areaOfInterest(this.jobSeekerDetailsId).subscribe((resp) => {
      this.getAllAreaofIntersets = resp
      console.log("dddsdsfdfssdfd", resp)
      console.log("dbvcfxc=======>>", this.getAllAreaofIntersets[0].areaOfInterestName)
    })
  }



}
