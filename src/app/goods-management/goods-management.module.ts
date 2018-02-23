import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GoodsManagementRoutes } from './goods-management.routes';
import { GoodsManagementComponent } from './goods-management.component' 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from '../pagination/pagination.module';
import { GoodsManagementService } from './goods-management.service';
import { GoodsInfoComponent } from './goods-info/goods-info.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

@NgModule({
  imports: [
    RouterModule.forChild(GoodsManagementRoutes), CommonModule, 
    FormsModule, ReactiveFormsModule, PaginationModule
  ],
  declarations: [GoodsManagementComponent, GoodsInfoComponent, InvoiceDetailsComponent],
  providers: [GoodsManagementService],
})
export class GoodsManagementModule { 
  
}
 