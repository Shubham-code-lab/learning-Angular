import { TestBed } from '@angular/core/testing';

import { SubjectMulticastService } from './subject-multicast.service';

describe('SubjectMulticastService', () => {
  let service: SubjectMulticastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectMulticastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
