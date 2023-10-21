import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarterKitPageComponent } from './starter-kit-page/starter-kit-page.component';
import { StarterKitRoutingModule } from './starter-kit-routing.module';

@NgModule({
  declarations: [StarterKitPageComponent],
  imports: [CommonModule, StarterKitRoutingModule],
})
export class StarterKitModule {}
