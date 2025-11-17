import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Catalogues } from './catalogues';

describe('Catalogues', () => {
  let component: Catalogues;
  let fixture: ComponentFixture<Catalogues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catalogues]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Catalogues);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
