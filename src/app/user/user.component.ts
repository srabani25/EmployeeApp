import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public showLoginPage = true;
  constructor() { }

  ngOnInit() {
  }
 toggle(condition: String) {
   if (condition === 'login') {
     this.showLoginPage = true;
   } else {
     this.showLoginPage = false;
   }
 }
 toggleEventHandler($event) {
   this.showLoginPage = true;
 }
}
