import { Component } from '@angular/core';
import { BaseModalComponent } from '../../../core/components/base-modal/base-modal.component';
import { ModalPayload } from '../../../core/models/modal/modal-payload';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss'],
})
export class CustomModalComponent extends BaseModalComponent {
  username: string = '';

  constructor() {
    super();
  }

  handleClose(event: ModalPayload) {
    const editedPayload = { ...event, data: this.username };
    this.onClose(editedPayload);
  }
}
