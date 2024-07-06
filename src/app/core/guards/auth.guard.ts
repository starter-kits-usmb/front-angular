import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn,
} from '@angular/router';
import { catchError, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../modules/authentification/services/auth/auth.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isTokenValid().pipe(
    take(1),
    catchError((err) => {
      router.navigate(['auth/login']);
      return of(false);
    }),
  );
};
