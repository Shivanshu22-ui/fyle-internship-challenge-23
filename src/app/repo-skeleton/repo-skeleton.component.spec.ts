import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoSkeletonComponent } from './repo-skeleton.component';

describe('RepoSkeletonComponent', () => {
  let component: RepoSkeletonComponent;
  let fixture: ComponentFixture<RepoSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepoSkeletonComponent]
    });
    fixture = TestBed.createComponent(RepoSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
