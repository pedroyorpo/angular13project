import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersUiComponent } from './suppliers-ui.component';

describe('SuppliersUiComponent', () => {
  let component: SuppliersUiComponent;
  let fixture: ComponentFixture<SuppliersUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
