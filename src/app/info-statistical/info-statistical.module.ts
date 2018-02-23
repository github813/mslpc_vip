import {RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoStatisticalRoutes } from './info-statistical.routes';
import { InfoStatisticalComponent } from './info-statistical.component';
import { InfoStatisticalService } from './info-statistical.service';
import { PaginationModule } from '../pagination/pagination.module';
import { GoodsManagementService } from '../goods-management/goods-management.service';

@NgModule({
  imports: [RouterModule.forChild(InfoStatisticalRoutes),
    CommonModule, PaginationModule
  ],
  declarations: [InfoStatisticalComponent],
  providers: [InfoStatisticalService, GoodsManagementService]
})
export class InfoStatisticalModule { }
