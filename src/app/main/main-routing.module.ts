import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      { path: '', redirectTo: 'etapas', pathMatch: 'full' },
      { path: 'etapas', loadChildren: () => import('../etapa/etapa.module').then(m => m.EtapaPageModule) },
      {
        path: 'etapa',
        loadChildren: () => import('../etapa-edit/etapa-edit.module').then(m => m.EtapaEditPageModule)
      },
      {
        path: 'etapa/:id',
        loadChildren: () => import('../etapa-edit/etapa-edit.module').then(m => m.EtapaEditPageModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
