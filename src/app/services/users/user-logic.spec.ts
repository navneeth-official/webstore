import { TestBed } from '@angular/core/testing';

import { UserLogic } from './user-logic';

describe('UserLogic', () => {
  let service: UserLogic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLogic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
