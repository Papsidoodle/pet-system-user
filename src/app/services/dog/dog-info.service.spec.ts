import { TestBed } from '@angular/core/testing';

import { DogInfoService } from './dog-info.service';

describe('DogInfoService', () => {
  let service: DogInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
