import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, catchError, map, take } from 'rxjs';
import { AuthPayload } from '../models/auth-payload';
import { environment } from 'src/environments/environment';
import { TokenPayload } from '../models/token-payload';

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
      environment.API_URL + '/api/auth'
    );
    return response.pipe(
      map(res => true),
      catchError(err => of(false))
    );
  }

  login(login: string, password: string): Observable<boolean> {
    let response = this.http.post<TokenPayload>(
      environment.API_URL + '/api/login',
      { login, password }
    );
    return response.pipe(
      take(1),
      map(res => {
        this.token = res.token;
        localStorage.setItem('token', res.token);
        return true;
      }),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  register(login: string, password: string): Observable<boolean> {
    return of(false);
  }

  logout(): Observable<boolean> {
    return of(false);
  }
}
