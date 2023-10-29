import { Component } from '@angular/core';
import { BaseModalComponent } from '../../../core/components/base-modal/base-modal.component';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  outputs: ['closeEvent'],
})
export class ConfirmModalComponent extends BaseModalComponent {
  constructor() {
    super();
  }
}
