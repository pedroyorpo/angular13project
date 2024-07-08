import { TestBed } from '@angular/core/testing';

import { SaleDetailsService } from './sale-details.service';

describe('SaleDetailsService', () => {
  let service: SaleDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
