import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllButtonsComponent } from './all-buttons.component';

describe('AllButtonsComponent', () => {
  let component: AllButtonsComponent;
  let fixture: ComponentFixture<AllButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
