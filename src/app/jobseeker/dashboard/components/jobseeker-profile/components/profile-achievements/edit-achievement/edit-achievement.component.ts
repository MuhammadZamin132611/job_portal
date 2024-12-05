import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddAchievementService } from '../services/add-achievement.service';
import { ActivatedRoute, Navigation, NavigationEnd, Router } from '@angular/router';
import { EditAchievementService } from '../services/edit-achievement.service';
import { forceUpdate } from 'ionicons/dist/types/stencil-public-runtime';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-achievement',
  templateUrl: './edit-achievement.component.html',
  styleUrls: ['./edit-achievement.component.css'],
  providers: [
    DatePipe
  ]
})
export class EditAchievementComponent implements OnInit {
  isPopupVisibleSkills = false
  skills: any = [];
  startYear: any
  isPopupVisible1 = false;
  isPopupVisible2 = false;
  DurationForm !: FormGroup;
  startdate: any;
  endYear: any;
  enddate: any;
  difference: any;
  differenceinyears: any;
  DOBB: any;
  DOBB1: any;
  Popup: any = false;
  isSubmitted: boolean = false;
  profileID: any;
  showEndDate: boolean = true;
  del: boolean = false;

  delskill: boolean = false;

  constructor(private location1: Location, private editAchievementService: EditAchievementService, private addAchievementService: AddAchievementService, private datePipe: DatePipe, private router: ActivatedRoute, private navigate: Router) { }
  goBack(): void {
    this.location1.back();
  }
  // dob(e: any) {
  //   console.log(e.detail.value);
  //   this.DOBB = e.detail.value;
  //   this.startYear = this.datePipe.transform(this.DOBB, "yyyy-MM-dd");
  //   console.log("the Start year", this.startYear);
  //   console.log(this.DOBB);
  // }
  deletePopup() {
    this.delskill = !this.delskill;

  }
  certId = ''
  cerdata: any;
  ngOnInit(): void {
    this.toGetskills();
    let uid = localStorage.getItem('profileID')
    this.router.queryParams.subscribe((res: any) => {
      this.certId = res.achievementId
      // console.log(res.achievementId)
      this.addAchievementService.getSingleAchiemnt(uid || "", this.certId).subscribe(dat => {
        this.cerdata = dat;
        this.startYear = this.cerdata.date;
        this.DOBB = this.cerdata.date
        this.selecetNewLanguage = this.cerdata.skillsUsed
        this.data.uploadPhoto = this.cerdata.uploadPhoto
        this.achievementDescription = this.cerdata.achievementDescription

        this.imageUrl = 'https://job-check.s3.ap-south-1.amazonaws.com/' + this.cerdata.uploadPhoto;
        console.log(dat, 'achivement data' )
        console.log(this.cerdata.date, 'check date')
      })
    })
  }
  

  togglePopupSkills() {
    this.isPopupVisibleSkills = !this.isPopupVisibleSkills
  }

  data1 = {
    date: new Date() // Set the initial date if needed
  };
  selectedDate:string
  checkDateduration(event:any) {
    this.selectedDate = event.target.value
    if(this.data1.date){
      console.log(this.data1.date);
    }
  }
  skillfilter: any;
  errorMsgOflanguage: string;
  errorMsgOfskills: string = '';

  toGetskills() {
    this.addAchievementService.getSkills().subscribe((data) => {
      this.skills = data;
      console.log("data get ", data)

      console.log("break")
      this.skillfilter = this.skills
    });
  }
  queryLanguage: string = '';


  masterSkillsFilter(e: any) {
    console.log(e.value)
    this.skills = [
      ...this.skillfilter.filter((user: any) =>
        user.toLowerCase().includes(e.value.toLowerCase())
      ),
    ];
    // console.log("master data filter Skills are --->", this.masterDataskills)
    if (this.skills.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }

  selecetNewLanguage: string[] = []
  userSelectedLanguage: any[] = [];

  OnSelectLanguage(e: any) {
    if (e.target.checked) {
      this.selecetNewLanguage.push(e.target.value)
      console.log("AreaOfInterest  ", this.selecetNewLanguage);
    } else {
      const index = this.selecetNewLanguage.indexOf(e.target.value)
      this.selecetNewLanguage.splice(index, 1)
    }
  }

  removeLanguage(e: any) {
    const index = this.selecetNewLanguage.indexOf(e)
    this.selecetNewLanguage.splice(index, 1);
    this.userSelectedLanguage.length = this.skills.length
    for (let j = 0; j < this.skills.length; j++) {
      if (this.skills[j] == e) {
        this.userSelectedLanguage[j] = false
      }
    }
  }
  togglePopup1() {

    this.isPopupVisible1 = !this.isPopupVisible1;

  }
  togglePopup2() {

    this.isPopupVisible2 = !this.isPopupVisible2;

  }
  checkduration() {
    //console.log("USING BLUE TO CALL THIS METHOD")
    const dateOfBirth = new Date(this.DurationForm.controls['startDate'].value);
    //console.log("TODSDAJK", dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    if (age < 18) {
      this.DurationForm.controls['startDate'].setErrors({ invalidAge: true });
    } else {
      this.DurationForm.controls['startDate'].setErrors(null);
    }
    if (age == null) {
      this.DurationForm.controls['startDate'].setErrors({ required: true });
    }
  }
  checkduration1() {
    //console.log("USING BLUE TO CALL THIS METHOD")
    const dateOfBirth = new Date(this.DurationForm.controls['endDate'].value);
    //console.log("TODSDAJK", dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    if (age < 18) {
      this.DurationForm.controls['endDate'].setErrors({ invalidAge: true });
    } else {
      this.DurationForm.controls['endDate'].setErrors(null);
    }
    if (age == null) {
      this.DurationForm.controls['endDate'].setErrors({ required: true });
    }
  }


  dob(e: any) {
    console.log(e.detail.value);
    this.DOBB = e.detail.value;
    this.startYear = this.datePipe.transform(this.DOBB, "yyyy-MM-dd");
    console.log("the Start year", this.startYear);
    console.log(this.DOBB);
  }


  dateDidderence() {
    this.startdate = new Date(this.startYear)
    this.enddate = new Date(this.endYear)
    this.difference = Math.floor(this.enddate - this.startdate)
    console.log("=====>", this.difference)
    this.differenceinyears = Math.floor((this.difference / (1000 * 3600 * 24)) / 365);
    console.log("=====>", this.differenceinyears)
  }

  formData = new FormData()
  imageUrl: string | ArrayBuffer = '';
  pdfUrl: string | ArrayBuffer = '';
  fileadded = false
  setFile(ev: any) {
    this.formData.append('uploadPhoto', ev.target.files[0], ev.target.files[0].name)
    console.log(ev.target.files[0])
    const file = ev.target.files[0];
    const reader = new FileReader();
    this.fileadded = true

    reader.onload = () => {
      if (ev.target.files[0].type.slice(0, 5) == 'image') { this.imageUrl = reader.result || ''; }
      else { this.imageUrl = 'https://assets.dryicons.com/uploads/icon/svg/5923/473dc604-c750-41f5-b394-1b9d1799ff06.svg' }

      //  else{ this.pdfUrl = reader.result || ''}

    };
    reader.readAsDataURL(file);
  }
  // 
  achievementDescription = '';
  submited = false;
  data: any = { date: undefined };
  submit(value: any) {
    this.submited = true
    value.skillsUsed = this.selecetNewLanguage;
    // value.date = this.startYear
    value.date = this.selectedDate
    value.achievementDescription = this.achievementDescription
    this.data = value;
    // this.checkDateduration()
    // this.formData.append('skillsUsed',this.selecetNewLanguage)

    // if(!this.fileadded)
    //   this.formData.append('uploadPhoto',this.cerdata.uploadPhoto)

    if (this.submited) {

      let file;
      if (this.fileadded) {
        file = this.formData.get('uploadPhoto');
      }

      let formData = new FormData();
      for (let i in value) {
        if (i != 'uploadPhoto') {
          formData.append(i, value[i]);
        }
      }

      if (file) {
        formData.append('uploadPhoto', file)
      }
      this.formData = formData;



    } else {

      for (let i in value) {
        if (i != 'uploadPhoto') {
          this.formData.append(i, value[i]);
        }
      }
    }

    console.log(value, this.formData)

  }


  postData() {
    console.log('clicked')
    let id = localStorage.getItem('profileID')
    this.addAchievementService.updateAcheivement(id || '', this.cerdata.achievementId, this.formData).subscribe((res) => {
      console.log('data updated !!', this.formData, res)

      this.navigate.navigate(['/dashboard/profile/achievements/showall-achievement'])
    })
  }
  deleteAchievement() {
    let uid = localStorage.getItem("profileID");
    // this.IsShow = true;
    this.editAchievementService.deleteAchievement(uid || '', this.cerdata.achievementId, this.formData).subscribe((resp: any) => {
      console.log("resp", resp)
      this.navigate.navigate(['/dashboard/profile'])


    });
  }
}
