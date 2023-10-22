import { Component } from '@angular/core';
import { ToastService } from '../../service/toast.service';
import { BaseAppComponent } from '../base-app/base-app.component';

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
