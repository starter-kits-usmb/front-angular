import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseModalComponent } from './base-modal.component';
import { ModalPayload } from '../../models/modal/modal-payload';

describe('BaseModalComponent', () => {
  let component: BaseModalComponent;
  let fixture: ComponentFixture<BaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClose', () => {
    it('should emit closeEvent with correct payload', () => {
      const spy = jest.spyOn(component.closeEvent, 'emit');
      const payload: ModalPayload = { success: true, data: null };
      component.onClose(payload);
      expect(spy).toHaveBeenCalledWith(payload);
    });
  });
});
