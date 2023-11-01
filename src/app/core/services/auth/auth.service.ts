import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, catchError, map, take } from 'rxjs';
import { TokenPayload } from '../../models/api/token-payload';
import { AuthPayload } from '../../models/api/auth-payload';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../toast/toast.service';
import { ToastLevel } from '../../models/toast-level';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = '';
  connected: boolean = false;

  constructor(
    private readonly http: HttpClient,
    private readonly toastService: ToastService
  ) {
    this.getToken();
  }

  getToken(): string {
    this.token = localStorage.getItem('token') || '';
    this.connected = !!this.token;
    return this.token;
  }

  isTokenValid(): Observable<boolean> {
    let response = this.http.get<AuthPayload>(environment.API_URL + '/auth');
    return response.pipe(
      take(1),
      map(() => {
        return true;
      }),
      catchError(err => {
        return of(false);
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
        this.connected = true;
        return true;
      }),
      catchError(err => {
        this.toastService.Show(err.error.message, ToastLevel.Error);
        return of(false);
      })
    );
  }

  register(login: string, password: string): Observable<boolean> {
    let response = this.http.post<AuthPayload>(
      environment.API_URL + '/auth/register',
      {
        login,
        password,
      }
    );
    return response.pipe(
      take(1),
      map(res => {
        if (res.id) return true;
        else {
          this.toastService.Show('Something went wrong', ToastLevel.Error);
          return false;
        }
      }),
      catchError(err => {
        console.log(err);

        this.toastService.Show(err.error.message, ToastLevel.Error);
        return of(false);
      })
    );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem('token');
    this.connected = false;
  }
}
