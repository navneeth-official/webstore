import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { Apis } from './apis';

describe('Apis', () => {
  let service: Apis;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(Apis);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
