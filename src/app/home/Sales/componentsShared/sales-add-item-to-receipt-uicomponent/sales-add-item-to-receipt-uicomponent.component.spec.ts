import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAddItemToReceiptUIComponentComponent } from './sales-add-item-to-receipt-uicomponent.component';

describe('SalesAddItemToReceiptUIComponentComponent', () => {
  let component: SalesAddItemToReceiptUIComponentComponent;
  let fixture: ComponentFixture<SalesAddItemToReceiptUIComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesAddItemToReceiptUIComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAddItemToReceiptUIComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
