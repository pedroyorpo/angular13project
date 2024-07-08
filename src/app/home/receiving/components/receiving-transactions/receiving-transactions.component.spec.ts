import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingTransactionsComponent } from './receiving-transactions.component';

describe('ReceivingTransactionsComponent', () => {
  let component: ReceivingTransactionsComponent;
  let fixture: ComponentFixture<ReceivingTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivingTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
