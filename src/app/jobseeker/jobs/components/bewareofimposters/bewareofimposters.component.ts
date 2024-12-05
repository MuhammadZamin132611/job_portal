import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bewareofimposters',
  templateUrl: './bewareofimposters.component.html',
  styleUrls: ['./bewareofimposters.component.css']
})
export class BewareofimpostersComponent implements OnInit {
  
  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  goBack(): void {
    this.location.back();
  }
}
