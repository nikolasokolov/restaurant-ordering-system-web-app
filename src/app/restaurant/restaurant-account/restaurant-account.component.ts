import {Component, OnInit} from '@angular/core';
import {RestaurantService} from '../restaurant-service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {NgForm} from '@angular/forms';
import {RestaurantItem} from '../../model/restaurant-item.model';
import {RestaurantAccount} from '../../model/restaurant-account.model';
import {Restaurant} from '../../model/restaurant.model';

@Component({
  selector: 'app-restaurant-account',
  templateUrl: './restaurant-account.component.html',
  styleUrls: ['./restaurant-account.component.css']
})
export class RestaurantAccountComponent implements OnInit {
  isLoading = false;
  error = null;
  accountAddedSuccessfully = false;
  restaurant: Restaurant;

  constructor(private restaurantService: RestaurantService, private location: Location, private router: Router) { }

  ngOnInit() {
    this.restaurantService.restaurantItemSubject.subscribe(response => {
      this.restaurant = response;
    });
  }

  addAccountForRestaurant(addAccountForm: NgForm) {
    this.isLoading = true;
    const username = addAccountForm.value.username;
    const email = addAccountForm.value.email;
    const newPassword = addAccountForm.value.newPassword;
    const confirmPassword = addAccountForm.value.confirmPassword;
    if (username.value < 6 || email.value < 8 || newPassword.value < 6 || confirmPassword.value < 6) {
      this.error = 'All field should be at least 6 characters';
    } else if (newPassword !== confirmPassword) {
      this.error = 'Passwords doesn\'t match';
      this.isLoading = false;
    } else {
      const restaurantAccount = new RestaurantAccount(username, email, newPassword, confirmPassword);
      this.restaurantService.addAccountForRestaurant(this.restaurant.id, restaurantAccount).subscribe(() => {
        this.isLoading = false;
        this.accountAddedSuccessfully = true;
      }, (error) => {
        console.log(error);
        this.isLoading = false;
        this.error = 'An error occurred';
      });
    }
  }

  goBack() {
    this.location.back();
  }

}
