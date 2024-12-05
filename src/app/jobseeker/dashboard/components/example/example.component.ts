import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/examplePost.model';
import { of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExampleService } from '../../services/example.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  loadedPosts: Post[] = [];
  modifiedData: String[] = [];
  isFetching = false;
  error = null;



  constructor(private http: HttpClient, private postsService: ExampleService) { }

  ngOnInit(): void {
    this.isFetching = true;
    this.postsService.fetchPostfromRepo().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }
      , error => {
        this.isFetching = false;
        this.error = error.message;
        console.log(error);
      }
    );
  }

  //This layer is where Subscription to the observable will happen
  //This layer contacts to Service layer to get the transformed data
  //TAKE ONLY onFetchPosts() as example
  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPostfromRepo().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    }
    );
  }

  //What not to do
  //returning a Subscription from Service
  onCreatePost(postData: Post) {
    // Send Http request
    //If we Return this function we get a Subscription 
    this.postsService.createAndStorePost(postData);

  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = null;
    this.isFetching = false;
  }


}
