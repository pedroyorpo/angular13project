import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedReceivingDetailUiComponent } from './selected-receiving-detail-ui.component';

describe('SelectedReceivingDetailUiComponent', () => {
  let component: SelectedReceivingDetailUiComponent;
  let fixture: ComponentFixture<SelectedReceivingDetailUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedReceivingDetailUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedReceivingDetailUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
