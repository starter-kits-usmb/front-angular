import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterKitPageComponent } from './starter-kit-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StarterKitPageComponent', () => {
  let component: StarterKitPageComponent;
  let fixture: ComponentFixture<StarterKitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarterKitPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StarterKitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
