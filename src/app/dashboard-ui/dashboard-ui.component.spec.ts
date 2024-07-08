import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUIComponent } from './dashboard-ui.component';

describe('DashboardUIComponent', () => {
  let component: DashboardUIComponent;
  let fixture: ComponentFixture<DashboardUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
