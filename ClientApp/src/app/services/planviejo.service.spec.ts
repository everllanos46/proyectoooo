import { TestBed } from '@angular/core/testing';

import { PlanviejoService } from './planviejo.service';

describe('PlanviejoService', () => {
  let service: PlanviejoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanviejoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
