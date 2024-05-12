import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { ProfileSkeletonComponent } from './profile-skeleton/profile-skeleton.component';
import { RepoSkeletonComponent } from './repo-skeleton/repo-skeleton.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ProfileSkeletonComponent,
    RepoSkeletonComponent,
    ErrorComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
