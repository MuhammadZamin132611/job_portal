import { Component, OnInit } from '@angular/core';
import { AddAchievementService } from './services/add-achievement.service';

@Component({
  selector: 'app-profile-achievements',
  templateUrl: './profile-achievements.component.html',
  styleUrls: ['./profile-achievements.component.css']
})
export class ProfileAchievementsComponent implements OnInit {

  constructor(private achiee:AddAchievementService) { }
  data:any[]=[];
  Allachievement:any=[];
  getachievementCount: number = 0;
  count:number=0;
  
  ngOnInit(): void {

  this.getachievement();
  }
  getachievement(){
    let id = localStorage.getItem('profileID')
    this.achiee.getAchievement(id || '').subscribe((dat:any)=>{
      this.Allachievement=dat
      this.count = this.Allachievement.length || 0  
      this.getachievementCount = this.Allachievement.length;
      console.log("all achivement .....", this.Allachievement);
    })
  }
  

}
