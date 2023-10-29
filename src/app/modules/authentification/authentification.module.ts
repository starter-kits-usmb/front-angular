import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthentificationRoutingModule } from './authentification-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [CommonModule, SharedModule, AuthentificationRoutingModule],
})
export class AuthentificationModule {}
