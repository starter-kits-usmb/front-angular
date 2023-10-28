import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { BaseAppComponent } from 'src/app/core/components/base-app/base-app.component';
import { ModalPayload } from 'src/app/core/models/modal-payload';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnDestroy {
  @Input() title = 'Please confirm your choice';
  @Input() message = 'Are you sure you want to do this?';
  @Input() cancelText = 'Cancel';
  @Input() confirmText = 'Confirm';
  @Input() confirmColor = 'primary';

  @Output() closeEvent = new EventEmitter<ModalPayload>();

  closeEventCounter = 0;

  ngOnDestroy(): void {
    //this allow to emit a close event in case modal is destroyed without any input from the user
    if (this.closeEventCounter === 0) {
      this.closeEvent.emit({ success: false });
    }
  }

  public confirmModal(payload: ModalPayload = { success: true }): void {
    this.closeEventCounter++;
    this.closeEvent.emit(payload);
  }

  public cancelModal(payload: ModalPayload = { success: false }): void {
    this.closeEventCounter++;
    this.closeEvent.emit(payload);
  }
}
