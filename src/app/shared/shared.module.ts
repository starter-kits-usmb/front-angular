import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModalComponent, ConfirmModalComponent],
  imports: [CommonModule, FormsModule],
  exports: [ModalComponent, ConfirmModalComponent, FormsModule],
})
export class SharedModule {}
