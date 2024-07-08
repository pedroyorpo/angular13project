import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileUIComponent } from './user-profile-ui.component';

describe('UserProfileUIComponent', () => {
  let component: UserProfileUIComponent;
  let fixture: ComponentFixture<UserProfileUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
