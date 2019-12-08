import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './authentication/authentication.component';
import {HomeComponent} from './home/home.component';
import {AuthenticationGuard} from './authentication/authentication-guard';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {CompanyListComponent} from './company/company-list/company-list.component';
import {CompanyEditComponent} from './company/company-edit/company-edit.component';
import {CompanyItemComponent} from './company/company-item/company-item.component';
import {AuthorizationGuard} from './authentication/authorization-guard';
import {RestaurantListComponent} from './restaurant/restaurant-list/restaurant-list.component';
import {RestaurantEditComponent} from './restaurant/restaurant-edit/restaurant-edit.component';
import {RestaurantItemComponent} from './restaurant/restaurant-item/restaurant-item.component';
import {RestaurantAccountComponent} from './restaurant/restaurant-account/restaurant-account.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'authenticate', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthenticationGuard] },
  { path: 'companies', component: CompanyListComponent, canActivate: [AuthorizationGuard] },
  { path: 'company-edit/:id', component: CompanyEditComponent, canActivate: [AuthorizationGuard] },
  { path: 'company-add', component: CompanyEditComponent, canActivate: [AuthorizationGuard] },
  { path: 'company/:id', component: CompanyItemComponent, canActivate: [AuthorizationGuard] },
  { path: 'restaurants', component: RestaurantListComponent, canActivate: [AuthorizationGuard] },
  { path: 'company-restaurants/:id', component: RestaurantListComponent, canActivate: [AuthorizationGuard] },
  { path: 'restaurant-edit/:id', component: RestaurantEditComponent, canActivate: [AuthorizationGuard] },
  { path: 'restaurant-add', component: RestaurantEditComponent, canActivate: [AuthorizationGuard] },
  { path: 'restaurant/:id', component: RestaurantItemComponent, canActivate: [AuthorizationGuard] },
  { path: 'restaurant-account/add/:id', component: RestaurantAccountComponent, canActivate: [AuthorizationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
