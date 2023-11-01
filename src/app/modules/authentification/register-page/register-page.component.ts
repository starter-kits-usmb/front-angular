import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseAppComponent } from '../../../core/components/base-app/base-app.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';
import { ROUTES } from '../../../core/constants/routes';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent extends BaseAppComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string = '';
  errorInForm: boolean = false;
  formObserver$!: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super();
  }

  async onSubmitForm() {
    if (
      this.signupForm.value.password !=
      this.signupForm.value.passwordVerification
    ) {
      this.errorInForm = true;
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService
      .register(this.signupForm.value.login, this.signupForm.value.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe(registered => {
        if (registered) {
          this.router.navigate([ROUTES.authentification + '/login']);
        } else {
          this.errorInForm = true;
          this.errorMessage = 'An error occured';
        }
      });
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        login: [null, [Validators.required]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        passwordVerification: [
          null,
          [Validators.required, Validators.minLength(8)],
        ],
      },
      passwordMatchValidator
    );

    //listen to changes in the form and update the error message accordingly
    this.formObserver$ = this.signupForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (
          value.password != value.passwordVerification &&
          value.password != null &&
          value.passwordVerification != null
        ) {
          this.errorInForm = true;
          this.errorMessage = 'Passwords do not match';
        } else {
          this.errorInForm = false;
          this.errorMessage = '';
        }
      });
  }
}
