import { TestBed } from '@angular/core/testing';

import { Api3 } from './api3';

describe('Api3', () => {
  let service: Api3;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Api3);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
