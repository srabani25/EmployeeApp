import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  headerFooter: boolean;

  constructor(
     private router: Router){}


 ngOnInit() {
  this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if((event.url !== '/login') && (event.url !== '/')) {
        this.headerFooter = true
        } else {
         this.headerFooter = false
        }
      }
    });
    this.fbLibrary();
}

fbLibrary() {

    (window as any).fbAsyncInit = function() {
      window['FB'].init({
        appId      : '279530433056929',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      window['FB'].AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

}
}
