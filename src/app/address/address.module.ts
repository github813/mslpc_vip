import {RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from '../pagination/pagination.module';
import {AddressService} from './address.service';
import {AddressComponent} from './address.component';
import {AddressRoutes} from './address.routes';
import { MapComponent } from './map/map.component';
import {ViewAddressComponent} from './view-address/view-address.component';

@NgModule({
  imports: [
    RouterModule.forChild(AddressRoutes),
    CommonModule,PaginationModule
  ],
  declarations: [AddressComponent, MapComponent,ViewAddressComponent],
  providers:[AddressService]
})
export class AddressModule{ }
