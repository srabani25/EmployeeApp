import { Component, OnInit } from '@angular/core';
import {OrderServiceService, Book} from './order-service.service';
import {AlertService} from '../shared/components/alert/alert.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
   showForm: boolean;
   books: Book[];
   name: String;
   author: String;
   price: Number;
   model: any = {};

  constructor(private orderService: OrderServiceService,
                private alert: AlertService) { }
  ngOnInit() {
     this.fetchBooks();
  }
  fetchBooks(){
     this.orderService.getBooks().subscribe((res: Book[])=>{
        this.books = res;
      });

  }

  onSubmit() {
     this.orderService.addBooks(this.model).subscribe((res: any)=>{
       if(res.status === 200) {
         this.alert.success(res.msg);
         this.fetchBooks();
         this.showForm = false;
         this.model= null;
       } else {
         this.alert.error(res.msg);
         this.showForm = false;
       }
      });


    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model, null, 4));
  }
}