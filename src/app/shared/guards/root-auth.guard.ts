import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RootAuthGuard implements CanActivate {
  constructor(private router: Router,
              private httpClient: HttpClient) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = localStorage.getItem('token');
    if (token) {
      var userPayload:any = atob(token.split('.')[1]);
      let data = JSON.parse(userPayload);
      if(data.exp) {
        if((data.exp > Date.now() / 1000)) {
          return true;
        } else {
           alert('Session Expired');
          this.router.navigateByUrl('/login');
          return false;
        }
      }
    } else {
      alert('Kindly login first');
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
