// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ExampleComponent } from './example.component';

// describe('ExampleComponent', () => {
//   let component: ExampleComponent;
//   let fixture: ComponentFixture<ExampleComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ExampleComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ExampleComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });



import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ExampleComponent } from './example.component';
// import { ExampleService } from './example.service';
// import { Post } from './post.model';

import { ExampleService } from '../../services/example.service';
import { Post } from '../../models/examplePost.model';

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;
  let exampleService: ExampleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ ExampleService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    exampleService = TestBed.inject(ExampleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on init', () => {
    const post: Post = {
      title: 'Test Post', content: 'This is a test post',
    };
    spyOn(exampleService, 'fetchPostfromRepo').and.returnValue(of([post]));
    component.ngOnInit();
    expect(component.loadedPosts.length).toBe(1);
  });

  it('should handle errors on init', () => {
    spyOn(exampleService, 'fetchPostfromRepo').and.returnValue(of());
    component.ngOnInit();
    expect(component.error).toBeTruthy();
  });

  it('should fetch posts on click', () => {
    const post: Post = {
      title: 'Test Post', content: 'This is a test post',
    };
    spyOn(exampleService, 'fetchPostfromRepo').and.returnValue(of([post]));
    component.onFetchPosts();
    expect(component.loadedPosts.length).toBe(1);
  });

  it('should handle errors on click', () => {
    spyOn(exampleService, 'fetchPostfromRepo').and.returnValue(of());
    component.onFetchPosts();
    expect(component.error).toBeTruthy();
  });

  it('should create a post', () => {
    const post: Post = {
      title: 'Test Post', content: 'This is a test post',
      
    };
    spyOn(exampleService, 'createAndStorePost');
    component.onCreatePost(post);
    expect(exampleService.createAndStorePost).toHaveBeenCalled();
  });

  it('should clear posts', () => {
    spyOn(exampleService, 'deletePosts').and.returnValue(of());
    component.onClearPosts();
    expect(component.loadedPosts.length).toBe(0);
  });

  it('should handle errors', () => {
    component.onHandleError();
    expect(component.error).toBeNull();
    expect(component.isFetching).toBe(false);
  });
});

