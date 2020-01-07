import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RestaurantItem} from '../../model/restaurant-item.model';
import {CompanyItem} from '../../model/company-item.model';
import {CompanyService} from '../../company/company-service';
import {RestaurantService} from '../../restaurant/restaurant-service';

@Component({
  selector: 'app-add-restaurant-dialog',
  templateUrl: './add-restaurant-dialog.component.html',
  styleUrls: ['./add-restaurant-dialog.component.css']
})
export class AddRestaurantDialogComponent implements OnInit {
  isLoading = false;
  restaurants: RestaurantItem[] = null;
  companyItem: CompanyItem;
  selectedRestaurantId: number;
  errorMessage = null;

  constructor(public dialogRef: MatDialogRef<AddRestaurantDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public company: CompanyItem, private companyService: CompanyService,
              private restaurantService: RestaurantService) {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.companyItem = this.company;
    this.getAvailableRestaurantsForCompany();
  }

  getAvailableRestaurantsForCompany() {
    const companyId = this.companyItem.id;
    this.isLoading = true;
    this.restaurantService.getAvailableRestaurantsForCompany(companyId).subscribe((response: any[]) => {
      this.restaurants = response;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  changeRestaurant(restaurantId: any) {
    this.selectedRestaurantId = restaurantId;
  }

  addRestaurant() {
    const restaurantId = this.selectedRestaurantId;
    this.companyService.addRestaurantForCompany(this.companyItem, restaurantId).subscribe(() => {
    }, () => {
      this.errorMessage = 'An error occurred trying to add restaurant to company ' + this.companyItem.name;
    });
  }
}
