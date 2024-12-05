import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-top-company',
  templateUrl: './top-company.component.html',
  styleUrls: ['./top-company.component.css']
})
export class TopCompanyComponent implements OnInit {

  constructor(private location: Location) {}
  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
  }

}
