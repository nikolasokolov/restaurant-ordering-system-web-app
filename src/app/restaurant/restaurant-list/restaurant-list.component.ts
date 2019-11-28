import {Component, OnInit} from '@angular/core';
import {RestaurantService} from '../restaurant-service';
import {Restaurant} from '../../model/restaurant.model';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[];
  isLoading = false;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.isLoading = true;
    this.restaurantService.getAllRestaurants().subscribe((response: any[]) => {
      this.restaurants = response;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

}
