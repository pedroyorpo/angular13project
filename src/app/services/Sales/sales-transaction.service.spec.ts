import { TestBed } from '@angular/core/testing';

import { SalesTransactionService } from './sales-transaction.service';

describe('SalesTransactionService', () => {
  let service: SalesTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
