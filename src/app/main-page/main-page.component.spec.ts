import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [MainPageComponent],
      providers:[ApiService]
    }).compileComponents();
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user details', () => {
    const userDetails = {
      login: 'Shivanshu22-ui',
      name: 'Shivanshu Singh',
    };
  
    component.user = userDetails;
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.username').textContent).toContain(userDetails.login);
    expect(compiled.querySelector('.name').textContent).toContain(userDetails.name);
    // Add more expectations for other user details...
  });
});
