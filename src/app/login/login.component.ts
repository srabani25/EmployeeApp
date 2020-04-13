import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';
import {AlertService} from '../shared/components/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';
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
             this.alert.success('success',this.options);
             localStorage.setItem('token', response.token);
             localStorage.setItem('userId', this.email);
            this.router.navigateByUrl('/home');

        }

      });
    }

  }
}
