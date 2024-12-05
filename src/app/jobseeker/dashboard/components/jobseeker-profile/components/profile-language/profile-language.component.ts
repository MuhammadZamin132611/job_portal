import { Component, OnInit } from '@angular/core';
import { ProfileLanguageService } from 'src/app/jobseeker/dashboard/services/profile-language.service';

@Component({
  selector: 'app-profile-language',
  templateUrl: './profile-language.component.html',
  styleUrls: ['./profile-language.component.css']
})
export class ProfileLanguageComponent implements OnInit {
  jobSeekerDetailsId:any;
  storeLanguages: any = [];
  storeFluency: any = [];
  fluency:any;
  fluencyLevel:any;

  constructor(private profileLanguageService:ProfileLanguageService) {
    this.jobSeekerDetailsId = localStorage.getItem("profileID")
    console.log("heeeeee", this.jobSeekerDetailsId)
   }

  ngOnInit(): void {
    this.getAllLanguages();
    this.getAllFluency();
  }


  getAllLanguages() {
    this.profileLanguageService.getLanguages(this.jobSeekerDetailsId).subscribe((data) => {
      this.storeLanguages = data;
      console.log(data, "------------------>language data ")
    })
  }

  getAllFluency() {
    this.profileLanguageService.getFluency(this.jobSeekerDetailsId).subscribe((data) => {
      this.storeFluency = data;
      console.log(data, "------------------>fluency data")
      this.fluency=this.storeFluency.englishFluency;
      if(this.fluency=='Intermediate'){
        this.fluencyLevel='You can have a conversation in English on some topics';
      }
      else if(this.fluency=='Advance'){
        this.fluencyLevel='You can do your entire job in English and speak fluently';

      }
      else if(this.fluency=='Basic'){
        this.fluencyLevel='You can understand/speak basic sentences ';
      }
      else{
        this.fluencyLevel='';  
      }
      
    })
  }
}
