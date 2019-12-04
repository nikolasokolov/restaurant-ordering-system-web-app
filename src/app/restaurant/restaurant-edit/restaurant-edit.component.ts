import {Component, OnInit} from '@angular/core';
import {Company} from '../../model/company.model';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Restaurant} from '../../model/restaurant.model';
import {RestaurantService} from '../restaurant-service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.css']
})
export class RestaurantEditComponent implements OnInit {
  restaurantEditedSuccessfully = null;
  restaurantAddedSuccessfully = null;
  restaurant: Restaurant;
  isLoading = false;
  error = null;
  isInEdit = false;
  selectedPhoto: File = null;

  constructor(private restaurantService: RestaurantService, private activatedRoute: ActivatedRoute,
              private location: Location, private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id !== undefined) {
      this.restaurantService.getRestaurant(id).subscribe(response => {
        this.restaurant = response;
        this.isInEdit = true;
      });
    } else {
      this.restaurant = new Company('', '', '');
    }
  }

  handleRestaurantForm(restaurantForm: NgForm) {
    this.isLoading = true;
    const name = restaurantForm.value.name;
    const address = restaurantForm.value.address;
    const phoneNumber = restaurantForm.value.phoneNumber;
    if (this.restaurant.id !== undefined) {
      const editRestaurantRequest = new Restaurant(name, address, phoneNumber, this.restaurant.id);
      this.restaurantService.editRestaurant(editRestaurantRequest).subscribe(() => {
        this.restaurantEditedSuccessfully = true;
        this.isLoading = false;
        this.router.navigate(['/restaurant/' + this.restaurant.id]);
      }, () => {
        this.isLoading = false;
        this.error = 'Error occurred while trying to update company';
      });
      restaurantForm.resetForm();
    } else {
      const addRestaurantRequest = new Company(name, address, phoneNumber);
      this.restaurantService.addRestaurant(addRestaurantRequest).subscribe(response => {
        this.restaurantAddedSuccessfully = true;
        this.isLoading = false;
        this.restaurantService.uploadFile(this.selectedPhoto, response.id).subscribe(() => {
        }, () => {
        });
      }, () => {
        this.isLoading = false;
        this.error = 'Restaurant could not be added';
      });
      restaurantForm.resetForm();
    }
  }

  onFileSelected(event) {
    this.selectedPhoto = event.target.files[0];
  }

  goBack() {
    this.location.back();
  }

}
