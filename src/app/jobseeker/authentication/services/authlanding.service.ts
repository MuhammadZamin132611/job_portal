
// 1. Import required Angular modules 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// 2. Import the environment configuration for URL
import { environment } from 'src/environments/environment';


// Decorate the service class as a root-level service
@Injectable({
  providedIn: 'root'
})
export class AuthlandingService {
  // Constructor with HttpClient dependency injection
  constructor(private http: HttpClient) { }
  // Define the master URL from the environment configuration
  masterUrl = environment.masterUrl

  // Function to fetch language data from the server
  getLanguage() {
    return this.http.get(`${this.masterUrl}languages`);
  }
}
