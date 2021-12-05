import { TestBed } from '@angular/core/testing';

import { ShapeTranslatorService } from './shape-translator.service';

describe('ShapeTranslatorService', () => {
  let service: ShapeTranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShapeTranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
