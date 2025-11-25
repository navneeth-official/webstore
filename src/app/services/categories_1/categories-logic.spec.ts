import { TestBed } from '@angular/core/testing';

import { CategoriesLogic } from './categories-logic';

describe('CategoriesLogic', () => {
  let service: CategoriesLogic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesLogic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
