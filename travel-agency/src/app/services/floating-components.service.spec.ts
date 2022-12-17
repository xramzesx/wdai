import { TestBed } from '@angular/core/testing';

import { FloatingComponentsService } from './floating-components.service';

describe('FloatingComponentsService', () => {
  let service: FloatingComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloatingComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
