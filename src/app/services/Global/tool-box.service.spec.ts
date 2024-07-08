import { TestBed } from '@angular/core/testing';

import { ToolBoxService } from './tool-box.service';

describe('ToolBoxService', () => {
  let service: ToolBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
