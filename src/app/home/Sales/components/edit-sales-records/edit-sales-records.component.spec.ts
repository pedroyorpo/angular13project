import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalesRecordsComponent } from './edit-sales-records.component';

describe('EditSalesRecordsComponent', () => {
  let component: EditSalesRecordsComponent;
  let fixture: ComponentFixture<EditSalesRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSalesRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalesRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
