import { Component, OnInit } from '@angular/core';
import { ProfileBasicDetailsService } from '../../Services/profile-basic-details.service';
import { ExampleService } from 'src/app/jobseeker/dashboard/services/example.service';
import { EditBasicDetailsService } from './services/edit-basic-details.service';

@Component({
  selector: 'app-profile-basic-details',
  templateUrl: './profile-basic-details.component.html',
  styleUrls: ['./profile-basic-details.component.css']
})
export class ProfileBasicDetailsComponent implements OnInit {
  characterCount: number = 0;
  length: number = 0;
  text: string = '';
  basicDetail:any;
  Data1:any;
  jobData:boolean;

  // ProfileBasicDetailsService: any;
  constructor(private exampleService:ExampleService,private editBasicDetailsService:EditBasicDetailsService ) { }

  ngOnInit(): void {
    this.getBasicDetail();
    // this.gettingData1();
    this.openToWork(true);

  }
 

  getBasicDetail() {
    let ID = localStorage.getItem('profileID');
    console.log("Iddddddddddddddd",ID)
    this.exampleService.apiJcProfile(ID).subscribe((resp:any) => {
      console.log(resp)
      this.basicDetail=resp
      console.log("Nnnnnnnnnnnnnn",this.basicDetail)
   })
 }
 gettingData1() {
   this.exampleService.apiJcProfile1().subscribe((resp:any) => {
     console.log(resp)
     this.Data1=resp
  })
}
  isOpen = false
  OfficeOpen = ()=>{
    this.isOpen = true;
    console.log(this.isOpen)
  }
 
  OfficeClose = ()=>{
    this.isOpen = false
    console.log( this.isOpen)
  }


openToWork(value: any) {
  let ID = localStorage.getItem('profileID');
  this.editBasicDetailsService.openToWork(ID, this.jobData).subscribe((data: any) => {
    console.log("Shoaib+++++++++", data)
  })
}


  
}
