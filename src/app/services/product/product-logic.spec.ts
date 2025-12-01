import { TestBed } from '@angular/core/testing';

import { ProductLogic } from './product-logic';

describe('ProductLogic', () => {
  let service: ProductLogic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductLogic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
