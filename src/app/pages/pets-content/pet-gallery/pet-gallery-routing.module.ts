import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetGalleryPage } from './pet-gallery.page';

const routes: Routes = [
  {
    path: '',
    component: PetGalleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetGalleryPageRoutingModule {}
