import {RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from '../pagination/pagination.module';
import {BrokerComponent} from './broker.component';
import {BrokerService} from './broker.service';
import {BrokerRoutes} from './broker.routes';

@NgModule({
  imports: [
    RouterModule.forChild(BrokerRoutes),
    CommonModule,PaginationModule
  ],
  declarations: [BrokerComponent],
  providers:[BrokerService]
})
export class BrokerModule{ }
