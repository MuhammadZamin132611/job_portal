import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { ProfileEditLanguageService } from '../services/profile-edit-language.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
  styleUrls: ['./edit-language.component.css']
})
export class EditLanguageComponent implements OnInit {
  jobSeekerDetailsId: any;
  userSelectedLanguages: any[] = [];

  errorMsgOflanguage: string;
  selecetedLanguage: string = "English";
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  userSelectedLanguage: any[] = [];
  fluency: any = ' ';
  isAdvance = false;
  isIntermidiate = false;
  isBasic = false;
  isNoEnglish = false;
  isPopupVisibleLanguage = false;
  storeLanguage: any = [];
  storeFluency: any = [];

  constructor(private router: Router, private language: ProfileEditLanguageService, private location1: Location) {
    this.jobSeekerDetailsId = localStorage.getItem("profileID")
    console.log("heeeeee", this.jobSeekerDetailsId)
  }

  goBack(): void {
    this.location1.back();
  }

  ngOnInit(): void {
    this.toGetLanguage();
    this.getSelectedLanguage();
    this.getFluency();
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'connected';
      this.connectionStatus = 'online';
      console.log('Online...');
    }));
    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'No internet connection! ';
      this.connectionStatus = 'offline';
      console.log('Offline...');
    }));
  }

  togglePopupLanguage() {
    this.isPopupVisibleLanguage = !this.isPopupVisibleLanguage
  }

  Language: any = [];
  Language1: any = [];
  toGetLanguage() {
    this.language.getLanguage().subscribe((data) => {
      this.Language = data;
      // this.Language = this.Language1.values;
      console.log("data get ", data)
      this.languageSearch();
      console.log("break")
    });
  }

  //Search language

  searchLanguage: string[] = [...this.Language];
  queryLanguage: string = '';
  languageSearch() {
    this.searchLanguage = this.Language.filter((data: any) => {
      return data.toLowerCase().includes(this.queryLanguage.toLowerCase());
    });
    if (this.searchLanguage.length == 0) {
      this.errorMsgOflanguage = 'assets/images/amico.svg';
    } else {
      this.errorMsgOflanguage = '';
    }
  }

  //get selected  language
  selecetNewLanguage: string[] = []
  OnSelectLanguage(e: any) {
    if (e.target.checked) {
      this.selecetNewLanguage.push(e.target.value)
      console.log("AreaOfInterest  ", this.selecetNewLanguage);
    } else {
      const index = this.selecetNewLanguage.indexOf(e.target.value)
      this.selecetNewLanguage.splice(index, 1)
    }
  }

  //Remove Selected Language

  removeLanguage(e: any) {
    const index = this.selecetNewLanguage.indexOf(e)
    this.selecetNewLanguage.splice(index, 1);
    this.userSelectedLanguage.length = this.Language.length
    for (let j = 0; j < this.Language.length; j++) {
      if (this.Language[j] == e) {
        this.userSelectedLanguage[j] = false
      }
    }
  }

  getSelectedLanguage() {
    this.language.getLanguages(this.jobSeekerDetailsId).subscribe((data) => {
      this.storeLanguage = data;
      console.log(data, "------------------>data get ")
    })
  }

  postLanguages() {
    let data: string[] = [...this.selecetNewLanguage];
    console.log("language ", data);
    this.language.postLanguages(data, this.jobSeekerDetailsId).subscribe(() => {
      console.log("languages Sucessfully posted in Database");
    })
    this.router.navigate(['/dashboard/profile']);
  }

  postFluency() {
    this.language.postFluency(this.fluency, this.jobSeekerDetailsId).subscribe((resp) => {
      console.log("fluency post", resp)
    })
  }

  deleteLanguages(data: any) {
    this.language.deleteLanguages(data, this.jobSeekerDetailsId).subscribe((resp) => {
      console.log(resp);
      this.getSelectedLanguage();
    });
  }

  getFluency() {
    this.language.getFluency(this.jobSeekerDetailsId).subscribe((data) => {
      this.storeFluency = data;
      console.log(data, "------------------>data get ")
      console.log("fluency ", this.storeFluency.englishFluency);
      if (this.storeFluency.englishFluency === 'Advance') {
        console.log('true');
        this.isAdvance = true;
        this.isIntermidiate = false;
        this.isBasic = false;
        this.isNoEnglish = false;
      } else if (this.storeFluency.englishFluency === 'Intermediate') {
        this.isAdvance = false;
        this.isIntermidiate = true;
        this.isBasic = false;
        this.isNoEnglish = false;
      } else if (this.storeFluency.englishFluency === 'Basic') {
        this.isAdvance = false;
        this.isIntermidiate = false;
        this.isBasic = true;
        this.isNoEnglish = false;
      } else if (this.storeFluency.englishFluency === 'No English') {
        this.isAdvance = false;
        this.isIntermidiate = false;
        this.isBasic = false;
        this.isNoEnglish = true;
      } else {
        console.log("Fluency not posted in time of Onboarding")
      }
      this.fluency = this.storeFluency.englishFluency;
    })
  }

  spekingFluency(paragraph: HTMLParagraphElement) {
    this.fluency = paragraph.textContent;
    console.log("Get Fluency", this.fluency);
    // call the update value for send data to input box.
  }




}
