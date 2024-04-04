import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageComponent } from './register-page.component';
import { AuthentificationModule } from '../authentification.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPageComponent],
      imports: [
        AuthentificationModule,
        HttpClientModule,
        TranslateModule.forChild(),
      ],
      providers: [TranslateStore],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
