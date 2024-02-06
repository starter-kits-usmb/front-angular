import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { BaseAppComponent } from '../base-app/base-app.component';
import { TranslateService } from '@ngx-translate/core';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent extends BaseAppComponent {
  //isConnected = false;
  //use AuthentificationService to get the current user
  phoneMenuOpen = false;
  supportedLanguages = SUPPORTED_LANGUAGES;
  constructor(
    public readonly authService: AuthService,
    private readonly translate: TranslateService
  ) {
    super();
  }

  changeLang(lang: string): void {
    this.translate.use(lang);
  }
}
