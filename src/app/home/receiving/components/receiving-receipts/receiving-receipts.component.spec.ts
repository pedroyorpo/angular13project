import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingReceiptsComponent } from './receiving-receipts.component';

describe('ReceivingReceiptsComponent', () => {
  let component: ReceivingReceiptsComponent;
  let fixture: ComponentFixture<ReceivingReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivingReceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
