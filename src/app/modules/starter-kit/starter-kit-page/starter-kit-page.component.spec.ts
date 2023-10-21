import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterKitPageComponent } from './starter-kit-page.component';

describe('StarterKitPageComponent', () => {
  let component: StarterKitPageComponent;
  let fixture: ComponentFixture<StarterKitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarterKitPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarterKitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
