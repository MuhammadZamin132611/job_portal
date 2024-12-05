import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { fakeAsync } from '@angular/core/testing';
import { RecruiterActionService } from './services/recruiter-action.service';

@Component({
  selector: 'app-recruiter-action',
  templateUrl: './recruiter-action.component.html',
  styleUrls: ['./recruiter-action.component.css']
})



export class RecruiterActionComponent implements OnInit {
  showHide: boolean = false;
  showTips:boolean= false;
  openClose = () => this.showHide = !this.showHide;
  activeTab: string = 'tab1';
  profileId: any;
 
  toggleTab(tab: string): void {
    this.activeTab = tab;
  }

  constructor(private location: Location, private api: RecruiterActionService) { this.profileId = localStorage.getItem('profileID') }
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    this.getcount();
    this.getcompanyviewed();
    this.getTotalAction();
  }
  /////////////////Get Count////////////////////
  storecount: any;
  percentage:any;
  getcount() {
    this.api.getTotalCount(this.profileId).subscribe((data: any) => {
      this.storecount = data.count;
      this.percentage= data.doubles;
      console.log("fdyfgygfjhgjhgjhgjh", data)
    })
  }
  /////////////////Company Viewed//////////////////
  storecompanyviewed: any = [];
  storecompanyviewedCount: number = 0;
  getcompanyviewed() {
    this.api.getcompanyviewed(this.profileId).subscribe((data: any) => {
      this.storecompanyviewed = data;
      this.storecompanyviewedCount = this.storecompanyviewed.length
      console.log(data, 'jkhgfdsdfghjk');
      console.log('jkhgfdsdfghjk', this.storecompanyviewedCount);
    })
  }
  ////////////////Total Action///////////////////
  storeRecruiterAction: any = [];
  storeRecruiterActionCount: number = 0;
  getTotalAction() {
    this.api.getTotalRecruiterAction(this.profileId).subscribe((data) => {
      this.storeRecruiterAction = data;
      this.storeRecruiterActionCount = this.storeRecruiterAction.length
      console.log(data, 'jkhgfdsdfghjk');
      console.log('jkhgfdsdfghjk', this.storeRecruiterActionCount);
    })
  }

  openTips(){
    console.log("fgdhjkhgfdhjk")
    this.showTips= !this.showTips;
  }
  closeTips(){
    this.showTips=false;
  }
}
