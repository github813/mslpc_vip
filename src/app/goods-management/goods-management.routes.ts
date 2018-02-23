import { RouterModule } from '@angular/router';
import { GoodsManagementComponent } from './goods-management.component';
import { GoodsInfoComponent } from './goods-info/goods-info.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

export const GoodsManagementRoutes = [
    {
        path: '',
        component: GoodsManagementComponent
   }, 
   {
       path:'goodsInfo',
       component: GoodsInfoComponent
   },
   {
       path:'invoiceDetails',
       component: InvoiceDetailsComponent
   }
]