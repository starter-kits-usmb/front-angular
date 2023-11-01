import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AuthPayload } from '../../models/api/auth-payload';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getProfile(): Observable<AuthPayload> {
    let response = this.http.get<AuthPayload>(
      environment.API_URL + '/user/profile'
    );
    return response.pipe(take(1));
  }
}
