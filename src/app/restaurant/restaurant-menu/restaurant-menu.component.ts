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
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

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
  timePeriods = ['11:00', '11:30', '12:00', '12:30'];
  selectedTimePeriod = '11:00';
  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];
  restaurantId;
  userId;
  hasUserOrdered = false;
  userOrder: UserOrderResponse = null;
  orderSuccess = false;
  isInEdit = false;
  isOrderForCurrentlyOpenRestaurant = null;
  orderCanceled = null;
  alert = new Subject<string>();
  alertMessage: string;

  constructor(private restaurantMenuManagementService: RestaurantMenuManagementService,
              private activatedRoute: ActivatedRoute, private location: Location,
              private orderService: OrderService, private authenticationService: AuthenticationService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.authenticationService.userDetails.subscribe(response => {
      this.userId = response.id;
    });
    this.restaurantId = this.activatedRoute.snapshot.params.id;
    this.getUserOrder(this.userId, this.restaurantId);
    this.restaurant = this.activatedRoute.snapshot.queryParamMap.get('restaurant');
    this.getRestaurantMenu(this.restaurantId);
    this.filteredMenuItems = this.menuItems;
    this.alert.subscribe((message) => this.alertMessage = message);
    this.alert.pipe(debounceTime(2500)).subscribe(() => this.alertMessage = null);
    this.validateTimePeriodValues();
  }

  changeMessage(message: string) {
    this.alert.next(message);
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
      this.changeMessage('Order updated successfully');
    } else {
      orderRequest = new OrderRequest(timePeriod, comments, menuItemId, restaurantId, userId);
      this.changeMessage('Order submitted successfully');
    }
    this.orderService.submitOrder(orderRequest).subscribe(response => {
      this.userOrder = response;
      this.isOrderForCurrentlyOpenRestaurant = this.userOrder.restaurantId === Number(this.restaurantId);
      this.hasUserOrdered = true;
      this.orderSuccess = true;
      this.isInEdit = false;
    }, () => {
      this.hasUserOrdered = false;
    });
  }

  getUserOrder(userId: any, restaurantId: any) {
    this.orderService.getUserOrder(userId, restaurantId).subscribe(response => {
      this.userOrder = response;
      if (this.userOrder !== null) {
        this.hasUserOrdered = true;
        this.isInEdit = false;
        this.isOrderForCurrentlyOpenRestaurant = this.userOrder.restaurantId === Number(this.restaurantId);
      }
    }, error => {
      this.hasUserOrdered = false;
      this.isInEdit = false;
    });
  }

  enableEditOrder() {
    this.isInEdit = true;
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      height: '140px',
      data: 'Are you sure you want to cancel your order ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelOrder(id);
      }
    });
  }

  cancelOrder(id: number) {
    this.orderService.cancelOrder(id).subscribe(response => {
      this.orderCanceled = true;
      this.hasUserOrdered = false;
      this.orderSuccess = null;
      this.isInEdit = false;
      this.isOrderForCurrentlyOpenRestaurant = null;
      this.userOrder = null;
      this.changeMessage('Order successfully canceled');
    }, () => {
      this.orderCanceled = true;
    });
  }

  validateTimePeriodValues() {
    const timePeriods = [];
    for (const timePeriod of this.timePeriods) {
      const currentHour = new Date().getHours();
      const currentHourFromArray = timePeriod.substr(0, 2);
      if (Number(currentHour) < Number(currentHourFromArray)) {
        timePeriods.push(timePeriod);
      } else if (Number(currentHour) === Number(currentHourFromArray)) {
        const currentMinutes = new Date().getMinutes();
        const currentMinutesFromArray = timePeriod.substr(3, 5);
        if (Number(currentMinutes) < Number(currentMinutesFromArray)) {
          timePeriods.push(timePeriod);
        }
      }
    }
    this.timePeriods = timePeriods;
  }
}
