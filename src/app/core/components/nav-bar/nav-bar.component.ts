import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  //isConnected = false;
  //use AuthentificationService to get the current user
  phoneMenuOpen = false;
  constructor(public readonly authService: AuthService) {}
}
