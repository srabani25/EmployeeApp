import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ErrorComponent} from './error/error.component';
import {UserComponent} from './user/user.component';
import {RootAuthGuard} from './shared/guards/root-auth.guard';
import {UserProfileComponent} from './user/user-profile/user-profile.component';


const routes: Routes = [
  { path: '',  redirectTo: 'home', pathMatch: 'full'},
  { path: 'login', component: UserComponent},
  { path: 'logout', component: UserComponent},
  {path: 'user-profile',component:UserProfileComponent},
  {path: 'home', component: HomeComponent, canActivate:[RootAuthGuard],
    children: [
        { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
        { path: '', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },

    ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
