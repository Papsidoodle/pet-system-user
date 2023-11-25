import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetGalleryPage } from './pet-gallery.page';

describe('PetGalleryPage', () => {
  let component: PetGalleryPage;
  let fixture: ComponentFixture<PetGalleryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PetGalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
