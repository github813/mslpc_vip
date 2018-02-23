 import {AddressComponent} from './address.component';
 import {MapComponent} from './map/map.component';
import {ViewAddressComponent} from './view-address/view-address.component';

 export const AddressRoutes = [
  {
    path:'',
    component:AddressComponent
  },
   {
     path:'map',
     component:MapComponent
   },
   {
     path:'view',
     component:ViewAddressComponent
   }
]

