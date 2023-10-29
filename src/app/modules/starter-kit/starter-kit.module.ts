import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarterKitPageComponent } from './starter-kit-page/starter-kit-page.component';
import { StarterKitRoutingModule } from './starter-kit-routing.module';
import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [StarterKitPageComponent, CustomModalComponent],
  imports: [CommonModule, SharedModule, StarterKitRoutingModule],
})
export class StarterKitModule {}
