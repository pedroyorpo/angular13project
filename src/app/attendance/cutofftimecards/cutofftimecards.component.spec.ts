import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutofftimecardsComponent } from './cutofftimecards.component';

describe('CutofftimecardsComponent', () => {
  let component: CutofftimecardsComponent;
  let fixture: ComponentFixture<CutofftimecardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CutofftimecardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CutofftimecardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
