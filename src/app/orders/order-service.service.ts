import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
export interface Book {   name;  price;  author; _id;
}
@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

constructor(private http: HttpClient) {}
//   getBooks() {
//     return this.http.get<any>('assets/books.json').toPromise().then(res => <Book[]>res.data).then(data => { return data; });


// }
 getBooks() {
    return this.http.get( environment.baseURL + 'api/book/all' );
 }
addBooks(payload){

  return this.http.post( environment.baseURL + 'api/book/create',payload );
}
deleteBooks(id){
  const payload = {"id":id};
  return this.http.post( environment.baseURL +'api/book/delete', payload);

}
getBooksWithLimit(skip, limit){
  const payload = {"limit": limit, "skip" : skip}
  return this.http.post(environment.baseURL +'api/book/getBook', payload);
}
}
