import { Injectable, WritableSignal, signal } from '@angular/core';
import { ToastLevel } from '../../models/toast-level';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  visible: WritableSignal<boolean> = signal(false);
  message: string;
  loadingMessage: string = '';
  loading: WritableSignal<boolean> = signal(false);
  type: ToastLevel;
  triggerNumber: number;
  loadingScreenClass: string = '';

  constructor() {
    this.message = '';
    this.type = ToastLevel.Info;
    this.triggerNumber = 0;
  }

  Show(message: string, type: ToastLevel) {
    this.triggerNumber++;
    this.HidePrevious();

    setTimeout(() => {
      this.visible.set(true);
      this.message = message;
      this.type = type;

      setTimeout(
        () => {
          this.triggerNumber--;
          if (this.triggerNumber == 0) this.HidePrevious();
        },
        Math.max(3 * 1000, Math.min(message.length * 50, 10 * 1000)),
      ); // 3s minimum, 10s maximum, 50ms per character (between 3s and 10s)
    }, 10);
  }

  ShowLoading(message: string) {
    this.loadingMessage = message;
    this.loading.set(true);
  }

  async HideLoading() {
    this.loadingScreenClass = 'fade-out';
    await new Promise((resolve) => setTimeout(resolve, 300));
    this.loadingScreenClass = '';
    this.loadingMessage = '';
    this.loading.set(false);
  }

  private HidePrevious() {
    this.visible.set(false);
    this.message = '';
  }
}
