import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'etapas', pathMatch: 'full' },
  { path: 'etapas', loadChildren: () => import('./etapa/etapa.module').then(m => m.EtapaPageModule) },
  {
    path: 'etapa',
    loadChildren: () => import('./etapa-edit/etapa-edit.module').then(m => m.EtapaEditPageModule)
  },
  {
    path: 'etapa/:id',
    loadChildren: () => import('./etapa-edit/etapa-edit.module').then(m => m.EtapaEditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
