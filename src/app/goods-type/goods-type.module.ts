import {RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GoodsTypeComponent} from './goods-type.component';
import {GoodstypeRoutes} from './goods-type.routes';
import {PaginationModule} from '../pagination/pagination.module';
import {GoodsTypeService} from './goods-type.service';
//import { GoodsManagementService } from '../goods-management/goods-management.service';

@NgModule({
  imports: [
    RouterModule.forChild(GoodstypeRoutes),
    CommonModule,PaginationModule
  ],
  declarations: [GoodsTypeComponent],
  providers: [GoodsTypeService]
})
export class GoodsTypeModule { }
