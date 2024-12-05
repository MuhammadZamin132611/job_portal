// 1. Imports - Angular Framework - Mandatory

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  profileId: string; // This property holds the profile ID.

  constructor() {}

  // Setter method to set the profile ID.
  setProfileId(data: any) {
    this.profileId = data;
  }

  // Getter method to get the profile ID.
  getProfileId() {
    return this.profileId;
  }
}
