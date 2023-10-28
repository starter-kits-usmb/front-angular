import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { BaseAppComponent } from '../base-app/base-app.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent extends BaseAppComponent {
  //isConnected = false;
  //use AuthentificationService to get the current user
  phoneMenuOpen = false;
  constructor(public readonly authService: AuthService) {
    super();
  }
}
