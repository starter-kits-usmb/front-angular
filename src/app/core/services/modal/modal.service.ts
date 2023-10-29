import {
  ComponentRef,
  Inject,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { Observable, take } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ModalPayload } from '../../models/modal/modal-payload';
import {
  MODAL_CONFIRM_OPTIONS,
  ModalOptions,
} from '../../models/modal/modal-options';
import { BaseModalComponent } from '../../components/base-modal/base-modal.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modals: ComponentRef<any>[] = [];
  public viewContainerRef!: ViewContainerRef;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  open(content: any, options?: ModalOptions) {
    this.document.body.style.overflow = 'hidden';
    const modal = this.viewContainerRef.createComponent(content);
    if (options) {
      (modal.instance as BaseModalComponent).options = options;
    }
    this.modals.push(modal);

    //destroy modal when close event is emitted
    (modal.instance as BaseModalComponent).closeEvent
      .pipe(take(1))
      .subscribe(() => {
        this.destroyModal(modal);
      });

    return (modal.instance as BaseModalComponent).closeEvent
      .asObservable()
      .pipe(take(1));
  }

  openConfirmModal(
    options: ModalOptions = MODAL_CONFIRM_OPTIONS
  ): Observable<ModalPayload> {
    this.document.body.style.overflow = 'hidden';
    const modal = this.viewContainerRef.createComponent(ConfirmModalComponent);
    modal.instance.options = options;
    this.modals.push(modal);

    //destroy modal when close event is emitted
    modal.instance.closeEvent.pipe(take(1)).subscribe(() => {
      console.log('closeEvent received');
      this.destroyModal(modal);
    });

    return modal.instance.closeEvent.asObservable().pipe(take(1));
  }

  closeLatestModal() {
    const modal = this.modals.pop();
    modal?.destroy();
    if (this.modals.length === 0) {
      this.document.body.style.overflow = 'auto';
    }
  }

  private destroyModal(modal: ComponentRef<any>) {
    modal?.destroy();
    this.modals = this.modals.filter(m => m !== modal);
    if (this.modals.length === 0) {
      this.document.body.style.overflow = 'auto';
    }
  }

  closeAll() {
    for (let i = this.modals.length - 1; i === 0; i--) {
      let modal = this.modals[i];
      modal?.destroy();
    }
    this.modals = [];
    this.document.body.style.overflow = 'auto';
  }
}
