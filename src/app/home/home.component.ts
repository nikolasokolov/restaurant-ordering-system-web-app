import {Component, OnInit} from '@angular/core';
import {HomeService} from './home-service';
import {AuthenticationService} from '../authentication/authentication.service';
import {RestaurantItem} from '../model/restaurant-item.model';
import {DomSanitizer} from '@angular/platform-browser';
import {UserDetails} from '../model/user-details.model';
import {MonthlyInvoiceDialogComponent} from "../shared/monthly-invoice-dialog/monthly-invoice-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = false;
  restaurants: RestaurantItem[];
  restaurantsFetched = false;
  userDetails: UserDetails;
  alert = new Subject<string>();
  alertMessage: string;

  constructor(private homeService: HomeService, private authenticationService: AuthenticationService,
              private sanitizer: DomSanitizer, public dialog: MatDialog) {}

  ngOnInit() {
    this.authenticationService.restaurants.subscribe(response => {
      this.restaurants = response;
      this.restaurantsFetched = !!response;
    });
    this.authenticationService.userDetails.subscribe(response => {
      this.userDetails = response;
    });
    if (!this.restaurantsFetched) {
      if (this.userDetails !== null) {
        if (!this.userDetails.authorities.includes('ROLE_RESTAURANT')
          && !this.userDetails.authorities.includes('ROLE_SUPER_ADMIN')) {
          this.getRestaurantsForUser(Number(this.userDetails.id));
        }
      }
    }
    this.alert.subscribe((message) => this.alertMessage = message);
    this.alert.pipe(debounceTime(2500)).subscribe(() => this.alertMessage = null);
  }

  getRestaurantsForUser(userId: number) {
    this.isLoading = true;
    this.homeService.getRestaurantsForUser(userId).subscribe((response: any[]) => {
      this.restaurants = response;
      for (const restaurantItem of this.restaurants) {
        const objectURL = 'data:image/jpeg;base64,' + restaurantItem.logo;
        restaurantItem.logoImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  openInvoiceDialog(): void {
    const dialogRef = this.dialog.open(MonthlyInvoiceDialogComponent, {
      width: '500px',
      height: '250px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changeMessage('Invoice is successfully sent');
      }
    });
  }

  changeMessage(message: string) {
    this.alert.next(message);
  }

}
