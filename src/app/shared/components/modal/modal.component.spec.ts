import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.closeEventCounter = 0;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDestroy', () => {
    it('should emit a close event if closeEventCounter is 0', () => {
      jest.spyOn(component.closeEvent, 'emit');
      component.ngOnDestroy();
      expect(component.closeEvent.emit).toHaveBeenCalledWith({
        success: false,
      });
    });
  });

  describe('confirmModal', () => {
    it('should emit a close event as success', () => {
      jest.spyOn(component.closeEvent, 'emit');
      component.confirmModal();
      expect(component.closeEvent.emit).toHaveBeenCalledWith({
        success: true,
      });
    });
  });

  describe('cancelModal', () => {
    it('should emit a close event as not success', () => {
      jest.spyOn(component.closeEvent, 'emit');
      component.cancelModal();
      expect(component.closeEvent.emit).toHaveBeenCalledWith({
        success: false,
      });
    });
  });
});
