import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPassModalPage } from './forgot-pass-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPassModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPassModalPageRoutingModule {}
