import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorporationPage } from './corporation.page';

const routes: Routes = [
  {
    path: '',
    component: CorporationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporationPageRoutingModule {}
