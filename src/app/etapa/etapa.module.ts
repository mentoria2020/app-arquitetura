import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtapaPageRoutingModule } from './etapa-routing.module';

import { EtapaPage } from './etapa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtapaPageRoutingModule
  ],
  declarations: [EtapaPage]
})
export class EtapaPageModule {}
