// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { SavedJobsComponent } from './saved-jobs.component';

// describe('SavedJobsComponent', () => {
//   let component: SavedJobsComponent;
//   let fixture: ComponentFixture<SavedJobsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ SavedJobsComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(SavedJobsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


// Import necessary modules and components for testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedJobsComponent } from './saved-jobs.component';
// import { SavedJobsService } from '../saved-jobs.service';
import { of } from 'rxjs';
import { SavedJobsService } from '../../services/saved-jobs.service';

// Describe the component and its behavior
describe('SavedJobsComponent', () => {
  let component: SavedJobsComponent;
  let fixture: ComponentFixture<SavedJobsComponent>;
  let service: SavedJobsService;

  // Configure the module for testing and set up necessary dependencies
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedJobsComponent ],
      providers: [ SavedJobsService ]
    })
    .compileComponents();
  });

  // Create a shared instance of the component and its dependencies for each test
  beforeEach(() => {
    fixture = TestBed.createComponent(SavedJobsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SavedJobsService);
    fixture.detectChanges(); // Always call detectChanges() after creating a fixture
  });

  // Test the getCountOfSavedJobs() method
  it('should retrieve the count of saved jobs', () => {
    // Mock the response from the API
    const mockCount = 5;
    spyOn(service, 'getSavedJobsCount').and.returnValue(of(mockCount));
    
    // Call the method and test the result
    component.getCountOfSavedJobs();
    expect(component.SavedJobsNubmer).toEqual(mockCount);
  });

  // Test the getAllSavedJobs() method
  it('should retrieve a list of saved jobs', () => {
    // Mock the response from the API
    const mockJobs = [
      { id: 1, jobTitle: 'Test Job 1' },
      { id: 2, jobTitle: 'Test Job 2' },
      { id: 3, jobTitle: 'Test Job 3' }
    ];
    spyOn(service, 'getSavedJobs').and.returnValue(of(mockJobs));
    
    // Call the method and test the result
    component.getAllSavedJobs();
    expect(component.storeSavedJobs).toEqual(mockJobs);
  });

  // Test the JobSearch() method
  it('should filter the list of saved jobs by job title', () => {
    // Set up a mock list of saved jobs for testing
    component.storeSavedJobs = [
      { id: 1, jobTitle: 'Test Job 1' },
      { id: 2, jobTitle: 'Test Job 2' },
      { id: 3, jobTitle:'Test Job 3'},
    ]
})
})
