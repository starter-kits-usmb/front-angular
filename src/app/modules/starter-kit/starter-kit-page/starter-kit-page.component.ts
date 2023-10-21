import { AfterViewInit, Component } from '@angular/core';
import { ToastLevel } from 'src/app/core/models/toast-level';
import { ToastService } from 'src/app/core/service/toast.service';

@Component({
  selector: 'app-starter-kit-page',
  templateUrl: './starter-kit-page.component.html',
  styleUrls: ['./starter-kit-page.component.scss'],
})
export class StarterKitPageComponent {
  constructor(private readonly toastService: ToastService) {}

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
}
