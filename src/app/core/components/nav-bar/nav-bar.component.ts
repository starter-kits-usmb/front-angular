import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/authentification/services/auth/auth.service';
import { BaseAppComponent } from '../base-app/base-app.component';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class NavBarComponent extends BaseAppComponent {
  //isConnected = false;
  //use AuthentificationService to get the current user
  phoneMenuOpen = false;
  supportedLanguages = SUPPORTED_LANGUAGES;
  constructor(public readonly authService: AuthService) {
    super();
  }

  changeLang(lang: string): void {
    //to implement, this should redirect on host/lang/
  }
}
