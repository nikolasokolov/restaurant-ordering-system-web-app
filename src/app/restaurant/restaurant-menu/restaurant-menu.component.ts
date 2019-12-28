import {Component, OnInit} from '@angular/core';
import {RestaurantMenuManagementService} from '../restaurant-menu-management-service';
import {MenuItem} from '../../model/menu-item.model';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {NgForm} from '@angular/forms';

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
  timePeriods = ['11:00', '12:00', '13:00'];
  selectedTimePeriod = '11:00';
  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];

  constructor(private restaurantMenuManagementService: RestaurantMenuManagementService,
              private activatedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    const restaurantId = this.activatedRoute.snapshot.params.id;
    this.restaurant = this.activatedRoute.snapshot.queryParamMap.get('restaurant');
    this.getRestaurantMenu(restaurantId);
    this.filteredMenuItems = this.menuItems;
  }

  getRestaurantMenu(restaurantId: number) {
    this.isLoading = true;
    return this.restaurantMenuManagementService.getRestaurantMenu(restaurantId).subscribe(response => {
      this.typeToMenuItems = response;
      this.menuItems = this.fillAutocompleteValues(response);
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  goBack() {
    this.location.back();
  }

  changeTimePeriod(timePeriod: any) {
    this.selectedTimePeriod = timePeriod;
  }

  fillAutocompleteValues(response: any) {
    const menuItems = [];
    Object.keys(response).forEach(key => {
      menuItems.push(response[key]);
    });
    return Array.prototype.concat.apply([], menuItems);
  }

  onKeyUp(event: any) {
    let menuItemFilter = '';
    menuItemFilter += event.target.value;
    this.filterMenuItems(menuItemFilter);
  }

  filterMenuItems(val: string) {
    if (val.length > 0) {
      const filterValue = val.toLowerCase();
      this.filteredMenuItems = this.menuItems.filter(menuItem => menuItem.name.toLowerCase().includes(filterValue));
    } else {
      this.filteredMenuItems = [];
    }
  }

  submitOrder(orderForm: NgForm) {
    console.log(orderForm);
    console.log('submitting order');
  }
}
