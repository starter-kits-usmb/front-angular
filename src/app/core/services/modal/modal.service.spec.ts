import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';

describe('AuthService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService],
    });
  });

  it('should be created', () => {
    const service: ModalService = TestBed.inject(ModalService);
    expect(service).toBeTruthy();
  });
});
