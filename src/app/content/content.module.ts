import {GoodsManagementComponent} from '../goods-management/goods-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentRoutes } from './content.routes';
import { ContentComponent } from './content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { PaginationComponent } from '../pagination/pagination.component';


@NgModule({
    imports: [
        RouterModule.forChild(ContentRoutes), CommonModule,
         FormsModule, ReactiveFormsModule
    ],
    declarations: [ContentComponent],
    providers: [ContentComponent],

})
export class ContentModule {

}
