import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReceivingRecordsComponent } from './edit-receiving-records.component';

describe('EditReceivingRecordsComponent', () => {
  let component: EditReceivingRecordsComponent;
  let fixture: ComponentFixture<EditReceivingRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReceivingRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReceivingRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
