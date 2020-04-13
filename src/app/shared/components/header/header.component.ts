import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public menuItems = [{url:'/home', name: 'Home'},
                      {url:'/home/orders', name: 'Order'}];
  public options = [{url:'/home', name: 'Home'},
                      {url:'/projects', name: 'Project'},
                      {url:'/orders', name: 'Order'}];
  constructor(private router: Router) {

   }

  ngOnInit() {
  }
  logout() {
    this.router.navigateByUrl('/login');
    localStorage.clear();


  }
  navigateTo(url){
    this.router.navigateByUrl(url);
  }

}
