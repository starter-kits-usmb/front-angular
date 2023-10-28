import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn,
} from '@angular/router';
import { catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ROUTES } from '../constants/routes';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isTokenValid().pipe(
    map(loggedIn =>
      loggedIn
        ? true
        : router.createUrlTree([router.parseUrl(ROUTES.login)], {
            queryParams: { loggedOut: true, origUrl: state.url },
          })
    ),
    catchError(err => {
      router.navigate([ROUTES.login], {
        queryParams: { loggedOut: true, origUrl: state.url },
      });
      return of(false);
    })
  );
};
