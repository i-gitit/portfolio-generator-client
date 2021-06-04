import { TestBed } from '@angular/core/testing';

import { BuildPortfolioService } from './build-portfolio.service';

describe('BuildPortfolioService', () => {
  let service: BuildPortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildPortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
