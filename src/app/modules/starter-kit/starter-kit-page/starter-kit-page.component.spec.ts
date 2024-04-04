import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterKitPageComponent } from './starter-kit-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';

describe('StarterKitPageComponent', () => {
  let component: StarterKitPageComponent;
  let fixture: ComponentFixture<StarterKitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forChild()],
      declarations: [StarterKitPageComponent],
      providers: [TranslateStore],
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
