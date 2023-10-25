import { TestBed } from '@angular/core/testing';

import { CatInfoService } from './cat-info.service';

describe('CatInfoService', () => {
  let service: CatInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
