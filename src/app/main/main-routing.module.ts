import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPage } from './main.page';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      { path: '', redirectTo: 'etapas', pathMatch: 'full' },
      {
        path: 'etapas',
        loadChildren: () => import('../etapa/etapa.module').then(m => m.EtapaPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'etapa',
        loadChildren: () => import('../etapa-edit/etapa-edit.module').then(m => m.EtapaEditPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'etapa/:id',
        loadChildren: () => import('../etapa-edit/etapa-edit.module').then(m => m.EtapaEditPageModule),
        canLoad: [AuthGuard]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
