import { Component, OnInit, ViewChild } from '@angular/core';
// import { RepositoryUserService } from '../repository-user.service';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  user!: any;
  searchText!: string;
  repositories: any;
  pageNumber: any = 1;
  loading: boolean = false;
  constructor(private apiService: ApiService) {}

  @ViewChild('f')
  searchForm!: NgForm;
  ngOnInit(): void {
    this.getUserDetails('Shivanshu22-ui');
    this.getUserRepositories('Shivanshu22-ui');
    console.log(this.user, 'user');
  }

  onNext() {
    this.pageNumber++;
  }
  onPrev() {
    this.pageNumber--;
  }
  onPageChange(pg: any) {
    this.pageNumber = pg;
  }
  getUserDetails(githubUsername: string) {
    this.loading = true;
    // this.repositoryUserService.getUserResponse(githubUsername).then(
    //   (response) => {
    //     this.user = this.repositoryUserService.getUserDetails;
    //     this.loading = false;
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.loading = false;
    //   }
    // );

    this.apiService.getUser(githubUsername).subscribe(
      (res) => {
        console.log(res, 'response from github', typeof res);
        this.user = res;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  getUserRepositories(githubUsername: string) {
    // this.loading = true;
    // this.repositoryUserService.getRepositoryResponse(githubUsername,this.pageNumber).then(
    //   (response) => {
    //     this.repositories = this.repositoryUserService.getRepositoryDetails;
    //     console.log(this.repositories);
    //     // this.loading = false;
    //   },
    //   (error) => {
    //     console.log(error);
    //     // this.loading = false;
    //   }
    // );
    this.apiService.getRepository(githubUsername).subscribe(
      (res) => {
        console.log(res, 'response from github', typeof res);
        this.repositories = res;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  searchGithubUser() {
    this.searchText = this.searchForm.value.search;
    this.getUserDetails(this.searchText);
    this.getUserRepositories(this.searchText);
    // this.repositoryUserService.getUserResponse(this.searchText).then(
    //   (response) => {
    //     this.user = this.repositoryUserService.getUserDetails;
    //     // this.displayUserDetailContainer = true;
    //   },
    //   (error) => {
    //     console.log(error);
    //     // this.displayGithubUserErrorNotFound = true;
    //   }
    // );
  }
}
