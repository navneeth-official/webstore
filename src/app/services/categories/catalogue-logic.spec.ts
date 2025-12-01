import { TestBed } from '@angular/core/testing';

import { CatalogueLogic } from './catalogue-logic';

describe('CatalogueLogic', () => {
  let service: CatalogueLogic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogueLogic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
