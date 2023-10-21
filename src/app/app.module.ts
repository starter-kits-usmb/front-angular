import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './core/service/auth.service';
import { ToastService } from './core/service/toast.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [AuthService, ToastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
