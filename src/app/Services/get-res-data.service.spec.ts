import { TestBed } from '@angular/core/testing';

import { GetResDataService } from './get-res-data.service';

describe('GetResDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetResDataService = TestBed.get(GetResDataService);
    expect(service).toBeTruthy();
  });
});
