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
import {UserListComponent} from './user/user-list/user-list.component';
import {UserAddComponent} from './user/user-add/user-add.component';
import {RestaurantMenuComponent} from './restaurant/restaurant-menu/restaurant-menu.component';
import {RestaurantMenuManagementComponent} from './restaurant/restaurant-menu-management/restaurant-menu-management.component';
import {MenuItemEditComponent} from './restaurant/menu-item-edit/menu-item-edit.component';


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
  { path: 'restaurant-account/add/:id', component: RestaurantAccountComponent, canActivate: [AuthorizationGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AuthorizationGuard] },
  { path: 'users/:id', component: UserListComponent, canActivate: [AuthorizationGuard] },
  { path: 'user-add', component: UserAddComponent, canActivate: [AuthorizationGuard] },
  { path: 'user-add/:id', component: UserAddComponent, canActivate: [AuthorizationGuard] },
  { path: 'restaurant-menu/:id', component: RestaurantMenuComponent, canActivate: [AuthorizationGuard] },
  { path: 'menu-management', component: RestaurantMenuManagementComponent, canActivate: [AuthenticationGuard] },
  { path: 'menu-item/add', component: MenuItemEditComponent, canActivate: [AuthenticationGuard] },
  { path: 'menu-item/edit/:id', component: MenuItemEditComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
