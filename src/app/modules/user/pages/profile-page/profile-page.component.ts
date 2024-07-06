import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BaseAppComponent } from '../../../../core/components/base-app/base-app.component';
import { takeUntil } from 'rxjs';
import { AuthService } from '../../../authentification/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent extends BaseAppComponent implements OnInit {
  login = '';

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService
      .getProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe((payload) => {
        this.login = payload.login;
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
