import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-boost-your-profile',
  templateUrl: './boost-your-profile.component.html',
  styleUrls: ['./boost-your-profile.component.css']
})
export class BoostYourProfileComponent implements OnInit {

  constructor(private location: Location) {}
  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
  }

}
