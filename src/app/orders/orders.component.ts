import {Component,OnInit} from '@angular/core';
import {OrderServiceService,Book} from './order-service.service';
import {AlertService} from '../shared/components/alert/alert.service';
import {LazyLoadEvent} from 'primeng/api/primeng-api';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  refresh = true;
  showForm: boolean;
  books: Book[];
  virtualBooks: Book[];
  name: String;
  author: String;
  price: Number;
  model: any = {};
  cols = [];
  loading: boolean;
  virtualBook: Book[];
  totalRecords: number;
  selectedBooks: Book[];
  inmemoryData: {name: string; price: number; author: string;}[];



  constructor(private orderService: OrderServiceService,
    private alert: AlertService) {

  }
  ngOnInit() {
    this.cols = [
      {field: 'name',header: 'Book Name'},
      {field: 'author',header: 'Author Name'},
      {field: 'price',header: 'Price'}
    ];
  }
  loadDataOnScroll(event: LazyLoadEvent) {
    this.loading = true;
    this.orderService.getBooks().subscribe((res: any) => {
      if(res.status == 200) {
        this.totalRecords = res.data;
        if (this.totalRecords <= 10)
          this.loadChunk(event.first,0);
        else if (this.totalRecords <= event.rows)
          this.loadChunk(event.first,this.totalRecords);
        else
          this.loadChunk(event.first,event.rows);
      }
    });
    //for demo purposes keep loading the same dataset
    //in a real production application, this data should come from server by building the query with LazyLoadEvent options

    //last chunk



  }

  loadChunk(index,length) {
    this.orderService.getBooksWithLimit(index,length).subscribe((res: any) => {
      if(res.status === 200) {
        this.virtualBooks = res.data;
        this.loading = false;

      } else {
        this.loading = false;

      }
    })
  }

  onSubmit() {
    this.orderService.addBooks(this.model).subscribe((res: any) => {
      if(res.status === 200) {
        this.alert.success(res.msg);
        this.showForm = false;
        this.virtualBooks.push(this.model);
        this.model = {};
      } else {
        this.alert.error(res.msg);
        this.showForm = false;
      }
    });



    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model, null, 4));
  }

  delete() {
    const dbArrays = [];
    if(this.selectedBooks && this.selectedBooks.length > 0) {
      this.selectedBooks.map(function(element) {
        if(element && element._id) {
          dbArrays.push(element._id);
        }
      });
      this.orderService.deleteBooks(dbArrays).subscribe((res: any) => {
        console.log(res);
        if(res.status === 200) {
          this.alert.success(res.msg);
          this.selectedBooks = [];
        }
      });
    }
  }
}