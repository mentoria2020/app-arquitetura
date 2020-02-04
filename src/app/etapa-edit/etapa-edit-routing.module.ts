import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtapaEditPage } from './etapa-edit.page';

const routes: Routes = [
  {
    path: '',
    component: EtapaEditPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtapaEditPageRoutingModule { }
