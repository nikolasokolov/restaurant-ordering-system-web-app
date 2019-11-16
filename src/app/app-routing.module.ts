import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticationComponent} from './authentication/authentication.component';
import {HomeComponent} from './home/home.component';
import {AuthenticationGuard} from './authentication/authentication-guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'authenticate', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
