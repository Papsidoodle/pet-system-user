import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPassModalPage } from './forgot-pass-modal.page';

describe('ForgotPassModalPage', () => {
  let component: ForgotPassModalPage;
  let fixture: ComponentFixture<ForgotPassModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ForgotPassModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
