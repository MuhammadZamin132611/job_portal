import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 exact:boolean;
 navigationItems = [
    { label: 'Home', iconf: '/assets/images/footericons/homef.svg',iconh: '/assets/images/footericons/homeh.svg',url: '/dashboard' },
    { label: 'Jobs', iconf: '/assets/images/footericons/jobsf.svg',iconh: '/assets/images/footericons/jobsh.svg', url: '/jobs' },
    // { label: 'Services', iconf: '/assets/images/footericons/servicesf.svg',iconh: '/assets/images/footericons/servicesh.svg'},
    { label: 'Services', iconf: '/assets/images/footericons/servicesf.svg',iconh: '/assets/images/footericons/servicesh.svg', url: '/services' },
    { label: 'Gigs', iconf: '/assets/images/footericons/gigsf.svg',iconh: '/assets/images/footericons/gigsh.svg' },
    // { label: 'Gigs', iconf: '/assets/images/footericons/gigsf.svg',iconh: '/assets/images/footericons/gigsh.svg', url: '/gig' },
    { label: 'Club', iconf: '/assets/images/footericons/clubf.svg',iconh: '/assets/images/footericons/clubh.svg' },
    // { label: 'Club', iconf: '/assets/images/footericons/clubf.svg',iconh: '/assets/images/footericons/clubh.svg', url: '/club' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
