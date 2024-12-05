import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Post } from '../models/examplePost.model';

//DashBoard Repository
//Only One Repo for one module
@Injectable({
  providedIn: 'root'
})
export class ExampleRepoService {

  constructor(private http: HttpClient) { }

  //This layer only does Http requests and returns an Observable to Service/business layer
  //In this case it returns to PostService

  fetchPosts() {
    //Adding ,multiple query params
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty')
    searchParams = searchParams.append('custom', 'key')
    return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-cca09-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello', 'Authorization': 'my-auth-token' }),
        params: searchParams
      })
  }
}
