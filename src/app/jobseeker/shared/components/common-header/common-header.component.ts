import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent implements OnInit {
  exact:boolean=true;

  itemsNavigation = [
  
  { label: 'Home', iconf: '/assets/images/footericons/homeF.png',iconh: '/assets/images/footericons/homeNon.svg',url: '/dashboard' },
  
   { label: 'Jobs', iconf: 'assets/images/footericons/job.png',iconh: '/assets/images/footericons/jobNon.svg', url: '/jobs' },
  
   { label: 'Services', iconf: 'assets/images/footericons/services.svg',iconh: '/assets/images/footericons/servicesNon.svg', url: '/services' },
  
   { label: 'Gigs', iconf: 'assets/images/footericons/Gigs.png',iconh: '/assets/images/footericons/gigsNon.svg', url: '/gig' },
  
   { label: 'Club', iconf: 'assets/images/footericons/Club.png',iconh: '/assets/images/footericons/clubsNon.svg', url: '/club' },
  
  ];
  constructor() { }

  ngOnInit(): void {
  }

  visible: boolean = false;
  showHideUtility() {
    this.visible = this.visible ? false : true;
  }
}
