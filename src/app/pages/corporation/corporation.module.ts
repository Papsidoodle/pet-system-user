import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorporationPageRoutingModule } from './corporation-routing.module';

import { CorporationPage } from './corporation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorporationPageRoutingModule
  ],
  declarations: [CorporationPage]
})
export class CorporationPageModule {}
