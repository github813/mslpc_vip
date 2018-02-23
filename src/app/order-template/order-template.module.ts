import {RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from '../pagination/pagination.module';
import {OrderTemplateComponent} from './order-template.component';
import {OrderTemplateService} from './order-template.service';
import {OrderTemplateRoutes} from './order-template.routes';
import {AddressService} from '../address/address.service';

@NgModule({
  imports: [
    RouterModule.forChild(OrderTemplateRoutes),
    CommonModule,PaginationModule
  ],
  declarations: [OrderTemplateComponent],
  providers:[OrderTemplateService,AddressService]
})
export class OrderTemplateModule{ }
