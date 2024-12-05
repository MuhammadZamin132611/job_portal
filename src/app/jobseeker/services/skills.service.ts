import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) { }
  masterURL = environment.masterUrl

  getSkills() {
    return this.http.get(`${this.masterURL}skills`)
  }

}
