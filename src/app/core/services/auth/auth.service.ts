import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, catchError, map, take } from 'rxjs';
import { TokenPayload } from '../../models/api/token-payload';
import { AuthPayload } from '../../models/api/auth-payload';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = '';
  connected: boolean = false;

  constructor(private readonly http: HttpClient) {
    this.getToken();
  }

  getToken(): string {
    if (!this.token) this.token = localStorage.getItem('token') || '';
    return this.token;
  }

  hasToken(): boolean {
    return !!this.token;
  }

  isTokenValid(): Observable<boolean> {
    let response = this.http.get<AuthPayload>(
      environment.API_URL + '/auth/verify'
    );
    return response.pipe(
      take(1),
      map(res => {
        if (res.id) return true;
        else return false;
      })
    );
  }

  login(login: string, password: string): Observable<boolean> {
    let response = this.http.post<TokenPayload>(
      environment.API_URL + '/auth/login',
      { login, password }
    );
    return response.pipe(
      take(1),
      map(res => {
        if (!res.token) return false;
        this.token = res.token;
        localStorage.setItem('token', res.token);
        return true;
      })
    );
  }

  register(login: string, password: string): Observable<boolean> {
    let response = this.http.post<AuthPayload>(
      environment.API_URL + '/auth/user',
      {
        login,
        password,
      }
    );
    return response.pipe(
      take(1),
      map(res => {
        if (res.id) return true;
        else return false;
      })
    );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem('token');
    this.connected = false;
  }
}
