import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getUser(githubUsername: string) {
    return this.httpClient.get(
      `https://api.github.com/users/${githubUsername}`
    );
  }
  getRepository(githubUsername: string, currentPage: number = 1, per_page: number =10) {
    return this.httpClient.get(
      `https://api.github.com/users/${githubUsername}/repos?page=${currentPage}&per_page=${per_page}`
      // `https://api.github.com/users/${githubUsername}/repos`
    );
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params
}
