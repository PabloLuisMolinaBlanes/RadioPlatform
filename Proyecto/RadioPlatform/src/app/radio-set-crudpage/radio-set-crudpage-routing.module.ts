import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RadioSetCRUDPagePage } from './radio-set-crudpage.page';

const routes: Routes = [
  {
    path: '',
    component: RadioSetCRUDPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RadioSetCRUDPagePageRoutingModule {}
