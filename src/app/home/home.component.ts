import {Component, OnInit} from '@angular/core';
import {HomeService} from './home-service';
import {AuthenticationService} from '../authentication/authentication.service';
import {RestaurantItem} from '../model/restaurant-item.model';
import {DomSanitizer} from '@angular/platform-browser';
import {UserDetails} from '../model/user-details.model';

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

  constructor(private homeService: HomeService, private authenticationService: AuthenticationService,
              private sanitizer: DomSanitizer) {}

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

}
