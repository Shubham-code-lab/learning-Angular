import { TestBed } from '@angular/core/testing';

import { TempfunGuard } from './tempfun.guard';

describe('TempfunGuard', () => {
  let guard: TempfunGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TempfunGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
