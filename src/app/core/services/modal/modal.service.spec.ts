import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { BaseModalComponent } from '../../components/base-modal/base-modal.component';

describe('AuthService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService],
    });
    service = TestBed.inject(ModalService);
    service.modals = [];
    service.viewContainerRef = {
      createComponent: jest.fn(() => {
        const inst = new BaseModalComponent();
        return { instance: inst } as any;
      }),
    } as any;
  });

  it('should be created', () => {
    const service: ModalService = TestBed.inject(ModalService);
    expect(service).toBeTruthy();
  });

  describe('open', () => {
    it('should create a modal with given Modal', () => {
      jest.spyOn(service.viewContainerRef, 'createComponent');
      service.open(ConfirmModalComponent);
      expect(service.viewContainerRef.createComponent).toHaveBeenCalledWith(
        ConfirmModalComponent
      );
    });
  });

  describe('openConfirmModal', () => {
    it('should create a confirm Modal', () => {
      jest.spyOn(service.viewContainerRef, 'createComponent');
      service.openConfirmModal();
      expect(service.viewContainerRef.createComponent).toHaveBeenCalledWith(
        ConfirmModalComponent
      );
    });
  });

  describe('closeLatestModal', () => {
    it('should destroy the latest modal', () => {
      const modals = [new BaseModalComponent(), new BaseModalComponent()];
      service.modals = modals.map(
        modal => ({ instance: modal, destroy: jest.fn() }) as any
      );
      const spied = jest.spyOn(service.modals[1], 'destroy');
      service.closeLatestModal();
      expect(spied).toHaveBeenCalled();
      expect(service.modals.length).toBe(1);
    });
  });

  describe('closeAll', () => {
    it('should destroy all modals', () => {
      const modals = [new BaseModalComponent(), new BaseModalComponent()];
      service.modals = modals.map(
        modal => ({ instance: modal, destroy: jest.fn() }) as any
      );
      service.closeAll();
      expect(service.modals.length).toBe(0);
    });
  });
});
