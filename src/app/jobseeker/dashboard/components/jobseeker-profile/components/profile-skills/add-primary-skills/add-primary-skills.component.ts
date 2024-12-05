import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { DashboardJobsService } from 'src/app/jobseeker/dashboard/services/dashboard-jobs.service';
import { SkillsService } from 'src/app/jobseeker/services/skills.service';

@Component({
  selector: 'app-add-primary-skills',
  templateUrl: './add-primary-skills.component.html',
  styleUrls: ['./add-primary-skills.component.css']
})
export class AddPrimarySkillsComponent implements OnInit {
  masterDataskills: any = [];
  masterDataskillsFilter: any = [];
  errorMsgOfskills: string = '';
  userselctedskill: any = [];
  selecetedSkills: any = [];
  skillCount: number = 0;


  length: number = 0;
  text: string = '';
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  buttonName: any = 'show';
  show: boolean = false;
  tick: boolean = false;
  existUser: string = '';
  isPopupVisibleSkill = false;

  constructor(private router: Router, private dashboardservice: DashboardJobsService, private api: SkillsService) { }

  recomended = ['Advance Java', 'Node JS', 'Ruby', 'Android SDK', 'Angular', 'DS', 'React Js', 'Spring Boot', 'Rest API']


  selectedSkill = {
    skillName: '',
    rating: 4,
    skillType: 'PRIMARY'
  }
  skills: any[] = [];
  primary: any = [];

  ngOnInit(): void {
    this.getMasterDataSkills();
    this.getSkills();
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'connected';
      this.connectionStatus = 'online';
      console.log('Online...');
    }));
    // this.subscriptions.push(this.offlineEvent.subscribe(e => {
    //   this.connectionStatusMessage = 'No internet connection! ';
    //   this.connectionStatus = 'offline';

    //   console.log('Offline...');
    // }));
  }

  togglePopupSkill() {
    this.isPopupVisibleSkill = !this.isPopupVisibleSkill;
  }

  getSkills() {
    let id = localStorage.getItem('profileID');
    this.dashboardservice.Selectedskills(id).subscribe(data => {
      this.skills = data || [];
      this.skillDifference();
    })


  }

  skillDifference() {
    if (this.skills) {
      this.skills.map((el: any) => {
        if (el.skillType == 'PRIMARY' || el.skillType == null) {
          this.primary.push(el)
        }
      })
    }
  }

  selectSkill(name: string) {

    this.selectedSkill.skillName = name;

  }
  unselectSkill() {
    this.prog(50);
    this.selectedSkill.skillName = '';
  }

  searchedskill: any = null;
  searchselect(name: string) {
    this.searchedskill = name;
  }

  addSkill(data: any) {
    let rep = false;

    this.skills.map((el: any) => {
      if (data.skillName == el.skillName) {
        rep = true;
        return
      }
    })

    if (rep == false) {
      // console.log(data)
      let id = localStorage.getItem('profileID')
      this.dashboardservice.addSkill(id || '', data).subscribe((data) => {
        // alert('sf')  
        this.router.navigate(['/dashboard/profile'])
      })
    } else {
      alert(this.selectedSkill.skillName + ' is already exist !!!')
    }

  }

  ind: any = 50;
  instyle = '';
  prog(ind: any) {
    this.ind = ind;
    this.instyle = ` background: linear-gradient(to right, #00A2E0 0%, #30728C ${ind}%, #eeeeee ${ind}%, #eeeeee 100% );`
  }
  masterSkillsFilter(e: any) {
    console.log(e.value)
    this.masterDataskills = [...this.masterDataskillsFilter.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]
    // console.log("master data filter Skills are --->", this.masterDataskills)
    if (this.masterDataskills.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }

  // OnSelectSkills(e: any) {
  //   if (e.target.checked) {
  //     this.selecetedSkills.push(e.target.value)
  //     this.skillCount=this.selecetedSkills.length;

  //   } else {
  //     const index = this.selecetedSkills.indexOf(e.target.value)
  //     this.selecetedSkills.splice(index, 1)
  //     this.skillCount=this.selecetedSkills.length;
  //   }
  //   // this.ValidationSkill();
  //   console.log("The Selected skills are ", this.selecetedSkills)
  // }

  getMasterDataSkills() {
    this.api.getSkills().subscribe((data: any) => {
      this.masterDataskills = data
      console.log("getting skills from master data is --->", this.masterDataskills)
      this.masterDataskillsFilter = this.masterDataskills
    })
  }

}
