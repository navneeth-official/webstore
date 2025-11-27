import { TestBed } from '@angular/core/testing';

import { Apis5 } from './apis5';

describe('Apis5', () => {
  let service: Apis5;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Apis5);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
