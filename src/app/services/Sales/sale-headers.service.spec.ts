import { TestBed } from '@angular/core/testing';

import { SaleHeadersService } from './sale-headers.service';

describe('SaleHeadersService', () => {
  let service: SaleHeadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleHeadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
