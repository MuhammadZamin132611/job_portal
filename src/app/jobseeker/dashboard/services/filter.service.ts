import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) { }
  masterUrl = environment.masterUrl;


  // Get location form master data
  // getLocation() {
  //   return this.http.get(`${this.masterUrl}locations`);
  // }

  jobSeekerDetailsId: any;
  getLocation() {
    // Retrieve the profile ID from local storage
    this.jobSeekerDetailsId = localStorage.getItem('profileID');
    return this.http.get(`${this.masterUrl}locations`);
  }
  // Get Job Role from master data
  togetJobRole() {
    return this.http.get(`${this.masterUrl}jobs`);
  }
  // Get Industry Type from master data
  getIndustryMasterData() {
    return this.http.get(this.masterUrl + `industry`);
  }

   // Get Employment Type from master data
  getEmploymentType(){
    return this.http.get(this.masterUrl + `employmentType` )
  }


  private filteredData: any[] = [];

  setFilteredData(data: any[]) {
    this.filteredData = data;
  }

  getFilteredData(): any[] {
    return this.filteredData;
  }

  
}
