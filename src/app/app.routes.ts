import { Routes } from '@angular/router';
import { routesAuth } from './modules/authentification/auth.routes';
import { routesStarterKit } from './modules/starter-kit/starter-kit.routes';
import { routesUsers } from './modules/user/starter-kit.routes';
import { HomePageComponent } from './modules/home/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  ...routesAuth,
  ...routesUsers,
  ...routesStarterKit,
];
