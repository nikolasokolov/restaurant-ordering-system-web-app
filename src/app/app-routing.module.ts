import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './authentication/authentication.component';
import {HomeComponent} from './home/home.component';
import {LoginGuard} from './authentication/login-guard';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {CompanyListComponent} from './company/company-list/company-list.component';
import {CompanyEditComponent} from './company/company-edit/company-edit.component';
import {CompanyItemComponent} from './company/company-item/company-item.component';
import {SuperAdminGuard} from './authentication/super-admin-guard';
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
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [LoginGuard] },
  { path: 'companies', component: CompanyListComponent, canActivate: [SuperAdminGuard] },
  { path: 'company-edit/:id', component: CompanyEditComponent, canActivate: [SuperAdminGuard] },
  { path: 'company-add', component: CompanyEditComponent, canActivate: [SuperAdminGuard] },
  { path: 'company/:id', component: CompanyItemComponent, canActivate: [SuperAdminGuard] },
  { path: 'restaurants', component: RestaurantListComponent, canActivate: [SuperAdminGuard] },
  { path: 'company-restaurants/:id', component: RestaurantListComponent, canActivate: [SuperAdminGuard] },
  { path: 'restaurant-edit/:id', component: RestaurantEditComponent, canActivate: [SuperAdminGuard] },
  { path: 'restaurant-add', component: RestaurantEditComponent, canActivate: [SuperAdminGuard] },
  { path: 'restaurant/:id', component: RestaurantItemComponent, canActivate: [SuperAdminGuard] },
  { path: 'restaurant-account/add/:id', component: RestaurantAccountComponent, canActivate: [SuperAdminGuard] },
  { path: 'users', component: UserListComponent, canActivate: [SuperAdminGuard] },
  { path: 'users/:id', component: UserListComponent, canActivate: [SuperAdminGuard] },
  { path: 'user-add', component: UserAddComponent, canActivate: [SuperAdminGuard] },
  { path: 'user-add/:id', component: UserAddComponent, canActivate: [SuperAdminGuard] },
  { path: 'restaurant-menu/:id', component: RestaurantMenuComponent, canActivate: [LoginGuard] },
  { path: 'menu-management', component: RestaurantMenuManagementComponent, canActivate: [LoginGuard] },
  { path: 'menu-item/add', component: MenuItemEditComponent, canActivate: [LoginGuard] },
  { path: 'menu-item/edit/:id', component: MenuItemEditComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
