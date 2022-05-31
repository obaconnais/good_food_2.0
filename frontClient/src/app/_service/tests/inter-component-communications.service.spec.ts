import { TestBed } from '@angular/core/testing';

import { InterComponentCommunicationsService } from '../inter-component-communications.service';

describe('InterComponentCommunicationsService', () => {
  let service: InterComponentCommunicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterComponentCommunicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
