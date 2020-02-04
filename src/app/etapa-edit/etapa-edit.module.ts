import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtapaEditPageRoutingModule } from './etapa-edit-routing.module';

import { EtapaEditPage } from './etapa-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EtapaEditPageRoutingModule
  ],
  declarations: [EtapaEditPage]
})
export class EtapaEditPageModule {}
