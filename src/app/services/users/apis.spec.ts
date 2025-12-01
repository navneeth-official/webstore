import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { Apis4 } from './apis';

describe('Apis', () => {
  let service: Apis4;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(Apis4);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
