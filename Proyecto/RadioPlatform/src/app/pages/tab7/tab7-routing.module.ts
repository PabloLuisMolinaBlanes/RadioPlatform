import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab7Page } from './tab7.page';

const routes: Routes = [
  {
    path: '',
    component: Tab7Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab7PageRoutingModule {}
