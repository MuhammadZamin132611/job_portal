// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// 1. Import required Angular modules 
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { HttpClient } from '@angular/common/http';

// 2. Import the environment configuration for URL
import { environment } from 'src/environments/environment';

// Decorate the service class as a root-level service
@Injectable({
  providedIn: 'root'
})
export class LoginEmailService {
  // Define the URL for job seeker profiles from the environment
  jobseekerProfile = environment.jobSeekerUrl

  // Placeholder method for handling email resend (not implemented)
  resend(value: any) {
    throw new Error('Method not implemented.');
  }

  // Declare a private property to hold Cognito user information
  private cognitoUser: CognitoUser & { challengeParam: { email: string } };

  // Get access to the window object in an Angular-friendly way
  private window: Window;

  // Constructor with dependencies injection
  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {
    // Initialize the window property with the default view or the global window object
    this.window = this.document.defaultView || window;
  }

  // Function to sign in using email
  public async signInEmail(email: string) {
    this.cognitoUser = await Auth.signIn(email);
  }

  // Function to sign out the user
  public async signInMobile(email: string) {
    this.cognitoUser = await Auth.signIn(email);
  }

  // Function to sign out the user
  public async signOut() {
    await Auth.signOut();
  }

  // Function to answer a custom authentication challenge
  public async answerCustomChallenge(answer: string) {
    this.cognitoUser = await Auth.sendCustomChallengeAnswer(this.cognitoUser, answer);
    return this.isAuthenticated();
  }

  // Function to get public challenge parameters
  public async getPublicChallengeParameters() {
    return this.cognitoUser.challengeParam;
  }

  // Function to sign up a user using email
  public async signUpEmail(email: string) {
    const params = {
      username: email,
      password: this.getRandomString(30),
    };
    await Auth.signUp(params);
  }

  // Function to sign up a user using mobile (SMS)
  public async signUpMobile(sms: string) {
    const params = {
      username: sms,
      password: this.getRandomString(30),
    };
    await Auth.signUp(params);
  }

  // Function to delete a user's profile
  deleteuseraws(ProfileID: any) {
    Auth.deleteUser();
    return this.http.delete(this.jobseekerProfile + `jobseekerprofile/${ProfileID}/basicDetails`)
  }

  // Function to generate a random string of specified bytes
  private getRandomString(bytes: number) {
    const randomValues = new Uint8Array(bytes);
    this.window.crypto.getRandomValues(randomValues);
    return Array.from(randomValues).map(this.intToHex).join('');
  }

  // Helper function to convert an integer to hexadecimal format
  private intToHex(nr: number) {
    return nr.toString(16).padStart(2, '0');
  }

  // Function to check if a user is authenticated
  public async isAuthenticated() {
    try {
      await Auth.currentSession();
      return true;
    } catch {
      return false;
    }
  }

  // Function to get user details
  public async getUserDetails() {
    if (!this.cognitoUser) {
      this.cognitoUser = await Auth.currentAuthenticatedUser();
    }
    return await Auth.userAttributes(this.cognitoUser);
  }

  // Function to check if an existing user with the given email exists
  getExistUser(email: string) {
    email = email.replace("+", "%2B")
    return this.http.get(this.jobseekerProfile + 'jobseekerprofile/credentials?loginCredentials=' + email)
    //https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/jobseekerprofile/credentials?loginCredentials=%2B918999313549
  }

  // Function to check if an existing user with the given mobile number exists
  getExistUser1(sms: string) {
    return this.http.get(this.jobseekerProfile + 'jobseekerProfile/phoneNumber/' + sms)
  }

  // Function to push email to AWS
  emailpushaws(email: any) {
    return this.http.post(this.jobseekerProfile + `CongnitoUser/{Email}?Email=${email}`, email)
  }

}
