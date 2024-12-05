import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddAchievementService } from '../services/add-achievement.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-achievement',
  templateUrl: './add-achievement.component.html',
  styleUrls: ['./add-achievement.component.css'],
  providers: [
    DatePipe
  ]
})
export class AddAchievementComponent implements OnInit {
  isPopupVisibleSkills = false
  skills: any = [];
  startYear: any;
  isPopupVisible1 = false;
  isPopupVisible2 = false;
  DurationForm !: FormGroup;
  startdate: any;
  endYear: any;
  enddate: any;
  difference: any;
  differenceinyears: any;
  DOBB: Date;
  DOBB1: any;
  Popup: any = false;
  isSubmitted: boolean = false;
  profileID: any;
  showEndDate: boolean = true;

  constructor(private location1: Location, private addAchievementService: AddAchievementService, private datePipe: DatePipe, private router: Router, private navigate: Router) { }
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
  ngOnInit(): void {
    this.toGetskills();
  }

  togglePopupSkills() {
    this.isPopupVisibleSkills = !this.isPopupVisibleSkills
  }

  skillfilter: any;
  toGetskills() {
    this.addAchievementService.getSkills().subscribe((data) => {
      this.skills = data;
      console.log("data get ", data)

      console.log("break")
      this.skillfilter = this.skills
    });
  }
  queryLanguage: string = '';
  errorMsgOflanguage: string;
  errorMsgOfskills: string = '';

  masterSkillsFilter(e: any) {
    // console.log(e.value)
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

  // checkduration() {
  //   //console.log("USING BLUE TO CALL THIS METHOD")
  //   const dateOfBirth = new Date(this.DurationForm.controls['startDate'].value);
  //   //console.log("TODSDAJK", dateOfBirth);
  //   const today = new Date();
  //   let age = today.getFullYear() - dateOfBirth.getFullYear();
  //   const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  //   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
  //     age--;
  //   }
  //   if (age < 18) {
  //     this.DurationForm.controls['startDate'].setErrors({ invalidAge: true });
  //   } else {
  //     this.DurationForm.controls['startDate'].setErrors(null);
  //   }
  //   if (age == null) {
  //     this.DurationForm.controls['startDate'].setErrors({ required: true });
  //   }
  // }

  data = {
    date: '' // Initialize data.date to an empty string.
  };

  dateValidation1() {
    if (this.data.date) {
      console.log('Selected Date:', this.data.date);
    }
  }

  // selectedDate: string;
  // displaySelectedDate(event: any) {
  //   this.selectedDate = event.target.value;
  //   console.log('Selected Date:', this.selectedDate);
  // }

  dateValidation() {
    if (this.data.date) {
      console.log('Selected Date:', this.data.date);
    }
  }
  // dateValidation(event: any) {
  //   const selectedDate = event.target.value; // Get the selected date from the input field
  //   console.log('Selected Date:', selectedDate);
  // }
  dob(e: any) {
    console.log(e.detail.value);
    this.DOBB = e.detail.value;
    this.startYear = this.datePipe.transform(this.DOBB, "yyyy-MM-dd");
    // console.log("the Start year", this.startYear);
    // console.log(this.DOBB);
    this.data.date = this.startYear
  }
  dob1(e: any) {
    // console.log(e.detail.value);
    this.DOBB1 = e.detail.value;
    this.endYear = this.datePipe.transform(this.DOBB1, "yyyy-MM-dd");
    // console.log("the end year", this.endYear);
    // console.log(this.endYear);
  }
  formData = new FormData()
  imageUrl: string | ArrayBuffer = '';
  pdfUrl: string | ArrayBuffer = '';

  fileUploaded = false
  setFile(ev: any) {
    this.formData.append('uploadPhoto', ev.target.files[0], ev.target.files[0].name)
    console.log(ev.target.files[0])
    const file = ev.target.files[0];
    const reader = new FileReader();
    this.fileUploaded = true;
    reader.onload = () => {
      if (ev.target.files[0].type.slice(0, 5) == 'image') { this.imageUrl = reader.result || ''; }
      else { this.imageUrl = 'https://assets.dryicons.com/uploads/icon/svg/5923/473dc604-c750-41f5-b394-1b9d1799ff06.svg' }

      //  else{ this.pdfUrl = reader.result || ''}

    };
    reader.readAsDataURL(file);
  }

  achievementDescription = '';
  submited = false;
  // data: any = { date: undefined };
  submit(value: any) {
    this.submited = true
    value.skillsUsed = this.selecetNewLanguage;
    // value.date = this.startYear
    value.achievementDescription = this.achievementDescription
    this.data = value;
    // this.formData.append('skillsUsed',this.selecetNewLanguage)
    this.dateValidation()

    if (this.submited) {
      let form = new FormData()
      let file
      if (this.fileUploaded) {
        file = this.formData.get('uploadPhoto')
      }
      for (let i in value) {
        if (i != 'uploadPhoto') {
          form.append(i, value[i]);
        }
      }
      if (file) {
        form.append('uploadPhoto', file)
      }

      this.formData = form


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
    this.addAchievementService.postAchievement(id || '', this.formData).subscribe((data: any) => {
      console.log('data posted !!', data)
      this.navigate.navigate(['/dashboard/profile'])


    })
  }

  // getting the skills from the Master data




}
