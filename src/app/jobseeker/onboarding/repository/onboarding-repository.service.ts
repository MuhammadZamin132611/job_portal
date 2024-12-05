import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { workExp } from '../models/work_Exp';

@Injectable({
  providedIn: 'root',
})
export class OnboardingRepositoryService {
  constructor(private http: HttpClient) {}

  fetchIndustries() {
    //Adding ,multiple query params

    let searchParams = new HttpParams();

    searchParams = searchParams.append('print', 'pretty');

    searchParams = searchParams.append('custom', 'key');

    return this.http.get<{ [key: string]: workExp }>(
      environment.masterUrl + `industry`,

      {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello',
          Authorization: 'my-auth-token',
        }),

        params: searchParams,
      }
    );
  }
}
