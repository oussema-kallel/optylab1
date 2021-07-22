import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelevaiPage } from './relevai.page';

const routes: Routes = [
  {
    path: '',
    component: RelevaiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelevaiPageRoutingModule {}
