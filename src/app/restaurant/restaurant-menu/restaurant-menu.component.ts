import {Component, OnInit} from '@angular/core';
import {RestaurantMenuManagementService} from '../restaurant-menu-management-service';
import {MenuItem} from '../../model/menu-item.model';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {NgForm} from '@angular/forms';
import {OrderService} from '../order-service';
import {OrderRequest} from '../../model/order-request.model';
import {AuthenticationService} from '../../authentication/authentication.service';
import {UserOrderResponse} from '../../model/user-order-response.model';

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
  restaurantId;
  userId;
  hasUserOrdered = false;
  userOrder: UserOrderResponse = null;
  orderSuccess = false;
  isInEdit = false;

  constructor(private restaurantMenuManagementService: RestaurantMenuManagementService,
              private activatedRoute: ActivatedRoute, private location: Location,
              private orderService: OrderService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.userDetails.subscribe(response => {
      this.userId = response.id;
    });
    this.restaurantId = this.activatedRoute.snapshot.params.id;
    this.getUserOrder(this.userId, this.restaurantId);
    this.restaurant = this.activatedRoute.snapshot.queryParamMap.get('restaurant');
    this.getRestaurantMenu(this.restaurantId);
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
    const userId = this.userId;
    const menuItem = orderForm.value.menuItem;
    const timePeriod = this.selectedTimePeriod;
    const comments = orderForm.value.comments;
    const restaurantId = this.restaurantId;
    let menuItemId: number = null;
    for (const menuItemFromList of this.menuItems) {
      if (menuItemFromList.name === menuItem) {
        menuItemId = menuItemFromList.id;
      }
    }
    let orderRequest;
    if (this.userOrder !== null) {
      const orderId = this.userOrder.id;
      orderRequest = new OrderRequest(timePeriod, comments, menuItemId, restaurantId, userId, orderId);
    } else {
      orderRequest = new OrderRequest(timePeriod, comments, menuItemId, restaurantId, userId);
    }
    this.orderService.submitOrder(orderRequest).subscribe(response => {
      this.userOrder = response;
      this.hasUserOrdered = true;
      this.orderSuccess = true;
      this.isInEdit = false;
    }, error => {
      this.hasUserOrdered = false;
    });
  }

  getUserOrder(userId: any, restaurantId: any) {
    this.orderService.getUserOrder(userId, restaurantId).subscribe(response => {
      this.userOrder = response;
      if (this.userOrder !== null) {
        this.hasUserOrdered = true;
        this.isInEdit = false;
      }
    }, error => {
      this.hasUserOrdered = false;
      this.isInEdit = false;
    });
  }

  enableEditOrder() {
    this.isInEdit = true;
  }
}
