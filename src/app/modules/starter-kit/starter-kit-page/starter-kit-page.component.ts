import { AfterViewInit, Component } from '@angular/core';
import { ToastLevel } from 'src/app/core/models/toast-level';
import { ModalService } from 'src/app/core/service/modal/modal.service';
import { ToastService } from 'src/app/core/service/toast.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

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
    this.modalService.open(ModalComponent).subscribe(payload => {
      console.log('Modal 1 closed, payload is', payload);
      if (payload.success) {
        this.toastService.Show('Modal confirmed', ToastLevel.Success);
      } else {
        this.toastService.Show('Modal canceled', ToastLevel.Warning);
      }
    });
  }
}
