import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInjectorComponent } from './modal-injector.component';

describe('ModalInjectorComponent', () => {
  let component: ModalInjectorComponent;
  let fixture: ComponentFixture<ModalInjectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInjectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInjectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
