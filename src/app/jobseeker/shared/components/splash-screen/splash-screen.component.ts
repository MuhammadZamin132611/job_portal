import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {

  constructor(private router:Router) { 
    setTimeout(()=>{
      this.router.navigateByUrl('')
    },3000)
  }

  ngOnInit(): void {
  }

}
