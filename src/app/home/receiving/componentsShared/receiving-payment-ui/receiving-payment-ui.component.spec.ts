import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingPaymentUIComponent } from './receiving-payment-ui.component';

describe('ReceivingPaymentUIComponent', () => {
  let component: ReceivingPaymentUIComponent;
  let fixture: ComponentFixture<ReceivingPaymentUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivingPaymentUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingPaymentUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
