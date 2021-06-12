import { TestBed } from '@angular/core/testing';

import { FirebaseObtainerService } from './firebase-obtainer.service';

describe('FirebaseObtainerService', () => {
  let service: FirebaseObtainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseObtainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
