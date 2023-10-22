import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './guard/module-import.gard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ToastComponent } from './components/toast/toast.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { BaseAppComponent } from './components/base-app/base-app.component';

@NgModule({
  declarations: [
    ToastComponent,
    LoadingComponent,
    NotFoundComponent,
    NavBarComponent,
    BaseAppComponent,
  ],
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  exports: [
    ToastComponent,
    LoadingComponent,
    NotFoundComponent,
    NavBarComponent,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
