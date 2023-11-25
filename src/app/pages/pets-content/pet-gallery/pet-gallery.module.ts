import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { PetGalleryPageRoutingModule } from './pet-gallery-routing.module';

import { PetGalleryPage } from './pet-gallery.page';

import {LottieModule} from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory(){
  return player
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetGalleryPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory})
  ],
  declarations: [PetGalleryPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PetGalleryPageModule {}
