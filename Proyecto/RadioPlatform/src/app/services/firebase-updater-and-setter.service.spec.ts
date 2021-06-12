import { TestBed } from '@angular/core/testing';

import { FirebaseUpdaterAndSetterService } from './firebase-updater-and-setter.service';

describe('FirebaseUpdaterAndSetterService', () => {
  let service: FirebaseUpdaterAndSetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseUpdaterAndSetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
