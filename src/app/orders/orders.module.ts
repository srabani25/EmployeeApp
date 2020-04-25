import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TableModule,
    FormsModule
  ]
})
export class OrdersModule { }
