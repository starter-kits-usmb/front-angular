import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  DEFAULT_MODAL_OPTIONS,
  ModalOptions,
} from '../../../core/models/modal/modal-options';
import { ModalPayload } from '../../../core/models/modal/modal-payload';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  outputs: ['closeEvent'],
})
export class ModalComponent implements OnDestroy {
  @Input() options: ModalOptions = DEFAULT_MODAL_OPTIONS;

  /**
   * @description
   * If true, the confirm button will be enabled.
   */
  @Input() validator: boolean = true;

  @Output() closeEvent = new EventEmitter<ModalPayload>();

  closeEventCounter = 0;

  ngOnDestroy(): void {
    //this allow to emit a close event in case modal is destroyed without any input from the user
    if (this.closeEventCounter === 0) {
      this.closeEvent.emit({ success: false });
    }
  }

  public confirmModal(payload: ModalPayload = { success: true }): void {
    console.log('confirmModal called');
    this.closeEventCounter++;
    this.closeEvent.emit(payload);
  }

  public cancelModal(payload: ModalPayload = { success: false }): void {
    console.log('cancelModal called');
    this.closeEventCounter++;
    this.closeEvent.emit(payload);
  }
}
