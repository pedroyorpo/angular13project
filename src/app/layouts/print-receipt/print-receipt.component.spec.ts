import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintReceiptComponent } from './print-receipt.component';

describe('PrintReceiptComponent', () => {
  let component: PrintReceiptComponent;
  let fixture: ComponentFixture<PrintReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
