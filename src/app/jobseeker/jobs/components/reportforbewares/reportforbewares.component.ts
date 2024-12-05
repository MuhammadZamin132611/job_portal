import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-reportforbewares',
  templateUrl: './reportforbewares.component.html',
  styleUrls: ['./reportforbewares.component.css']
})
export class ReportforbewaresComponent implements OnInit {
  delskill: boolean = false;
  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  deleteSkills() {
    this.delskill = !this.delskill;
  }
  goBack(): void {
    this.location.back();
  }
}
