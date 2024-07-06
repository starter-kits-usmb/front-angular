import { Component, Inject, inject } from '@angular/core';

import { CustomModalComponent } from '../../components/custom-modal/custom-modal.component';
import { ToastLevel } from '../../../../core/models/toast-level';
import { ModalService } from '../../../../core/services/modal/modal.service';
import { ToastService } from '../../../../core/services/toast/toast.service';

@Component({
  standalone: true,
  selector: 'app-starter-kit-page',
  templateUrl: './starter-kit-page.component.html',
  styleUrls: ['./starter-kit-page.component.scss'],
})
export class StarterKitPageComponent {
  private modalService: ModalService = inject(ModalService);
  private toastService: ToastService = inject(ToastService);

  showNotification(level: string) {
    console.log('showNotification of', level, 'called');
    this.toastService.Show(`This is a ${level} toast`, level as ToastLevel);
  }
  showLoadingScreen() {
    this.toastService.ShowLoading('Message to show during the loading screen.');
    setTimeout(() => {
      this.toastService.HideLoading();
    }, 5000);
  }

  openModal() {
    this.modalService
      .open(CustomModalComponent, { title: "What's your name ?" })
      .subscribe((payload) => {
        if (payload.success) {
          this.toastService.Show('Hello ' + payload.data, ToastLevel.Success);
        } else {
          this.toastService.Show('The user canceled', ToastLevel.Warning);
        }
      });
  }
  openConfirmModal() {
    this.modalService.openConfirmModal().subscribe((payload) => {
      if (payload.success) {
        this.toastService.Show('Modal confirmed', ToastLevel.Success);
      } else {
        this.toastService.Show('Modal canceled', ToastLevel.Warning);
      }
    });
  }
}
