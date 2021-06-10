import { TestBed } from '@angular/core/testing';

import { ViewPortfolioService } from './view-portfolio.service';

describe('ViewPortfolioService', () => {
  let service: ViewPortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewPortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
