import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { of, take, throwError } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AuthService);
    //override private for testing
    (service as any)._token = '';
    (service as any)._connected = false;
    localStorage.removeItem('token');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setupFromLocalStorage', () => {
    it('should setup the token from localStorage if it exist', () => {
      jest
        .spyOn(Object.getPrototypeOf(localStorage), 'getItem')
        .mockReturnValue('token');
      (service as any).setupFromLocalStorage();
      expect(service.token).toBe('token');
    });
    it("should set the token as a empty string if localStorage doesn't have a token", () => {
      jest
        .spyOn(Object.getPrototypeOf(localStorage), 'getItem')
        .mockReturnValue(null);
      (service as any).setupFromLocalStorage();
      expect(service.token).toBe('');
    });
  });

  describe('isTokenValid', () => {
    it('should return true if token is valid', () => {
      jest
        .spyOn((service as any).http, 'get')
        .mockReturnValue(of({ id: 'xx' }));

      service.isTokenValid().subscribe(res => {
        expect(res).toBe(true);
      });
    });
    it('should return false if token is not valid', () => {
      jest
        .spyOn((service as any).http, 'get')
        .mockReturnValue(of(throwError(() => new Error('invalid token'))));

      service.isTokenValid().subscribe(res => {
        expect(res).toBe(true);
      });
    });
  });

  describe('login', () => {
    it('should return true if login is successful', () => {
      jest
        .spyOn((service as any).http, 'post')
        .mockReturnValue(of({ token: 'xxx' }));

      service.login('login', 'password').subscribe(res => {
        expect(res).toBe(true);
      });
    });
    it('should return false if login is not successful', () => {
      jest
        .spyOn((service as any).http, 'post')
        .mockReturnValue(of(throwError(() => new Error('invalid login'))));

      service.login('login', 'password').subscribe(res => {
        expect(res).toBe(false);
      });
    });
    it('should update attribute and localstorage corretly if logged in', () => {
      jest
        .spyOn((service as any).http, 'post')
        .mockReturnValue(of({ token: 'xxxx' }));

      service.login('login', 'password').subscribe(res => {
        expect(service.token).toBe('xxxx');
        expect(service.connected).toBe(true);
        expect(localStorage.getItem('token')).toBe('xxxx');
      });
    });

    it('should update attribute and localstorage corretly if not logged in', () => {
      jest
        .spyOn((service as any).http, 'post')
        .mockReturnValue(of(throwError(() => new Error('invalid login'))));

      service.login('login', 'password').subscribe(res => {
        expect(service.token).toBe('');
        expect(service.connected).toBe(false);
        expect(localStorage.getItem('token')).toBe(null);
      });
    });
  });

  describe('register', () => {
    it('should return true if register is successful', () => {
      jest
        .spyOn((service as any).http, 'post')
        .mockReturnValue(of({ id: 'xxx' }));
      service.register('login', 'password').subscribe(res => {
        expect(res).toBe(true);
      });
    });
    it('should return false if register is not successful', () => {
      jest
        .spyOn((service as any).http, 'post')
        .mockReturnValue(of(throwError(() => new Error('invalid register'))));
      service.register('login', 'password').subscribe(res => {
        expect(res).toBe(false);
      });
    });
  });

  describe('logout', () => {
    it('should update attribute and localstorage corretly', () => {
      service.logout();
      expect(service.token).toBe('');
      expect(service.connected).toBe(false);
      expect(localStorage.getItem('token')).toBe(null);
    });
  });
});
