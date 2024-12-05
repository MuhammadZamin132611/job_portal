import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selected-jobs',
  templateUrl: './selected-jobs.component.html',
  styleUrls: ['./selected-jobs.component.css']
})
export class SelectedJobsComponent implements OnInit {
  showFilters:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  showFilter(){
    this.showFilters = !this.showFilters;
  }

}
