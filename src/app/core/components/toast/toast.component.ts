import { Component, inject } from '@angular/core';
import { BaseAppComponent } from '../base-app/base-app.component';
import { ToastService } from '../../services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  standalone: true,
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  imports: [CommonModule, LoadingComponent],
})
export class ToastComponent extends BaseAppComponent {
  public toast: ToastService = inject(ToastService);
}
