import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPetPageRoutingModule } from './my-pet-routing.module';

import { MyPetPage } from './my-pet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPetPageRoutingModule
  ],
  declarations: [MyPetPage]
})
export class MyPetPageModule {}
