import {
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalPayload } from '../../models/modal-payload';
import { DOCUMENT } from '@angular/common';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modals: ComponentRef<any>[] = [];
  public viewContainerRef!: ViewContainerRef;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  open(content: typeof ModalComponent, options?: {}) {
    this.document.body.style.overflow = 'hidden';
    const modal = this.viewContainerRef.createComponent(content);
    this.modals.push(modal);

    //destroy modal when close event is emitted
    modal.instance.closeEvent.pipe(take(1)).subscribe(() => {
      modal.destroy();
    });

    return modal.instance.closeEvent.asObservable().pipe(take(1));
  }

  openConfirmModal(options?: {}): Observable<ModalPayload> {
    return this.open(ConfirmModalComponent, options);
  }

  closeLatestModal() {
    const modal = this.modals.pop();
    modal?.destroy();
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
