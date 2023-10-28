import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-modal-injector',
  templateUrl: './modal-injector.component.html',
  styleUrls: ['./modal-injector.component.scss'],
})
export class ModalInjectorComponent implements AfterViewInit {
  @ViewChild('modalContainer', { read: ViewContainerRef })
  modalContainer!: ViewContainerRef;

  constructor(private readonly modalService: ModalService) {}

  ngAfterViewInit(): void {
    this.modalService.viewContainerRef = this.modalContainer;
  }
}
