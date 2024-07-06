import { Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AuthGuard } from '../../core/guards/auth.guard';

export const routesUsers: Routes = [
  {
    path: 'user/profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
];
