import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPassModalPageRoutingModule } from './forgot-pass-modal-routing.module';

import { ForgotPassModalPage } from './forgot-pass-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPassModalPageRoutingModule
  ],
  declarations: [ForgotPassModalPage]
})
export class ForgotPassModalPageModule {}
