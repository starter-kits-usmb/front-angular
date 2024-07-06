import { Component } from '@angular/core';
import { BaseAppComponent } from '../base-app/base-app.component';

@Component({
  standalone: true,
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent extends BaseAppComponent {}
