import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelevaiPageRoutingModule } from './relevai-routing.module';

import { RelevaiPage } from './relevai.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelevaiPageRoutingModule
  ],
  declarations: [RelevaiPage]
})
export class RelevaiPageModule {}
