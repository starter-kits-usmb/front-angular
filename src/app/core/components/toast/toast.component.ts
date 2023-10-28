import { Component } from '@angular/core';
import { BaseAppComponent } from '../base-app/base-app.component';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent extends BaseAppComponent {
  constructor(public toast: ToastService) {
    super();
  }
}
