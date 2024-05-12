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
  repositories: any=[];
  currentUser:string= "Shivanshu22-ui";
  pageNumber: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  loading: boolean = false;
  constructor(private apiService: ApiService) {}

  @ViewChild('f')
  searchForm!: NgForm;
  ngOnInit(): void {
    this.getUserDetails(this.currentUser);
    this.getUserRepositories(this.currentUser);
    console.log(this.user, 'user');
  }

  onNext() {
    this.pageNumber++;
  }
  onPrev() {
    this.pageNumber--;
  }
  onPageChange(pg: any) {
    this.currentPage = pg;
    this.getUserRepositories(this.currentUser)
  }
  getUserDetails(githubUsername: string) {
    this.loading = true;

    this.apiService.getUser(githubUsername).subscribe(
      (res) => {
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
    this.apiService.getRepository(githubUsername,this.currentPage, this.perPage).subscribe(
      (res:any) => {
        console.log(res, 'response from github', typeof res);
        this.repositories = [...this.repositories,...res];
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
    this.currentUser = this.searchForm.value.search;
    this.getUserDetails(this.searchText);
    this.getUserRepositories(this.searchText);
  }


  formatDateString(dateString: string): string {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formattedDate;
  }

  pageFunc(eve:any){
    console.log(eve,"eve");
    
  }
}
