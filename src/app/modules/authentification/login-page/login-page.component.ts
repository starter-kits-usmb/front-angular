import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseAppComponent } from '../../../core/components/base-app/base-app.component';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent extends BaseAppComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  errorInForm: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super();
  }

  async onSubmitForm() {
    this.authService
      .login(this.loginForm.value.login, this.loginForm.value.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe(loggedIn => {
        if (loggedIn) {
          this.router.navigate(['/home']);
        } else {
          this.errorInForm = true;
          this.errorMessage = 'Invalid credentials';
        }
      });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }
}
