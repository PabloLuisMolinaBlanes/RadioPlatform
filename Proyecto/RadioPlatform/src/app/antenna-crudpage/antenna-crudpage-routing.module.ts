import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AntennaCRUDPagePage } from './antenna-crudpage.page';

const routes: Routes = [
  {
    path: '',
    component: AntennaCRUDPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AntennaCRUDPagePageRoutingModule {}
