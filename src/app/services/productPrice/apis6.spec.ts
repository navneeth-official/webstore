import { TestBed } from '@angular/core/testing';

import { Apis6 } from './apis6';

describe('Apis6', () => {
  let service: Apis6;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Apis6);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
