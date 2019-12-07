import {Component, OnInit} from '@angular/core';
import {RestaurantService} from '../restaurant-service';
import {DomSanitizer} from '@angular/platform-browser';
import {RestaurantItem} from '../../model/restaurant-item.model';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: RestaurantItem[];
  isLoading = false;
  companyId = null;

  constructor(private restaurantService: RestaurantService, private sanitizer: DomSanitizer,
              private activatedRoute: ActivatedRoute, private location: Location, public dialog: MatDialog) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id !== undefined) {
      this.companyId = id;
      this.getRestaurantsForCompany(id);
    } else {
      this.companyId = null;
      this.getAllRestaurants();
    }
  }

  getRestaurantsForCompany(id: number) {
    this.isLoading = true;
    this.restaurantService.getRestaurantsForCompany(id).subscribe((response: any[]) => {
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

  goBack() {
    this.location.back();
  }

  openDialog(companyId: any, restaurantId: number, restaurantName: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      height: '150px',
      data: 'Are you sure you want to delete restaurant ' + restaurantName + ' ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRestaurantForCompany(companyId, restaurantId);
      }
    });
  }

  private deleteRestaurantForCompany(companyId: any, restaurantId: number) {
    this.restaurantService.deleteRestaurantForCompany(companyId, restaurantId).subscribe(() => {
      this.getRestaurantsForCompany(companyId);
    }, () => {
    });
  }
}
