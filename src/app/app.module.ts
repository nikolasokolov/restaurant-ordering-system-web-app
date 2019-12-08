import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {AuthenticationInterceptorService} from './authentication/authentication-interceptor.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule, MatDialogModule, MatMenuModule, MatSortModule} from '@angular/material';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {CompanyListComponent} from './company/company-list/company-list.component';
import {CompanyItemComponent} from './company/company-item/company-item.component';
import {CompanyEditComponent} from './company/company-edit/company-edit.component';
import { RestaurantListComponent } from './restaurant/restaurant-list/restaurant-list.component';
import { RestaurantItemComponent } from './restaurant/restaurant-item/restaurant-item.component';
import { RestaurantEditComponent } from './restaurant/restaurant-edit/restaurant-edit.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { RestaurantAccountComponent } from './restaurant/restaurant-account/restaurant-account.component';
import { AddRestaurantDialogComponent } from './shared/add-restaurant-dialog/add-restaurant-dialog.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserListComponent } from './user/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    NavbarComponent,
    ChangePasswordComponent,
    CompanyListComponent,
    CompanyItemComponent,
    CompanyEditComponent,
    RestaurantListComponent,
    RestaurantItemComponent,
    RestaurantEditComponent,
    ConfirmationDialogComponent,
    RestaurantAccountComponent,
    AddRestaurantDialogComponent,
    UserAddComponent,
    UserListComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        FlexLayoutModule,
        MatCardModule,
        MatMenuModule,
        MatDialogModule,
        MatDialogModule,
        MatSortModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true
    }
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    AddRestaurantDialogComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
