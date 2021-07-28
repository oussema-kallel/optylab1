import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';

import { DetailPage } from './detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPageRoutingModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
  ],
  declarations: [DetailPage],
  providers: [
    ScreenOrientation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailPageModule {}
