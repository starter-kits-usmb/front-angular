import { Injectable } from '@angular/core';
import { ToastLevel } from '../../models/toast-level';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  visible: boolean = false;
  message: string;
  loadingMessage: string = '';
  loading: boolean = false;
  type: ToastLevel;
  triggerNumber: number;
  loadingScreenClass: string = '';

  constructor() {
    this.visible = false;
    this.message = '';
    this.type = ToastLevel.Info;
    this.triggerNumber = 0;
  }

  Show(message: string, type: ToastLevel) {
    this.triggerNumber++;
    this.HidePrevious();

    setTimeout(() => {
      this.visible = true;
      this.message = message;
      this.type = type;

      setTimeout(
        () => {
          this.triggerNumber--;
          if (this.triggerNumber == 0) this.HidePrevious();
        },
        Math.max(3 * 1000, Math.min(message.length * 50, 10 * 1000))
      ); // 3s minimum, 10s maximum, 50ms per character (between 3s and 10s)
    }, 10);
  }

  ShowLoading(message: string) {
    this.loadingMessage = message;
    this.loading = true;
  }

  async HideLoading() {
    this.loadingScreenClass = 'fade-out';
    await new Promise(resolve => setTimeout(resolve, 300));
    this.loadingScreenClass = '';
    this.loadingMessage = '';
    this.loading = false;
  }

  private HidePrevious() {
    this.visible = false;
    this.message = '';
  }
}
