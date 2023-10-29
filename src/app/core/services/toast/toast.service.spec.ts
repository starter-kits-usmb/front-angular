import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastLevel } from '../../models/toast-level';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService],
    });
    service = TestBed.inject(ToastService);
    service.loadingMessage = '';
    service.message = '';
    service.visible = false;
    service.message = '';
    service.loadingMessage = '';
    service.loading = false;
    service.type = ToastLevel.Info;
    service.triggerNumber = 0;
    service.loadingScreenClass = '';
  });

  it('should be created', () => {
    const service: ToastService = TestBed.inject(ToastService);
    expect(service).toBeTruthy();
  });

  describe('Show', () => {
    it('should show a toast', async () => {
      const service: ToastService = TestBed.inject(ToastService);
      service.Show('test', ToastLevel.Info);
      await new Promise(resolve => setTimeout(resolve, 10)); //wait for the toast to show
      expect(service.visible).toBeTruthy();
      expect(service.message).toEqual('test');
      expect(service.type).toEqual(ToastLevel.Info);
    });
  });

  describe('ShowLoading', () => {
    it('should add a loading screen', () => {
      const service: ToastService = TestBed.inject(ToastService);
      service.ShowLoading('test');
      expect(service.loadingMessage).toEqual('test');
      expect(service.loading).toBeTruthy();
    });
  });

  describe('HideLoading', () => {
    it('should hide the loading screen', async () => {
      const service: ToastService = TestBed.inject(ToastService);
      service.ShowLoading('test');
      await service.HideLoading();
      expect(service.loadingMessage).toEqual('');
      expect(service.loading).toBeFalsy();
    });
  });
});
