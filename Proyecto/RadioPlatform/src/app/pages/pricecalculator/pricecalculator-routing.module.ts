import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PricecalculatorPage } from './pricecalculator.page';

const routes: Routes = [
  {
    path: '',
    component: PricecalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricecalculatorPageRoutingModule {}
