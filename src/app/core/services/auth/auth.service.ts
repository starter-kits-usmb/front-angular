import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, catchError, map, take } from 'rxjs';
import { TokenPayload } from '../../models/api/token-payload';
import { AuthPayload } from '../../models/api/auth-payload';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../toast/toast.service';
import { ToastLevel } from '../../models/toast-level';
import { getErrorMessage } from '../../utils/errors.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: string = '';
  private _connected: boolean = false;

  constructor(
    private readonly http: HttpClient,
    private readonly toastService: ToastService
  ) {
    this.setupFromLocalStorage();
  }

  public get token(): string {
    return this._token;
  }

  public get connected(): boolean {
    return this._connected;
  }

  private setupFromLocalStorage(): void {
    this._token = localStorage.getItem('token') || '';
    this._connected = !!this._token;
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
        this._token = res.token;
        localStorage.setItem('token', res.token);
        this._connected = true;
        return true;
      }),
      catchError(err => {
        this.toastService.Show(getErrorMessage(err), ToastLevel.Error);
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

        this.toastService.Show(getErrorMessage(err), ToastLevel.Error);
        return of(false);
      })
    );
  }

  logout(): void {
    this._token = '';
    localStorage.removeItem('token');
    this._connected = false;
  }
}
