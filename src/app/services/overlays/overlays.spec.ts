import { TestBed } from '@angular/core/testing';

import { Overlays } from './overlays';

describe('Overlays', () => {
  let service: Overlays;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Overlays);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
