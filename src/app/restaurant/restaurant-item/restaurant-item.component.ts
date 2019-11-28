import { Component, OnInit } from '@angular/core';
import {Company} from '../../model/company.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../company/company-service';
import {Restaurant} from '../../model/restaurant.model';
import {RestaurantService} from '../restaurant-service';

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
              private activatedRoute: ActivatedRoute, private restaurantService: RestaurantService, private router: Router) { }

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
      this.router.navigate(['/restaurant-list']);
    }, () => {
    });

  }

}
