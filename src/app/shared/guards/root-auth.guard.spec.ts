import { TestBed, async, inject } from '@angular/core/testing';

import { RootAuthGuard } from './root-auth.guard';

describe('RootAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RootAuthGuard]
    });
  });

  it('should ...', inject([RootAuthGuard], (guard: RootAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
