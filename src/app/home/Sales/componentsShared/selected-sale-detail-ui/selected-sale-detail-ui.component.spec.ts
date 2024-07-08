import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedSaleDetailUIComponent } from './selected-sale-detail-ui.component';

describe('SelectedSaleDetailUIComponent', () => {
  let component: SelectedSaleDetailUIComponent;
  let fixture: ComponentFixture<SelectedSaleDetailUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedSaleDetailUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedSaleDetailUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
