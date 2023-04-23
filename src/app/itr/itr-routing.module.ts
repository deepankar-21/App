import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItrPage } from './itr.page';

const routes: Routes = [
  {
    path: '',
    component: ItrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItrPageRoutingModule {}
