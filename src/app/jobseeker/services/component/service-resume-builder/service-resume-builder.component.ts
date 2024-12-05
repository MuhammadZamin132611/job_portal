import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-service-resume-builder',
  templateUrl: './service-resume-builder.component.html',
  styleUrls: ['./service-resume-builder.component.css']
})
export class ServiceResumeBuilderComponent implements OnInit {

  constructor(private location: Location) {}
  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
  }

}
