import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Output() toggleHandler = new EventEmitter();
  public fullName: String = '';
  public email: String = '';
  public password1: String = '';
  public password2: String = '';

  constructor(private userService: UserService,
              private router: Router
              ) { }

  ngOnInit() {
  }

  register() {
    this.userService.createUser(this.email, this.password1, this.fullName)
      .subscribe((response: any) =>{
    if (response.status === 200) {
        alert(response.msg);
        this.email = '';
        this.password1 = '';
        this.password1 = '';
        this.fullName = '';
        this.toggleHandler.emit('login');
    }
    })

  }
}
