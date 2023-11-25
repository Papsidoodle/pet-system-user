import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPetPage } from './my-pet.page';

const routes: Routes = [
  {
    path: '',
    component: MyPetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPetPageRoutingModule {}
