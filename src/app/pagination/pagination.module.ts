import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaginationComponent } from './pagination.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [PaginationComponent],
    exports: [PaginationComponent],
})
export class PaginationModule { }
