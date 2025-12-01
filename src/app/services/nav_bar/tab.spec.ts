import { TestBed } from '@angular/core/testing';

import { Tab } from './tab';

describe('Tab', () => {
  let service: Tab;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tab);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
