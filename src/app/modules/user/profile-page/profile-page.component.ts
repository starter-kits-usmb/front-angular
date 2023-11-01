import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { BaseAppComponent } from '../../../core/components/base-app/base-app.component';
import { takeUntil } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ROUTES } from '../../../core/constants/routes';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent extends BaseAppComponent implements OnInit {
  login = '';

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService
      .getProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe(payload => {
        this.login = payload.login;
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate([ROUTES.authentification + '/login']);
  }
}
