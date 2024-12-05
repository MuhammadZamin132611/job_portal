// 1. Imports - Angular Framework - Mandatory
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  BehaviorSubject,
  fromEvent,
  Observable,
  Subscription,
  catchError,
} from 'rxjs';

// 2. Imports - JobCheck Modules - Optional
// None

// 3. Imports - JobCheck Services - Mandatory
import { ResumeService } from '../../services/resume.service';
import { Location } from '@angular/common';
import { locationDetails } from '../../models/location';

// 4. Imports - Exception Classes - Optional
// None

@Component({
  selector: 'app-onboarding-upload-resume',
  templateUrl: './onboarding-upload-resume.component.html',
  styleUrls: ['./onboarding-upload-resume.component.css'],
})
export class OnboardingUploadResumeComponent implements OnInit {
  constructor(private resume: ResumeService, private location: Location) {}
  // Variables for tracking online and offline events
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  buttonName: any;
  show: boolean = false;
  tick: boolean = false;

  // Lifecycle hook - ngOnInit

  ngOnInit(): void {
    // Observables for tracking online and offline events.
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    // Subscribe to online and offline events to track connectivity status.
    this.subscriptions.push(
      this.onlineEvent.subscribe((e) => {
        this.connectionStatusMessage = 'connected';
        this.connectionStatus = 'online';
        // Clear the connection status message after 2 seconds
        setTimeout(() => {
          this.connectionStatusMessage = '';

          this.connectionStatus = '';
        }, 2000);
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe((e) => {
        this.connectionStatusMessage = 'No internet connection! ';
        this.connectionStatus = 'offline';

        console.log('Offline...');
      })
    );
  }

  loadMsg = '';

  imageErrMsg = false;
  selectedFiles: any;
  pdfUrl: any;
  // Function to handle file selection.
  setFile(ev: any) {
    var mimeType = ev.target.files[0].type;
    // Check if the selected file is a PDF.
    if (mimeType != 'application/pdf') {
      this.imageErrMsg = true;
      return;
    }
    this.loadMsg = 'Please Wait ...';
    this.imageErrMsg = false;
    // Create a FormData object to send the file to the server.
    const formData = new FormData();
    let file = ev.target.files[0];
    formData.append('file', file, file.name);
    // Upload the resume to the server.
    const uid = localStorage.getItem('profileID');
    this.resume.uploadResume(formData, uid || '').subscribe((dat: any) => {
      // Construct the URL for the uploaded PDF.
      this.pdfUrl =
        'https://job-check.s3.ap-south-1.amazonaws.com/' + dat.value;
      // Show success message.
      this.showMsgs();
    });
  }

  // Function to display success message after resume upload.
  showMsgs() {
    this.loadMsg = 'Resume Uploaded !! ';
    // Navigate back to the previous page after 2 seconds.
    setTimeout(() => {
      this.location.back();
    }, 2000);
  }
  // Function to skip resume upload.
  skip() {
    this.location.back();
  }
}
