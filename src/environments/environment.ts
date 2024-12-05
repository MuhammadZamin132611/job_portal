// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /////////////////////////////////////////////////////////////////////////////////////
  region: 'ap-south-1',
  userPoolId: 'ap-south-1_sTiFt1YLU',
  userPoolWebClientId: '6luadpdb8gtli8sekcm18q9ou9',
  //////////////////////////////////////////////////////////////////////////////////////
  masterUrl: 'https://masterdata.dev.jobcheck.in/masterdatabase/',

  jobseeker:
    'https://jobseeker-service.dev.jobcheck.in/jobseekerservice/jobseeker/',


  recruiters: `https://requirement-service.dev.jobcheck.in/requirement/`,

  pushnotificationUrl:
    'https://pushnotification-service.dev.jobcheck.in/notification/',

  jobSeekerUrl:
    'https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/',

  jobseekerprofileUrl:
    'https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/',
  jobseekersProfile:
    'https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/jobseekerprofile/',

  personalBioUrl:
    'https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/jobseekerprofile/basicdetail',
  phoneURL: `https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/jobseekerProfile/phoneNumbers/`,
  emailURL: `https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/jobseekerProfile/emails/`,
  /////////////////////////////////////////////////////////////////////////////////////
  notificationUrl:
    'https://pushnotification-service.dev.jobcheck.in/notification/',
  //////////////////////////////////////////////////////////////////////////////////////

  jobseekerUrl1: `https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/jobseekerprofile/`,
  // https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/jobseekerprofile/

  firebase: {
    apiKey: 'AIzaSyBL0He7jgMLUfZEOvlwf1Vb8XQ__2dBqlc',
    authDomain: 'jobcheck-5a444.firebaseapp.com',
    projectId: 'jobcheck-5a444',
    storageBucket: 'jobcheck-5a444.appspot.com',
    messagingSenderId: '1064882293623',
    appId: '1:1064882293623:web:f1ebbe6449a1135d43ef72',
    measurementId: 'G-6M9BR2Q953',
    vapidKey:
      'BNLVzxpmCIlJAi-zhlq84wdOdL3UUwfAiW_QKCXOn9MxoakvzJz6sUP367FXn3HUh4v9a-1Ta8kzf_ObEcDRLvo',
  },

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
