import { Component } from '@angular/core';
import { ToastLevel } from 'src/app/core/models/toast-level';
import { ModalService } from 'src/app/core/service/modal/modal.service';
import { ToastService } from 'src/app/core/service/toast/toast.service';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';

@Component({
  selector: 'app-starter-kit-page',
  templateUrl: './starter-kit-page.component.html',
  styleUrls: ['./starter-kit-page.component.scss'],
})
export class StarterKitPageComponent {
  constructor(
    private readonly toastService: ToastService,
    private readonly modalService: ModalService
  ) {}

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
      .subscribe(payload => {
        if (payload.success) {
          this.toastService.Show('Hello ' + payload.data, ToastLevel.Success);
        } else {
          this.toastService.Show('The user canceled', ToastLevel.Warning);
        }
      });
  }
  openConfirmModal() {
    this.modalService.openConfirmModal().subscribe(payload => {
      if (payload.success) {
        this.toastService.Show('Modal confirmed', ToastLevel.Success);
      } else {
        this.toastService.Show('Modal canceled', ToastLevel.Warning);
      }
    });
  }
}
