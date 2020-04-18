import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {AlertService} from '../shared/components/alert/alert.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public fullName: String = '';
  public email: string = '';
  public password: string = '';
  public passwordSignUp: string = '';
  public isInvalidEmail: Boolean;
  public isInvalidPass: Boolean;

  public options = {
                autoClose: false,
                keepAfterRouteChange: false
                    };

  constructor(private userService: UserService,
              private router: Router,
              private alert: AlertService) { }

  ngOnInit() {
  }
  submit() {
    if (!this.email && !this.password) {
      this.isInvalidEmail = true;
      this.isInvalidPass = true;
    } else if (!this.email && this.password) {
      this.isInvalidEmail = true;
      this.isInvalidPass = false;
    } else if (this.email && !this.password) {
      this.isInvalidEmail = false;
      this.isInvalidPass = true;
    } else {
       this.isInvalidEmail = false;
      this.isInvalidPass = false;
      this.userService.login(this.email, this.password).subscribe((response: any)=>{
        if(response.status ===200){
             this.alert.success('success');
             localStorage.setItem('token', response.token);
             localStorage.setItem('userId', this.email);
            this.router.navigateByUrl('/home');

        }

      });
    }

  }
  toggle(){
     document.querySelector('.cont').classList.toggle('s--signup');


  }
  register() {
    this.userService.createUser(this.email, this.passwordSignUp, this.fullName)
      .subscribe((response: any) =>{
    if (response.status === 200) {
        // alert(response.msg);
        this.alert.success(response.msg);
        this.email = '';
        this.passwordSignUp = '';
        this.fullName = '';
        // this.toggleHandler.emit('login');
        this.toggle();
    } else {
      this.alert.error(response.msg);
    }
    },errorRes=>{
      this.alert.error(errorRes.error.msg.message);
    })

  }

}
