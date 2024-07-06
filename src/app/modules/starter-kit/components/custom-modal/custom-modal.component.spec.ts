import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomModalComponent } from './custom-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StarterKitModule } from '../starter-kit.module';

describe('CustomModalComponent', () => {
  let component: CustomModalComponent;
  let fixture: ComponentFixture<CustomModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StarterKitModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
