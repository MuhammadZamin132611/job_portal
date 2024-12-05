import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacy-term-cookies',
  templateUrl: './privacy-term-cookies.component.html',
  styleUrls: ['./privacy-term-cookies.component.css']
})
export class PrivacyTermCookiesComponent implements OnInit {
  @ViewChild('myDiv', {static: true}) myDiv: ElementRef;
  height: any;
    ngAfterViewInit() {
      this.height = this.myDiv.nativeElement.offsetHeight;
       console.log('height',this.height );
    }
  underline1:boolean = true;  
  underline2:boolean = false;
  underline3:boolean = false;

  constructor(private location: Location) { }

  ngOnInit(): void {
 
  }
  goBack(): void {
    this.location.back();
  }

  goDown1() {
    const privacy= document.getElementById("privacy");
    if (privacy) {
      this.underline1 = true;  
      this.underline2= false;
      this.underline3= false;

      privacy.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  goDown2() {
    const terms = document.getElementById("terms");
    if (terms) {
      this.underline1 = false;  
      this.underline2= true;
      this.underline3= false;
      terms.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }
  goDown3() {
    const cookies = document.getElementById("cookies");
    if (cookies) {
      this.underline1 = false;  
      this.underline2= false;
      this.underline3= true;
      cookies.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

}
