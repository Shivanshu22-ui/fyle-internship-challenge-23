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
  repositories: any = [];
  currentUser: string = 'Shivanshu22-ui';
  pageNumber: number = 1;
  currentPage: number = 1;
  totalRepos!: number;
  totalPages!: number;
  perPage: number = 10;
  profileLoading: boolean = false;
  repoLoading: boolean = false;
  profileError: boolean = false;
  repoError: boolean = false;
  perPageOptions = [5,10,20,50,100]
  constructor(private apiService: ApiService) {}

  @ViewChild('f')
  searchForm!: NgForm;
  ngOnInit(): void {
    this.getUserDetails(this.currentUser);
    this.getUserRepositories(this.currentUser);
    console.log(this.user, 'user', this.repoLoading,this.profileLoading);
  }

  onNext() {
    this.pageNumber++;
  }
  onPrev() {
    this.pageNumber--;
  }
  onPageChange(pg: any) {
    const prevPg = this.currentPage;
    this.currentPage = pg;
    const lengthOfrepos = this.repositories.length;
    console.log(
      lengthOfrepos,
      'repositoriesLength',
      this.currentPage,
      'totoal page',
      this.totalPages
    );

    if (prevPg < this.currentPage && lengthOfrepos < pg * this.perPage)
      this.getUserRepositories(this.currentUser);
  }
  getUserDetails(githubUsername: string) {
    this.profileLoading = true;

    this.apiService.getUser(githubUsername).subscribe(
      (res: any) => {
        this.user = res;
        this.totalRepos = res?.public_repos;
        this.profileLoading = false;
        this.totalPages = Math.ceil(this.totalRepos / this.perPage);
      },
      (err) => {
        console.log(err);
        this.profileLoading = false;
        this.profileError = true;
      }
    );
  }

  getUserRepositories(githubUsername: string) {
    this.repoLoading = true;
    console.log('user', this.repoLoading);
    this.apiService
      .getRepository(githubUsername, this.currentPage, this.perPage)
      .subscribe(
        (res: any) => {
          console.log(res, 'response from github', typeof res);
          this.repositories = [...this.repositories, ...res];
          this.repoLoading = false;
          console.log('user', this.repoLoading);
        },
        (err) => {
          console.log(err);
          this.repoLoading = false;
          console.log('user', this.repoLoading);
        }
      );
  }

  searchGithubUser() {
    this.searchText = this.searchForm.value.search;
    this.currentUser = this.searchForm.value.search;
    this.repositories = [];
    this.user = {}
    this.currentPage = 1;
    this.perPage = 10;
    this.getUserDetails(this.searchText);
    this.getUserRepositories(this.searchText);
  }

  handlePerPageChange() {
    this.repositories = [];
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.totalRepos / this.perPage);
    if(!this.repoError && !this.profileError)this.getUserRepositories(this.currentUser);
  }

  formatDateString(dateString: string): string {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formattedDate;
  }
}
