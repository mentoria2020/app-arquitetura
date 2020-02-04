import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtapaPage } from './etapa.page';

const routes: Routes = [
  {
    path: '',
    component: EtapaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtapaPageRoutingModule {}
