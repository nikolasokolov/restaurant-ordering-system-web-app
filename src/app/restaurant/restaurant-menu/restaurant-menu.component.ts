import { Component, OnInit } from '@angular/core';
import {RestaurantMenuManagementService} from '../restaurant-menu-management-service';
import {MenuItem} from '../../model/menu-item.model';
import {ActivatedRoute, Route} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {
  error = null;
  isLoading = false;
  typeToMenuItems: Map<string, MenuItem[]>;
  restaurant: string;

  constructor(private restaurantMenuManagementService: RestaurantMenuManagementService,
              private activatedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    const restaurantId = this.activatedRoute.snapshot.params.id;
    this.restaurant = this.activatedRoute.snapshot.queryParamMap.get('restaurant');
    this.getRestaurantMenu(restaurantId);
  }

  getRestaurantMenu(restaurantId: number) {
    this.isLoading = true;
    return this.restaurantMenuManagementService.getRestaurantMenu(restaurantId).subscribe(response => {
      this.typeToMenuItems = response;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  goBack() {
    this.location.back();
  }

}
