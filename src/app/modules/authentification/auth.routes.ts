import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const prefix = 'auth';

export const routesAuth: Routes = [
  { path: prefix + '/login', component: LoginPageComponent },
  { path: prefix + '/register', component: RegisterPageComponent },
];
