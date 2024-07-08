import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintReceiptsComponent } from './print-receipts.component';

describe('PrintReceiptsComponent', () => {
  let component: PrintReceiptsComponent;
  let fixture: ComponentFixture<PrintReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintReceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
