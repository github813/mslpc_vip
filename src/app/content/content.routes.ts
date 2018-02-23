import { RouterModule } from '@angular/router';
import { ContentComponent } from './content.component';
import { HomeComponent } from '../home/home.component';
import {GoodsTypeModule} from '../goods-type/goods-type.module';
import {BrokerModule} from '../broker/broker.module';
import {OrderTemplateModule} from '../order-template/order-template.module';


export const ContentRoutes = [
    {path:'content',component:ContentComponent,
        children:[
            {path: '',
            component: HomeComponent
        },
            {path: 'home',
            component: HomeComponent
        },
            {
            path: 'goodsManagement',//货源管理
            loadChildren: '../goods-management/goods-management.module#GoodsManagementModule'
        },
            {path:'infoStatistical',//货源统计
            loadChildren: '../info-statistical/info-statistical.module#InfoStatisticalModule'
        },
          {
            path:'goodstype',//品类管理
            loadChildren: '../goods-type/goods-type.module#GoodsTypeModule'
          },
          {
            path:'broker',//品类管理
            loadChildren: '../broker/broker.module#BrokerModule'
          },
          {
            path:'ordertemplate',//发货
            loadChildren: '../order-template/order-template.module#OrderTemplateModule'
          },
          {
            path:'address',//发货
            loadChildren: '../address/address.module#AddressModule'
          }
        ]
    }
]
