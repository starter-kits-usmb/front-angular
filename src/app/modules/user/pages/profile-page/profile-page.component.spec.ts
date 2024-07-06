import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageComponent } from './profile-page.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientModule, TranslateModule.forChild()],
      declarations: [ProfilePageComponent],
      providers: [TranslateStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
