import { Component, OnInit } from '@angular/core';
import { AddAchievementService } from '../services/add-achievement.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-showall-achievements',
  templateUrl: './showall-achievements.component.html',
  styleUrls: ['./showall-achievements.component.css']
})
export class ShowallAchievementsComponent implements OnInit {

  constructor(private addAchive: AddAchievementService, private location1: Location,) { }
  goBack(): void {
    this.location1.back();
  }
  data: any
  ngOnInit(): void {

    let uid = localStorage.getItem('profileID');
    this.addAchive.getAchievement(uid || '').subscribe((dat: any) => {
      this.data = dat
      console.log(dat)
    })

  }

}
