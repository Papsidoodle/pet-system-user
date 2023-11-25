import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyPetPage } from './my-pet.page';

describe('MyPetPage', () => {
  let component: MyPetPage;
  let fixture: ComponentFixture<MyPetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyPetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
