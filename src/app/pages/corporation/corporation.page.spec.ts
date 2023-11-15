import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorporationPage } from './corporation.page';

describe('CorporationPage', () => {
  let component: CorporationPage;
  let fixture: ComponentFixture<CorporationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CorporationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
