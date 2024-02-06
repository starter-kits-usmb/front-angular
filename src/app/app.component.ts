import { Component, OnInit } from '@angular/core';
import { BaseAppComponent } from './core/components/base-app/base-app.component';
import { AuthService } from './core/services/auth/auth.service';
import { takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SUPPORTED_LANGUAGES } from './core/constants/languages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseAppComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    translate: TranslateService
  ) {
    super();

    const supported = SUPPORTED_LANGUAGES.map(lang => lang.code);

    translate.addLangs(supported);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.authService
      .isTokenValid()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (!res) {
          this.authService.logout();
        }
      });
  }
}
