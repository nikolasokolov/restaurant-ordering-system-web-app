import { Component, OnInit } from '@angular/core';
import {Company} from '../../model/company.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../company/company-service';
import {Restaurant} from '../../model/restaurant.model';
import {RestaurantService} from '../restaurant-service';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.css']
})
export class RestaurantItemComponent implements OnInit {
  isLoading = false;
  restaurant: Restaurant;
  imageBlobUrl: string | ArrayBuffer = null;

  constructor(private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute, private restaurantService: RestaurantService,
              private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.getRestaurant();
  }

  getRestaurant() {
    this.isLoading = true;
    const id = this.activatedRoute.snapshot.params.id;
    this.restaurantService.getRestaurant(id).subscribe(response => {
      this.restaurant = response;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
    if (id !== undefined) {
      this.getThumbnail(id);
    }
  }

  getThumbnail(id: number): void {
    this.restaurantService.getLogo(id).subscribe((val) => {
      this.createImageFromBlob(val);
    }, () => {
    }, () => {
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageBlobUrl = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  deleteRestaurant(id: number) {
    this.restaurantService.deleteRestaurant(id).subscribe(response => {
      this.router.navigate(['/restaurants']);
    }, () => {
    });
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      height: '150px',
      data: 'Are you sure you want to delete restaurant ' + this.restaurant.name + ' ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.deleteRestaurant(id);
      }
    });
  }

}
