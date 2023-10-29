import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AuthService);
    service.token = '';
    service.connected = false;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getToken', () => {
    it('should return the token from localStorage if it exist', () => {
      jest
        .spyOn(Object.getPrototypeOf(localStorage), 'getItem')
        .mockReturnValue('token');

      expect(service.getToken()).toBe('token');
    });
    it("should return an empty string if localStorage doesn't have a token", () => {
      jest
        .spyOn(Object.getPrototypeOf(localStorage), 'getItem')
        .mockReturnValue(null);
      expect(service.getToken()).toBe('');
    });
  });
});
