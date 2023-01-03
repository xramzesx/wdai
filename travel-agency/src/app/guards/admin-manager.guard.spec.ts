import { TestBed } from '@angular/core/testing';

import { AdminManagerGuard } from './admin-manager.guard';

describe('AdminManagerGuard', () => {
  let guard: AdminManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
