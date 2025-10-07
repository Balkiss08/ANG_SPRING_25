import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pcGuard } from './pc.guard';

describe('pcGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => pcGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
