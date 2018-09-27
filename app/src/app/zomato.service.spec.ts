import { TestBed, inject } from '@angular/core/testing';

import { ZomatoService } from './zomato.service';
import { HttpClientModule } from '@angular/common/http'

describe('ZomatoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZomatoService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([ZomatoService], (service: ZomatoService) => {
    expect(service).toBeTruthy();
  }));
});
