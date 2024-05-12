import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private defaultHeaders: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.defaultHeaders = new HttpHeaders({
      'Authorization': `Bearer ${environment.authToken}` // Replace with your authentication token
    });
  }


  getUser(githubUsername: string) {
    return this.httpClient.get(
      `${environment.domain}/users/${githubUsername}`,
      { headers: this.defaultHeaders }
    );
  }
  getRepository(githubUsername: string, currentPage: number = 1, per_page: number =10) {
    return this.httpClient.get(
      `${environment.domain}/users/${githubUsername}/repos?page=${currentPage}&per_page=${per_page}`,
      { headers: this.defaultHeaders }
      // `https://api.github.com/users/${githubUsername}/repos`
    );
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params
}
