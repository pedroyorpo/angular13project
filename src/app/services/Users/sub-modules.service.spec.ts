import { TestBed } from '@angular/core/testing';

import { SubModulesService } from './sub-modules.service';

describe('SubModulesService', () => {
  let service: SubModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
