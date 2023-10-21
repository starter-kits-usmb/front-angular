import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarterKitPageComponent } from './starter-kit-page/starter-kit-page.component';

const routes: Routes = [{ path: '', component: StarterKitPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StarterKitRoutingModule {}
