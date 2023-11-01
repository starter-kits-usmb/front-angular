import { Component, OnInit } from '@angular/core';
import { BaseAppComponent } from './core/components/base-app/base-app.component';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseAppComponent implements OnInit {
  constructor(private readonly authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.authService.isTokenValid().subscribe(res => {
      if (!res) {
        this.authService.logout();
      }
    });
  }
}
