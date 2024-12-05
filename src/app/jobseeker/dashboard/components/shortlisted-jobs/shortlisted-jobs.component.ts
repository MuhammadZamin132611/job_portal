import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shortlisted-jobs',
  templateUrl: './shortlisted-jobs.component.html',
  styleUrls: ['./shortlisted-jobs.component.css']
})
export class ShortlistedJobsComponent implements OnInit {
  showFilters:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  showFilter(){
    this.showFilters = !this.showFilters;
  }

}
