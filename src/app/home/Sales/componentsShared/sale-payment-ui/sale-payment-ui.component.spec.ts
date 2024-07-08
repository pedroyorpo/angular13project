import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePaymentUIComponent } from './sale-payment-ui.component';

describe('SalePaymentUIComponent', () => {
  let component: SalePaymentUIComponent;
  let fixture: ComponentFixture<SalePaymentUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalePaymentUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePaymentUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
