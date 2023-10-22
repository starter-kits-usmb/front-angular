import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base-component',
  template: '',
})
export class BaseAppComponent implements OnDestroy {
  protected destroy$ = new Subject<void>();
  constructor() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
