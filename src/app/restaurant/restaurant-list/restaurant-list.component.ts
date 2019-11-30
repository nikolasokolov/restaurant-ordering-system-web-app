import {Component, OnInit} from '@angular/core';
import {RestaurantService} from '../restaurant-service';
import {DomSanitizer} from '@angular/platform-browser';
import {RestaurantItem} from '../../model/restaurant-item.model';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: RestaurantItem[];
  isLoading = false;

  constructor(private restaurantService: RestaurantService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.isLoading = true;
    this.restaurantService.getAllRestaurants().subscribe((response: any[]) => {
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
