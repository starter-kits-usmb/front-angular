import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { ToastComponent } from './core/components/toast/toast.component';
import { ModalInjectorComponent } from './core/components/modal-injector/modal-injector.component';
import { AuthService } from './modules/authentification/services/auth/auth.service';
import { BaseAppComponent } from './core/components/base-app/base-app.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    ToastComponent,
    ModalInjectorComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends BaseAppComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.authService
      .isTokenValid()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (!res) {
          this.authService.logout();
        }
      });
  }
}
