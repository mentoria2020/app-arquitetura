import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPage } from './main.page';
import { IonicModule } from '@ionic/angular';
import { MainPageRoutingModule } from './main-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainPage],
  imports: [
    CommonModule,
    FormsModule,    
    ReactiveFormsModule,
    IonicModule,
    MainPageRoutingModule
  ]
})
export class MainPageModule { }
