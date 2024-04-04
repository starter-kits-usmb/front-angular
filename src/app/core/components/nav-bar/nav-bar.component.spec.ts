import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [HttpClientModule, TranslateModule.forChild()],
      providers: [TranslateStore],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
