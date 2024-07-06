import { Component } from '@angular/core';
import { BaseModalComponent } from '../../../core/components/base-modal/base-modal.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  standalone: true,
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  outputs: ['closeEvent'],
  imports: [ModalComponent],
})
export class ConfirmModalComponent extends BaseModalComponent {
  constructor() {
    super();
  }
}
