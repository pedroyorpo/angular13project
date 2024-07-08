import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReceiptUIComponent } from './sales-receipt-ui.component';

describe('SalesReceiptUIComponent', () => {
  let component: SalesReceiptUIComponent;
  let fixture: ComponentFixture<SalesReceiptUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesReceiptUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReceiptUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
