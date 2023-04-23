import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItrPageRoutingModule } from './itr-routing.module';

import { ItrPage } from './itr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItrPageRoutingModule
  ],
  declarations: [ItrPage]
})
export class ItrPageModule {}
