import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersUIComponent } from './customers-ui.component';

describe('CustomersUIComponent', () => {
  let component: CustomersUIComponent;
  let fixture: ComponentFixture<CustomersUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
