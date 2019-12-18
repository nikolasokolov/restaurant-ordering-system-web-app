import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantService} from '../restaurant-service';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {RestaurantItem} from '../../model/restaurant-item.model';
import {DomSanitizer} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {RestaurantAccount} from '../../model/restaurant-account.model';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.css']
})
export class RestaurantItemComponent implements OnInit {
  isLoading = false;
  restaurantItem: RestaurantItem;

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute,
              private restaurantService: RestaurantService, private router: Router,
              public dialog: MatDialog, private sanitizer: DomSanitizer, private location: Location,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getRestaurant();
  }

  getRestaurant() {
    this.isLoading = true;
    const id = this.activatedRoute.snapshot.params.id;
    this.restaurantService.getRestaurant(id).subscribe(response => {
      this.restaurantItem = response;
      const objectURL = 'data:image/jpeg;base64,' + this.restaurantItem.logo;
      this.restaurantItem.logoImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  deleteRestaurant(id: number) {
    this.restaurantService.deleteRestaurant(id).subscribe(() => {
      this.router.navigate(['/restaurants']);
    }, () => {
    });
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      height: '150px',
      data: 'Are you sure you want to delete restaurant ' + this.restaurantItem.name + ' ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRestaurant(id);
        this.updateRestaurants(id);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  updateRestaurants(id: number) {
    const restaurantItems: any[] = this.authenticationService.restaurants.getValue();
    restaurantItems.forEach((item, index) => {
      if (item.id === id) {
        restaurantItems.splice(index, 1);
      }
    });
    this.authenticationService.restaurants.next(restaurantItems);
  }
}
