import { TestBed } from '@angular/core/testing';

import { Apis2 } from './apis';

describe('Apis', () => {
  let service: Apis2;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Apis2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
