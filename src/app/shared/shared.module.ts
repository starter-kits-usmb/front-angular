import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ModalComponent, ConfirmModalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    ModalComponent,
    ConfirmModalComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
